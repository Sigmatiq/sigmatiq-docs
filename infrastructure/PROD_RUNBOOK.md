# Production Runbook — Sigmatiq Infrastructure (Azure)

This runbook walks through a clean, secure production deployment using the prod templates. It assumes you have Owner/Contributor on the subscription and `az` CLI installed and logged in.

## 0) Prerequisites

- Azure CLI (latest), logged in: `az login`
- Subscription selected: `az account set --subscription <SUB_ID>`
- Resource groups created (from Step 1 in README):
  - `rg-trading-prod-apps`
  - `rg-trading-prod-data`
- Docker images pushed to ACR (`acrtradingshared.azurecr.io/trading/*:<tag>`)
- Optional but recommended: follow VPN guide first
  - See: `docs/PROD_VPN_SETUP.md`

## 1) Deploy Prod Foundation (Apps RG)

Deploys VNet + DNS Resolver (+forwarding), optional P2S VPN, prod Key Vault, prod App Config (public disabled), ACA Env (VNet-injected), and Private Endpoints with Private DNS.

```bash
az deployment group create \
  -g rg-trading-prod-apps \
  -n deploy-prod-foundation \
  -f bicep/main/06-deploy-prod-secure-foundation.bicep \
  -p location=centralus \
     p2sRootCertData="$(cat /path/to/your/root.b64.txt)" \
     p2sClientPool="172.16.0.0/24"
```

Outputs include VNet/subnets, ACA Env ID, KV/App Config IDs, and (if enabled) VPN gateway.

Optional: Set VNet DNS to DNS resolver and refresh VPN package:

```bash
./scripts/set_vnet_dns_and_refresh_vpn.sh \
  --rg rg-trading-prod-apps \
  --vnet vnet-trading-prod \
  --resolver dnsr-trading-prod \
  --gateway vpngw-trading-prod
```

## 2) Deploy Prod Data (Data RG)

Deploys PostgreSQL (GeneralPurpose, public disabled, geo-redundant backups) and Redis (public disabled) with Private Endpoints and Private DNS.

```bash
# Required parameters
export PE_SUBNET_ID="/subscriptions/<SUB_ID>/resourceGroups/rg-trading-prod-apps/providers/Microsoft.Network/virtualNetworks/vnet-trading-prod/subnets/snet-private-endpoints"
export PSQL_USER="sqladmin"
export PSQL_PASS="<secure-password>"

az deployment group create \
  -g rg-trading-prod-data \
  -n deploy-prod-data \
  -f bicep/main/07-deploy-prod-secure-data.bicep \
  -p location=centralus peSubnetId="$PE_SUBNET_ID" \
     postgresAdminLogin="$PSQL_USER" postgresAdminPassword="$PSQL_PASS"
```

Record outputs: `postgresFqdn`, `redisHostName`, `redisSslPort`.

## 3) Grant ACR Pull to Managed Identity

```bash
# ACR resource ID
ACR_ID=$(az acr show --name acrtradingshared --query id -o tsv)

# Managed Identity Principal ID (prod apps RG)
MI_PRINCIPAL_ID=$(az identity show --name mi-trading-prod -g rg-trading-prod-apps --query principalId -o tsv)

az role assignment create --assignee "$MI_PRINCIPAL_ID" --role AcrPull --scope "$ACR_ID"
```

## 4) Store Secrets in Prod Key Vault

```bash
KV_NAME="kv-trading-prod"

# PostgreSQL connection string (example)
POSTGRES_FQDN="psql-trading-prod.postgres.database.azure.com"
POSTGRES_USER="sqladmin"
POSTGRES_PASS="<secure-password>"

az keyvault secret set --vault-name "$KV_NAME" \
  --name PostgreSQL-ConnectionString \
  --value "postgresql://$POSTGRES_USER:$POSTGRES_PASS@$POSTGRES_FQDN:5432/postgres?sslmode=require"

# Redis connection string
REDIS_HOST="redis-trading-prod.redis.cache.windows.net"
REDIS_KEY=$(az redis list-keys --name redis-trading-prod -g rg-trading-prod-data --query primaryKey -o tsv)

az keyvault secret set --vault-name "$KV_NAME" \
  --name Redis-ConnectionString \
  --value "$REDIS_HOST:6380,ssl=True,password=$REDIS_KEY"

# Provider keys
az keyvault secret set --vault-name "$KV_NAME" --name Polygon-ApiKey --value '<polygon-key>'
az keyvault secret set --vault-name "$KV_NAME" --name Alpaca-ApiKey --value '<alpaca-key>'
```

## 5) Deploy Container Apps (Prod)

Re-use the beta container-apps template by running in the prod apps RG with prod parameters:

```bash
RG=rg-trading-prod-apps
CAE_ID=$(az containerapp env list -g "$RG" --query "[?name=='cae-trading-prod'].id" -o tsv)
MI_ID=$(az identity list -g "$RG" --query "[?name=='mi-trading-prod'].id" -o tsv)
ACR_LOGIN_SERVER=$(az acr show --name acrtradingshared --query loginServer -o tsv)

az deployment group create \
  -g "$RG" \
  -n deploy-prod-container-apps \
  -f bicep/main/05-deploy-beta-container-apps.bicep \
  -p location=centralus \
     containerAppsEnvironmentId="$CAE_ID" \
     managedIdentityId="$MI_ID" \
     acrLoginServer="$ACR_LOGIN_SERVER" \
     imageTag="<tag>" \
     postgresSecretName="postgres-conn" \
     redisSecretName="redis-conn" \
     polygonApiKeySecretName="polygon-api-key" \
     alpacaApiKeySecretName="alpaca-api-key"
```

Notes:
- The template accepts secretRef param names; actual secret values are set next.
- You can also add autoscaling parameters via module inputs if desired.

## 6) Sync Key Vault → Container Apps Secrets (secretRef)

Use the helper script to sync KV secrets to apps and wire env vars to secretref (no secrets echoed):

```bash
RG=rg-trading-prod-apps \
KV=kv-trading-prod \
CA_NAMES="auth-api-beta native-api-beta pilot-api-beta card-api-beta sim-api-beta" \
ENV_MAP="DATABASE_URL=PostgreSQL-ConnectionString,REDIS_URL=Redis-ConnectionString,POLYGON_API_KEY=Polygon-ApiKey,ALPACA_API_KEY=Alpaca-ApiKey" \
./scripts/sync_containerapp_secrets.sh
```

Adjust `CA_NAMES` if your prod app names differ (e.g., `auth-api-prod`).

## 7) App Configuration (optional)

If your apps read config from App Config, set KV-backed references with labels:

```bash
az appconfig kv set --name appconfig-trading-prod \
  --key "Polygon:ApiKey" \
  --value "@Microsoft.KeyVault(SecretUri=https://kv-trading-prod.vault.azure.net/secrets/Polygon-ApiKey/)" \
  --label "common" \
  --yes
```

## 8) Validate

- Container Apps:
  - `az containerapp list -g rg-trading-prod-apps -o table`
- Postgres connectivity (over VPN):
  - `psql "host=psql-trading-prod.postgres.database.azure.com port=5432 dbname=postgres user=sqladmin sslmode=require"`
- Key Vault/App Config access (over VPN):
  - `az keyvault secret list --vault-name kv-trading-prod`
  - `az appconfig kv list --name appconfig-trading-prod --key * --label common`

## 9) Operations

- Rotate provider keys in `kv-trading-shared` (shared vault), update apps if using secretRef from shared vault.
- Scale Postgres/ACA as needed; increase `backupRetentionDays` for stricter RPO.
- Maintain P2S root cert: re-deploy or add client certs as users/devices change.

---

Security Checklist
- Prod KV/App Config: public network disabled; purge protection enabled.
- Postgres/Redis: private endpoints only; no AllowAllAzureServices in prod.
- ACA: VNet-injected; only required egress allowed (if NSGs applied).
- CI: no secrets in logs; what-if uses OIDC.

