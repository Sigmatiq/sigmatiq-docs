# Azure Resource Inventory - Beta Environment

Complete inventory of all Azure resources deployed in the beta environment with full resource IDs, names, purposes, and connection details.

**Last Updated**: October 23, 2025
**Subscription**: sigmatiq (87fef002-d60e-4094-a352-6618579d5d95)
**Region**: Central US

---

## Resource Groups

### 1. rg-trading-shared

**Purpose**: Shared resources used across both beta and production environments

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-shared`

**Tags**:
- Environment: shared
- Purpose: Shared infrastructure
- ManagedBy: Bicep
- Product: Trading

**Resources**:
- Key Vault: kv-trading-shared
- Container Registry: acrtradingshared

---

### 2. rg-trading-beta-data

**Purpose**: Beta environment data layer (databases and cache)

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-beta-data`

**Tags**:
- Environment: beta
- Purpose: Data layer
- ManagedBy: Bicep
- Product: Trading

**Resources**:
- PostgreSQL Flexible Server: psql-trading-beta
- Azure Cache for Redis: redis-trading-beta-1023

---

### 3. rg-trading-beta-apps

**Purpose**: Beta environment application infrastructure

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-beta-apps`

**Tags**:
- Environment: beta
- Purpose: App infrastructure
- ManagedBy: Bicep
- Product: Trading

**Resources**:
- Managed Identity: mi-trading-beta
- Key Vault: kv-trading-beta-1023
- App Configuration: appconfig-trading-beta-1023
- Container Apps Environment: cae-trading-beta

---

### 4. rg-trading-prod-data

**Purpose**: Production environment data layer (future deployment)

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-prod-data`

**Status**: Empty (templates ready)

---

### 5. rg-trading-prod-apps

**Purpose**: Production environment application infrastructure (future deployment)

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-prod-apps`

**Status**: Empty (templates ready)

---

## Shared Resources (rg-trading-shared)

### Key Vault: kv-trading-shared

**Resource Type**: Microsoft.KeyVault/vaults

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-shared/providers/Microsoft.KeyVault/vaults/kv-trading-shared`

**Properties**:
- Name: kv-trading-shared
- URI: https://kv-trading-shared.vault.azure.net/
- Location: centralus
- SKU: Standard
- Soft Delete: Enabled (90 days)
- Purge Protection: Enabled
- RBAC Authorization: Enabled
- Public Network Access: Enabled

**Purpose**: Store provider API keys shared across all environments
- Polygon API Key
- Alpaca API Key + Secret
- Alpha Vantage API Key
- Other market data provider credentials

**Access**:
- RBAC-based (no access policies)
- Managed Identities from beta/prod can access via assigned roles

**Secrets to Store** (pending):
- Polygon-API-Key
- Alpaca-API-Key
- Alpaca-Secret-Key
- AlphaVantage-API-Key

---

### Container Registry: acrtradingshared

**Resource Type**: Microsoft.ContainerRegistry/registries

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-shared/providers/Microsoft.ContainerRegistry/registries/acrtradingshared`

**Properties**:
- Name: acrtradingshared
- Login Server: acrtradingshared.azurecr.io
- Location: centralus
- SKU: Basic
- Admin User: Disabled
- Public Network Access: Enabled

**Purpose**: Docker image repository for all 5 trading APIs

**Expected Images**:
- sigmatiq-auth-api:beta (and :latest for prod)
- sigmatiq-native-api:beta
- sigmatiq-pilot-api:beta
- sigmatiq-card-api:beta
- sigmatiq-sim-api:beta

**Access**:
- Managed Identity `mi-trading-beta` has AcrPull role

---

## Beta Data Layer (rg-trading-beta-data)

### PostgreSQL Flexible Server: psql-trading-beta

**Resource Type**: Microsoft.DBforPostgreSQL/flexibleServers

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-beta-data/providers/Microsoft.DBforPostgreSQL/flexibleServers/psql-trading-beta`

**Properties**:
- Name: psql-trading-beta
- FQDN: psql-trading-beta.postgres.database.azure.com
- Location: centralus
- Version: 16
- SKU: Standard_B1ms (Burstable, 1 vCore, 2 GB RAM)
- Storage: 32 GB (auto-grow enabled)
- High Availability: Disabled
- Public Network Access: Enabled

**Authentication**:
- Admin User: sqladmin
- Admin Password: SigmaT!q2025SecureP@ss (⚠️ rotate for production)

**Networking**:
- Firewall Rule: AllowAllAzureServicesAndResourcesWithinAzureIps (0.0.0.0)
- TLS: Required
- Port: 5432

**Backup**:
- Retention: 7 days
- Geo-Redundant: Disabled

**Purpose**: Host 8 databases for the trading platform

**Databases** (to be created):

| Database Name | Purpose | API |
|---------------|---------|-----|
| sigmatiq_core | Core trading logic | Multiple |
| sigmatiq_assistant | AI assistant data | Assistant API |
| sigmatiq_pilot | Pilot features | Pilot API |
| sigmatiq_auth | Authentication | Auth API |
| sigmatiq_cache | Cache metadata | All APIs |
| sigmatiq_sim | Paper trading | Sim API |
| sigmatiq_card | Card-based interface | Card API |
| sigmatiq_native | Native trading | Native API |

**Connection String** (stored in kv-trading-beta-1023):
```
postgresql://sqladmin:SigmaT!q2025SecureP@ss@psql-trading-beta.postgres.database.azure.com:5432/sigmatiq_core?sslmode=require
```

---

### Azure Cache for Redis: redis-trading-beta-1023

**Resource Type**: Microsoft.Cache/redis

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-beta-data/providers/Microsoft.Cache/redis/redis-trading-beta-1023`

**Properties**:
- Name: redis-trading-beta-1023
- Hostname: redis-trading-beta-1023.redis.cache.windows.net
- Location: centralus
- SKU: Basic C0 (250 MB)
- Redis Version: 6
- Non-SSL Port: Disabled
- SSL Port: 6380
- Minimum TLS Version: 1.2
- Public Network Access: Enabled

**Purpose**: L2 cache layer for trading platform APIs

**Access Keys** (retrieve via CLI):
```bash
az redis list-keys --name redis-trading-beta-1023 --resource-group rg-trading-beta-data
```

**Connection String** (stored in kv-trading-beta-1023):
```
redis-trading-beta-1023.redis.cache.windows.net:6380,password=<PRIMARY_KEY>,ssl=True,abortConnect=False
```

**Usage**:
- Cache market data queries
- Session storage
- Rate limiting counters
- Real-time data buffering

---

## Beta App Infrastructure (rg-trading-beta-apps)

### Managed Identity: mi-trading-beta

**Resource Type**: Microsoft.ManagedIdentity/userAssignedIdentities

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-beta-apps/providers/Microsoft.ManagedIdentity/userAssignedIdentities/mi-trading-beta`

**Properties**:
- Name: mi-trading-beta
- Location: centralus
- Principal ID: 23e0d94e-a10d-472b-a784-2389ea69793e
- Client ID: 76103d20-2dca-4508-93e8-fcee24a49888
- Tenant ID: d59430ae-69c5-4ee7-9e54-52d04b46cd0b

**Purpose**: Unified identity for all beta container apps

**Assigned Roles**:
- AcrPull on `acrtradingshared` (pull Docker images)
- Key Vault Secrets User on `kv-trading-beta-1023` (read secrets)
- App Configuration Data Reader on `appconfig-trading-beta-1023` (read config)

**Used By**:
- ca-auth-api
- ca-native-api
- ca-pilot-api
- ca-card-api
- ca-sim-api

---

### Key Vault: kv-trading-beta-1023

**Resource Type**: Microsoft.KeyVault/vaults

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-beta-apps/providers/Microsoft.KeyVault/vaults/kv-trading-beta-1023`

**Properties**:
- Name: kv-trading-beta-1023
- URI: https://kv-trading-beta-1023.vault.azure.net/
- Location: centralus
- SKU: Standard
- Soft Delete: Enabled (7 days)
- Purge Protection: Disabled (for easier cleanup in beta)
- RBAC Authorization: Enabled
- Public Network Access: Enabled

**Purpose**: Store beta-specific secrets (database connections, API keys)

**Stored Secrets**:

| Secret Name | Purpose | Example Value |
|-------------|---------|---------------|
| PostgreSQL-ConnectionString | PostgreSQL connection | postgresql://sqladmin:...@psql-trading-beta... |
| Redis-ConnectionString | Redis connection | redis-trading-beta-1023.redis.cache.windows.net:6380,password=... |

**Access**:
- Managed Identity `mi-trading-beta` has Key Vault Secrets User role
- User `monika.sigmatiq.ai@gmail.com` has Key Vault Secrets Officer role

---

### App Configuration: appconfig-trading-beta-1023

**Resource Type**: Microsoft.AppConfiguration/configurationStores

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-beta-apps/providers/Microsoft.AppConfiguration/configurationStores/appconfig-trading-beta-1023`

**Properties**:
- Name: appconfig-trading-beta-1023
- Endpoint: https://appconfig-trading-beta-1023.azconfig.io
- Location: centralus
- SKU: Free
- Disable Local Auth: false
- Public Network Access: Enabled

**Purpose**: Centralized configuration for beta APIs

**Configuration Keys** (to be populated):

| Key | Label | Purpose |
|-----|-------|---------|
| LogLevel | common | Logging verbosity |
| CorsOrigins | common | Allowed CORS origins |
| DatabaseProvider | common | PostgreSQL/Cosmos/etc |
| Auth:Issuer | auth | JWT issuer URL |
| Auth:Audience | auth | JWT audience |
| Native:MaxPositions | native | Position limits |
| Pilot:FeatureFlags | pilot | Enabled features |
| Card:DefaultLayout | card | UI preferences |
| Sim:StartingBalance | sim | Paper trading balance |

---

### Container Apps Environment: cae-trading-beta

**Resource Type**: Microsoft.App/managedEnvironments

**Resource ID**: `/subscriptions/87fef002-d60e-4094-a352-6618579d5d95/resourceGroups/rg-trading-beta-apps/providers/Microsoft.App/managedEnvironments/cae-trading-beta`

**Properties**:
- Name: cae-trading-beta
- Location: centralus
- Default Domain: whitefield-f5a1fd73.centralus.azurecontainerapps.io
- Zone Redundant: false
- VNet: Not configured (public ingress)

**Purpose**: Hosting environment for 5 beta container apps

**Apps to Deploy** (Step 5 - pending):

| App Name | Image | Port | URL |
|----------|-------|------|-----|
| ca-auth-api | acrtradingshared.azurecr.io/sigmatiq-auth-api:beta | 8004 | https://ca-auth-api.whitefield-f5a1fd73.centralus.azurecontainerapps.io |
| ca-native-api | acrtradingshared.azurecr.io/sigmatiq-native-api:beta | 8002 | https://ca-native-api.whitefield-f5a1fd73.centralus.azurecontainerapps.io |
| ca-pilot-api | acrtradingshared.azurecr.io/sigmatiq-pilot-api:beta | 8003 | https://ca-pilot-api.whitefield-f5a1fd73.centralus.azurecontainerapps.io |
| ca-card-api | acrtradingshared.azurecr.io/sigmatiq-card-api:beta | 8005 | https://ca-card-api.whitefield-f5a1fd73.centralus.azurecontainerapps.io |
| ca-sim-api | acrtradingshared.azurecr.io/sigmatiq-sim-api:beta | 8084 | https://ca-sim-api.whitefield-f5a1fd73.centralus.azurecontainerapps.io |

**Scaling**:
- Min Replicas: 0 (scale to zero when idle)
- Max Replicas: 3
- CPU: 0.5 cores per replica
- Memory: 1 GB per replica

---

## Access Patterns

### Developer Access

**Via Azure Portal**:
- https://portal.azure.com
- Login: monika.sigmatiq.ai@gmail.com (guest)

**Via Azure CLI**:
```bash
az login
az account set --subscription "87fef002-d60e-4094-a352-6618579d5d95"
```

### Application Access (Managed Identity)

Container Apps use `mi-trading-beta` to access:

1. **ACR** (pull images):
   - Authentication: Automatic via assigned identity
   - Registry: acrtradingshared.azurecr.io

2. **Key Vault** (read secrets):
   - Authentication: Automatic via assigned identity
   - Vault: https://kv-trading-beta-1023.vault.azure.net/

3. **App Configuration** (read config):
   - Authentication: Automatic via assigned identity
   - Endpoint: https://appconfig-trading-beta-1023.azconfig.io

4. **PostgreSQL** (via connection string from Key Vault):
   - Host: psql-trading-beta.postgres.database.azure.com
   - Port: 5432
   - SSL: Required

5. **Redis** (via connection string from Key Vault):
   - Host: redis-trading-beta-1023.redis.cache.windows.net
   - Port: 6380
   - SSL: Required

---

## Cost Breakdown

### Monthly Costs (Estimated)

| Resource | SKU | Cost/Month |
|----------|-----|------------|
| psql-trading-beta | Standard_B1ms, 32 GB | ~$15 |
| redis-trading-beta-1023 | Basic C0, 250 MB | ~$16 |
| kv-trading-shared | Standard | <$0.50 |
| kv-trading-beta-1023 | Standard | <$0.50 |
| acrtradingshared | Basic, <1 GB | ~$5 |
| appconfig-trading-beta-1023 | Free | $0 |
| cae-trading-beta | Consumption | $0 (within free tier) |
| Container Apps (5) | 0.5 vCPU, 1 GB each | $0 (within free tier) |
| **Total** | | **~$37/month** |

*Note: Container Apps free tier includes 180,000 vCPU-seconds and 360,000 GiB-seconds per month, sufficient for beta testing.*

---

## Quick Reference Commands

### List All Resources

```bash
# List resources in beta data RG
az resource list --resource-group rg-trading-beta-data --output table

# List resources in beta apps RG
az resource list --resource-group rg-trading-beta-apps --output table

# List resources in shared RG
az resource list --resource-group rg-trading-shared --output table
```

### Get Resource Details

```bash
# PostgreSQL details
az postgres flexible-server show --name psql-trading-beta --resource-group rg-trading-beta-data

# Redis details
az redis show --name redis-trading-beta-1023 --resource-group rg-trading-beta-data

# Managed Identity details
az identity show --name mi-trading-beta --resource-group rg-trading-beta-apps

# Container Apps Environment details
az containerapp env show --name cae-trading-beta --resource-group rg-trading-beta-apps
```

### Access Connection Strings

```bash
# Get PostgreSQL connection string from Key Vault
az keyvault secret show --vault-name kv-trading-beta-1023 --name PostgreSQL-ConnectionString --query value -o tsv

# Get Redis connection string from Key Vault
az keyvault secret show --vault-name kv-trading-beta-1023 --name Redis-ConnectionString --query value -o tsv

# Get Redis access keys directly
az redis list-keys --name redis-trading-beta-1023 --resource-group rg-trading-beta-data
```

---

## Cleanup Commands

To delete the entire beta environment:

```bash
# Delete all 5 resource groups
az group delete --name rg-trading-shared --yes --no-wait
az group delete --name rg-trading-beta-data --yes --no-wait
az group delete --name rg-trading-beta-apps --yes --no-wait
az group delete --name rg-trading-prod-data --yes --no-wait
az group delete --name rg-trading-prod-apps --yes --no-wait

# Purge soft-deleted Key Vaults (if needed)
az keyvault purge --name kv-trading-shared
az keyvault purge --name kv-trading-beta-1023
```

**⚠️ Warning**: These commands are destructive and cannot be undone!

---

**Last Updated**: October 23, 2025
**Maintained By**: Sigmatiq Team
**Related Docs**: [BETA_DEPLOYMENT_SUMMARY.md](./BETA_DEPLOYMENT_SUMMARY.md), [README.md](./README.md)
