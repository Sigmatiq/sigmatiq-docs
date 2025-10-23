# Production VPN + Private DNS Setup

This guide walks through creating a Point-to-Site (P2S) VPN for your laptop to securely access production resources (Key Vault, App Config, PostgreSQL, Redis) over Private Endpoints. It also covers DNS resolution for privatelink FQDNs.

## 1) Generate a Root Certificate

You need a root certificate to authorize P2S clients. Export its public cert data (Base64) to pass into the deployment.

### Windows (PowerShell)

```powershell
$cert = New-SelfSignedCertificate -Type Custom -KeySpec Signature -Subject "CN=SigmatiqP2SRoot" -KeyExportPolicy Exportable -HashAlgorithm sha256 -KeyLength 2048 -CertStoreLocation "Cert:\\CurrentUser\\My" -KeyUsageProperty Sign -KeyUsage CertSign

# Export public cert (.cer)
$cerPath = "$env:TEMP\\SigmatiqP2SRoot.cer"
Export-Certificate -Cert $cert -FilePath $cerPath | Out-Null

# Get Base64 (without headers)
$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($cerPath))
Set-Content -Path "$env:TEMP\\SigmatiqP2SRoot.b64.txt" -Value $b64
Write-Output "Base64 saved to $env:TEMP\\SigmatiqP2SRoot.b64.txt"
```

### macOS/Linux (OpenSSL)

```bash
openssl req -x509 -nodes -newkey rsa:2048 -keyout sigmatiq_p2s_root.key -out sigmatiq_p2s_root.cer -days 3650 -subj "/CN=SigmatiqP2SRoot"

# Base64 public cert (no headers)
base64 -w0 sigmatiq_p2s_root.cer > sigmatiq_p2s_root.b64.txt  # macOS: use `base64 sigmatiq_p2s_root.cer > sigmatiq_p2s_root.b64.txt`
```

## 2) Deploy Foundation with VPN + DNS

Use the GA templates with P2S enabled. Provide the Base64 string from step 1.

```bash
az deployment group create \
  -g rg-trading-prod-apps \
  -n deploy-prod-foundation \
  -f bicep/main/06-deploy-prod-secure-foundation.bicep \
  -p location=centralus \
     p2sRootCertData="$(cat /path/to/sigmatiq_p2s_root.b64.txt)" \
     p2sClientPool="172.16.0.0/24"
```

This deploys:
- VNet with subnets (PE, ACA, Gateway, DNS inbound/outbound)
- DNS Private Resolver (inbound/outbound)
- Forwarding ruleset (forwards all queries to Azure 168.63.129.16)
- VPN Gateway (P2S)
- Key Vault + App Config with Private Endpoints + Private DNS
- ACA Environment (VNet-injected)

## 3) Get VPN Client Profile and Connect

In the Azure Portal, open the VPN Gateway created (vpngw-trading-prod) and download the VPN client profile (OpenVPN). Import into your OS VPN client.

Connect to the VPN. Verify you received an IP from 172.16.0.0/24.

## 4) DNS Resolution

The deployment creates a DNS Private Resolver and a forwarding ruleset. In most cases, clients will resolve privatelink zones automatically. If resolution fails, set the VNet DNS servers to the resolver inbound IPs and refresh the VPN client package (so clients pick up DNS):

```bash
./scripts/set_vnet_dns_and_refresh_vpn.sh \
  --rg rg-trading-prod-apps \
  --vnet vnet-trading-prod \
  --resolver dnsr-trading-prod \
  --gateway vpngw-trading-prod
```

Then re-download the client package from the printed URL, import, and reconnect.

Privatelink FQDNs:
- Key Vault: `privatelink.vaultcore.azure.net`
- App Config: `privatelink.azconfig.io`
- PostgreSQL: `privatelink.postgres.database.azure.com`
- Redis: `privatelink.redis.cache.windows.net`

## 5) Test Access

```bash
# PostgreSQL
psql "host=psql-trading-prod.postgres.database.azure.com port=5432 dbname=postgres user=sqladmin sslmode=require"

# Key Vault
az keyvault secret list --vault-name kv-trading-prod

# App Config
az appconfig kv list --name appconfig-trading-prod --key * --label common
```

## Notes
- For enterprise PKI, replace self-signed root with your corporate CA.
- If you run a custom DNS on-prem, adjust the forwarding ruleset to point to your DNS servers instead of Azure 168.63.129.16.
- Re-download VPN client profiles if you change DNS server settings in the VNet or gateway configuration.
