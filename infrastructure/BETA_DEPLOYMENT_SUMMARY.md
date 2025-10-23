# Beta Environment Deployment Summary

**Date**: October 23, 2025
**Subscription**: sigmatiq (87fef002-d60e-4094-a352-6618579d5d95)
**Region**: Central US
**Status**: Steps 1-4 Complete ✅

---

## Deployment Overview

Successfully deployed 4 of 5 beta environment steps:

- ✅ **Step 1**: Resource Groups (5 RGs)
- ✅ **Step 2a**: Shared Key Vault
- ✅ **Step 2b**: Shared Container Registry
- ✅ **Step 3**: Beta Data Layer (PostgreSQL + Redis)
- ✅ **Step 4**: Beta App Infrastructure (MI, KV, AppConfig, CAE)
- ⏸️ **Step 5**: Beta Container Apps (pending - requires Docker images)

---

## Deployed Resources

### Resource Groups

| Name | Purpose | Location |
|------|---------|----------|
| `rg-trading-shared` | Shared resources (KV, ACR) | centralus |
| `rg-trading-beta-data` | Beta data layer (PostgreSQL, Redis) | centralus |
| `rg-trading-beta-apps` | Beta app infrastructure | centralus |
| `rg-trading-prod-data` | Production data layer (future) | centralus |
| `rg-trading-prod-apps` | Production app infrastructure (future) | centralus |

### Shared Resources (Step 2)

#### Key Vault: `kv-trading-shared`
- **URI**: https://kv-trading-shared.vault.azure.net/
- **Purpose**: Shared secrets storage (provider API keys)
- **SKU**: Standard
- **RBAC**: Enabled

#### Container Registry: `acrtradingshared`
- **Login Server**: acrtradingshared.azurecr.io
- **SKU**: Basic
- **Admin**: Disabled (uses Managed Identity)

### Beta Data Layer (Step 3)

#### PostgreSQL Flexible Server: `psql-trading-beta`
- **FQDN**: psql-trading-beta.postgres.database.azure.com
- **Version**: 16
- **SKU**: Standard_B1ms (Burstable)
- **Storage**: 32 GB (auto-grow enabled)
- **Admin User**: sqladmin
- **Admin Password**: SigmaT!q2025SecureP@ss
- **Backup Retention**: 7 days
- **Public Access**: Enabled (for beta)
- **Firewall**: AllowAllAzureServicesAndResourcesWithinAzureIps

**Databases to Create**:
- sigmatiq_core
- sigmatiq_assistant
- sigmatiq_pilot
- sigmatiq_auth
- sigmatiq_cache
- sigmatiq_sim
- sigmatiq_card
- sigmatiq_native

#### Redis Cache: `redis-trading-beta-1023`
- **Hostname**: redis-trading-beta-1023.redis.cache.windows.net
- **Port**: 6380 (SSL)
- **SKU**: Basic C0 (250 MB)
- **Version**: 6
- **TLS**: 1.2 minimum

### Beta App Infrastructure (Step 4)

#### Managed Identity: `mi-trading-beta`
- **Principal ID**: 23e0d94e-a10d-472b-a784-2389ea69793e
- **Client ID**: 76103d20-2dca-4508-93e8-fcee24a49888
- **Purpose**: Identity for all beta container apps
- **ACR Access**: AcrPull role on acrtradingshared ✅

#### Key Vault: `kv-trading-beta-1023`
- **URI**: https://kv-trading-beta-1023.vault.azure.net/
- **Purpose**: Beta-specific secrets (DB connection strings)
- **SKU**: Standard
- **Soft Delete**: 7 days (purge disabled for easier cleanup)
- **RBAC**: Enabled

**Stored Secrets**:
- ✅ `PostgreSQL-ConnectionString`: postgresql://sqladmin:...@psql-trading-beta.postgres.database.azure.com:5432/sigmatiq_core?sslmode=require
- ✅ `Redis-ConnectionString`: redis-trading-beta-1023.redis.cache.windows.net:6380,password=...,ssl=True,abortConnect=False

#### App Configuration: `appconfig-trading-beta-1023`
- **Endpoint**: https://appconfig-trading-beta-1023.azconfig.io
- **SKU**: Free
- **Public Access**: Enabled
- **Purpose**: Centralized configuration for beta apps

#### Container Apps Environment: `cae-trading-beta`
- **ID**: /subscriptions/.../managedEnvironments/cae-trading-beta
- **Default Domain**: whitefield-f5a1fd73.centralus.azurecontainerapps.io
- **Zone Redundant**: No (beta)
- **Purpose**: Hosting platform for 5 APIs

---

## Deployment Issues & Fixes

### Issue 1: PostgreSQL API Version Not Supported
**Error**: `NoRegisteredProviderFound` for API version '2023-03-01'
**Fix**: Updated to `2023-06-01-preview` in `bicep/modules/postgresql.bicep`

### Issue 2: Redis DNS Name Conflict
**Error**: `NameNotAvailable` - recently deleted cache reserves DNS name
**Fix**: Added `redisNameSuffix` parameter, deployed as `redis-trading-beta-1023`

### Issue 3: Key Vault Name Conflict
**Error**: `VaultAlreadyExists` - recently deleted vault in recovery
**Fix**: Added `kvNameSuffix` parameter, deployed as `kv-trading-beta-1023`

### Issue 4: App Configuration Name Conflict
**Error**: `NameUnavailable` - name already in use
**Fix**: Added `appConfigNameSuffix` parameter, deployed as `appconfig-trading-beta-1023`

### Issue 5: Bicep Syntax Errors in network.bicep
**Error**: `BCP100` - if() function not supported in arrays
**Fix**: Replaced with ternary operators + concat() pattern

### Issue 6: utcNow() in Wrong Location
**Error**: `BCP065` - utcNow() only valid as parameter default
**Fix**: Moved to parameter in `bicep/modules/resource-group.bicep`

### Issue 7: Azure CLI Role Assignment Failures
**Error**: `MissingSubscription` error when using `az role assignment create`
**Workaround**: Used Azure Portal for role assignments
- Granted MI → ACR (AcrPull)
- Granted User → KV (Key Vault Secrets Officer)

---

## Next Steps

### Immediate (Before Step 5)

1. **Build and Push Docker Images** to `acrtradingshared.azurecr.io`:
   ```bash
   # Login to ACR
   az acr login --name acrtradingshared

   # Tag and push images (example for auth-api)
   docker tag sigmatiq-auth-api:latest acrtradingshared.azurecr.io/sigmatiq-auth-api:beta
   docker push acrtradingshared.azurecr.io/sigmatiq-auth-api:beta
   ```

   Required images:
   - sigmatiq-auth-api:beta
   - sigmatiq-native-api:beta
   - sigmatiq-pilot-api:beta
   - sigmatiq-card-api:beta
   - sigmatiq-sim-api:beta

2. **Store Provider API Keys** in `kv-trading-shared`:
   ```bash
   az keyvault secret set --vault-name kv-trading-shared --name Polygon-API-Key --value "<key>"
   az keyvault secret set --vault-name kv-trading-shared --name Alpaca-API-Key --value "<key>"
   az keyvault secret set --vault-name kv-trading-shared --name Alpaca-Secret-Key --value "<key>"
   az keyvault secret set --vault-name kv-trading-shared --name AlphaVantage-API-Key --value "<key>"
   ```

3. **Create PostgreSQL Databases**:
   ```bash
   # Connect to PostgreSQL
   psql "postgresql://sqladmin:SigmaT!q2025SecureP@ss@psql-trading-beta.postgres.database.azure.com:5432/postgres?sslmode=require"

   # Create databases
   CREATE DATABASE sigmatiq_core;
   CREATE DATABASE sigmatiq_assistant;
   CREATE DATABASE sigmatiq_pilot;
   CREATE DATABASE sigmatiq_auth;
   CREATE DATABASE sigmatiq_cache;
   CREATE DATABASE sigmatiq_sim;
   CREATE DATABASE sigmatiq_card;
   CREATE DATABASE sigmatiq_native;
   ```

4. **Run Database Migrations** (from sigmatiq-database repo):
   ```bash
   cd ../sigmatiq-database

   # Core migrations
   export DATABASE_URL="postgresql://sqladmin:SigmaT!q2025SecureP@ss@psql-trading-beta.postgres.database.azure.com:5432/sigmatiq_core?sslmode=require"
   python scripts/apply_migrations.py --dir migrations/core

   # Repeat for other databases...
   ```

### Step 5: Deploy Beta Container Apps

Once Docker images are available:

```bash
cd repos/sigmatiq-infrastructure/scripts
./05-deploy-beta-container-apps.sh
```

This will deploy 5 Container Apps:
- `ca-auth-api` (port 8004)
- `ca-native-api` (port 8002)
- `ca-pilot-api` (port 8003)
- `ca-card-api` (port 8005)
- `ca-sim-api` (port 8084)

Each app will:
- Use Managed Identity `mi-trading-beta`
- Pull from `acrtradingshared.azurecr.io`
- Reference secrets from `kv-trading-beta-1023`
- Use configuration from `appconfig-trading-beta-1023`

---

## Configuration Reference

### Environment Variables for Container Apps

Common environment variables needed across all APIs:

```bash
# Database
DATABASE_URL=<from Key Vault: PostgreSQL-ConnectionString>

# Redis
REDIS_HOST=redis-trading-beta-1023.redis.cache.windows.net
REDIS_PORT=6380
REDIS_PASSWORD=<from Key Vault: Redis-ConnectionString>
USE_REDIS_CACHE=true

# Provider API Keys (from shared KV)
POLYGON_API_KEY=<from kv-trading-shared>
ALPACA_API_KEY=<from kv-trading-shared>
ALPACA_SECRET_KEY=<from kv-trading-shared>
ALPHA_VANTAGE_API_KEY=<from kv-trading-shared>

# Azure
AZURE_CLIENT_ID=76103d20-2dca-4508-93e8-fcee24a49888  # MI client ID
```

### Key Vault Secret References

Container Apps can reference secrets using:

```yaml
secretRef: postgresql-connectionstring  # Automatically fetched from KV
```

---

## Access & Monitoring

### Azure Portal Quick Links

- **Resource Groups**: https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups
- **Container Apps**: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.App%2FcontainerApps
- **Key Vaults**: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.KeyVault%2Fvaults
- **PostgreSQL**: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.DBforPostgreSQL%2FflexibleServers
- **Redis**: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Cache%2Fredis

### Container Apps URLs (Post Step 5)

Each API will be accessible at:
- Auth API: https://ca-auth-api.whitefield-f5a1fd73.centralus.azurecontainerapps.io
- Native API: https://ca-native-api.whitefield-f5a1fd73.centralus.azurecontainerapps.io
- Pilot API: https://ca-pilot-api.whitefield-f5a1fd73.centralus.azurecontainerapps.io
- Card API: https://ca-card-api.whitefield-f5a1fd73.centralus.azurecontainerapps.io
- Sim API: https://ca-sim-api.whitefield-f5a1fd73.centralus.azurecontainerapps.io

---

## Security Notes

### Credentials to Rotate

For production, rotate these credentials created during deployment:

1. **PostgreSQL Admin Password**: `SigmaT!q2025SecureP@ss`
   - Change in Azure Portal → PostgreSQL → Settings → Reset password
   - Update secret in Key Vault

2. **Redis Primary Key**: Retrieved via `az redis list-keys`
   - Regenerate in Azure Portal → Redis → Access keys
   - Update secret in Key Vault

3. **Service Principal (GitHub Actions)**: Created manually
   - Rotate via Azure Portal → App registrations
   - Update GitHub repository secrets

### RBAC Assignments

Current role assignments:

| Principal | Role | Scope |
|-----------|------|-------|
| mi-trading-beta | AcrPull | acrtradingshared |
| monika.sigmatiq.ai@gmail.com (guest) | Key Vault Secrets Officer | kv-trading-beta-1023 |
| monika.sigmatiq.ai@gmail.com (guest) | Owner | Subscription |

---

## Cost Estimate (Beta Environment)

Monthly cost estimate for beta environment:

| Resource | SKU | Estimated Cost |
|----------|-----|----------------|
| PostgreSQL Standard_B1ms | Burstable, 32 GB | ~$15/month |
| Redis Basic C0 | 250 MB | ~$16/month |
| Container Apps (5 apps) | 0.5 vCPU, 1 GB each | ~$0 (free tier) |
| Container Apps Environment | Consumption plan | ~$0 (free tier) |
| App Configuration | Free tier | $0 |
| Key Vault (2) | Standard, <10K ops | <$1/month |
| Container Registry | Basic | ~$5/month |
| **Total** | | **~$37/month** |

*Note: Costs may vary based on actual usage. Container Apps free tier includes 180,000 vCPU-seconds and 360,000 GiB-seconds per month.*

---

## Troubleshooting

### PostgreSQL Connection Issues

If unable to connect to PostgreSQL:

1. Check firewall rules:
   ```bash
   az postgres flexible-server firewall-rule list --name psql-trading-beta --resource-group rg-trading-beta-data
   ```

2. Temporarily whitelist your IP:
   ```bash
   ./scripts/whitelist-my-ip-beta.sh
   ```

3. Test connection:
   ```bash
   psql "postgresql://sqladmin:SigmaT!q2025SecureP@ss@psql-trading-beta.postgres.database.azure.com:5432/postgres?sslmode=require"
   ```

### Container App Deployment Failures

Common issues:

1. **Image pull failures**: Verify MI has AcrPull role
2. **Secret reference errors**: Check Key Vault secret names match exactly
3. **App crashes**: Check logs in Azure Portal → Container App → Log stream

### Key Vault Access Denied

If getting 403 Forbidden:

1. Verify RBAC role assignment (not access policies - RBAC is enabled)
2. Wait 2-3 minutes for role propagation
3. Clear Azure CLI cache: `az account clear` then re-login

---

## Documentation Updates Needed

Before production deployment:

1. **Update sigmatiq-docs** with:
   - Beta environment architecture diagram
   - Production deployment runbook (already created in PROD_RUNBOOK.md)
   - VPN setup guide (already created in PROD_VPN_SETUP.md)
   - Container Apps configuration guide
   - Database migration procedures

2. **Create Runbooks** for:
   - Scaling Container Apps based on load
   - Monitoring and alerting setup
   - Backup and disaster recovery
   - Cost optimization strategies

---

## Git Branch Status

**Current Branch**: `feat/azure-fresh-deployment-with-review-fixes`
**Last Commit**: d167393 - "feat: add production infrastructure with fixes for beta deployment"
**PR Status**: Open - awaiting merge to main

All infrastructure code has been committed and pushed to GitHub.

---

**Deployment Completed By**: Claude Code
**Last Updated**: October 23, 2025 at 20:15 UTC
