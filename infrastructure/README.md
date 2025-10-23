# Sigmatiq Infrastructure Documentation

Complete guide to deploying and managing the Sigmatiq Trading Platform on Azure.

---

## 📚 Documentation Index

### Getting Started

1. **[Azure Deployment Plan](./AZURE_DEPLOYMENT_PLAN.md)** - Original planning document
   - Architecture overview
   - Environment strategy (beta vs production)
   - Resource planning and cost estimates
   - Infrastructure components breakdown

### Beta Environment (Current)

2. **[Beta Deployment Summary](./BETA_DEPLOYMENT_SUMMARY.md)** - Current status and guide
   - ✅ Completed Steps 1-4 deployment details
   - Resource inventory with connection strings
   - Next steps for completing Step 5
   - Troubleshooting guide and cost estimates
   - **👉 Start here for beta deployment status**

### Production Environment (Future)

3. **[Production Runbook](./PROD_RUNBOOK.md)** - Complete production deployment guide
   - 9-step production deployment process
   - Secure VNet-based architecture
   - P2S VPN Gateway setup
   - Private endpoints for data isolation
   - DNS Private Resolver configuration

4. **[Production VPN Setup](./PROD_VPN_SETUP.md)** - VPN access configuration
   - Certificate generation and management
   - VPN client profile configuration
   - Troubleshooting VPN connections

### CI/CD & Automation

5. **[CI Notes](./CI_NOTES.md)** - Continuous Integration workflow
   - GitHub Actions CI workflow
   - Bicep template validation
   - Azure What-If integration with OIDC
   - Branch protection recommendations

---

## 🏗️ Architecture Overview

### Environment Strategy

The Sigmatiq platform uses a **two-environment strategy**:

```
┌─────────────────────────────────────────────────────────────┐
│                       Azure Subscription                     │
│                     "sigmatiq" (centralus)                   │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
        ┌───────▼────────┐          ┌──────▼───────┐
        │  Beta (Steps   │          │  Production  │
        │    1-5)        │          │  (Steps 6-7) │
        └───────┬────────┘          └──────┬───────┘
                │                           │
    ┌───────────┴───────────┐   ┌──────────┴──────────┐
    │   Public Access       │   │   Private VNet      │
    │   - Public PostgreSQL │   │   - Private Endpoints│
    │   - Public Redis      │   │   - P2S VPN Gateway  │
    │   - Container Apps    │   │   - DNS Resolver     │
    └───────────────────────┘   └─────────────────────┘
```

### Resource Groups

| Resource Group | Purpose | Environment |
|----------------|---------|-------------|
| `rg-trading-shared` | Shared resources (Key Vault, ACR) | Both |
| `rg-trading-beta-data` | Beta data layer (PostgreSQL, Redis) | Beta |
| `rg-trading-beta-apps` | Beta Container Apps | Beta |
| `rg-trading-prod-data` | Production data layer (secure) | Production |
| `rg-trading-prod-apps` | Production Container Apps (secure) | Production |

---

## 🚀 Deployment Status

### Beta Environment (✅ Steps 1-4 Complete)

**Last Updated**: October 23, 2025

| Step | Status | Resources |
|------|--------|-----------|
| 1. Resource Groups | ✅ Complete | 5 resource groups |
| 2a. Shared Key Vault | ✅ Complete | kv-trading-shared |
| 2b. Shared ACR | ✅ Complete | acrtradingshared.azurecr.io |
| 3. Beta Data | ✅ Complete | PostgreSQL + Redis |
| 4. Beta App Infra | ✅ Complete | MI, KV, AppConfig, CAE |
| 5. Beta Container Apps | ⏸️ Pending | Requires Docker images |

**Key Resources**:
- PostgreSQL: `psql-trading-beta.postgres.database.azure.com`
- Redis: `redis-trading-beta-1023.redis.cache.windows.net:6380`
- Container Apps Domain: `whitefield-f5a1fd73.centralus.azurecontainerapps.io`

### Production Environment (📋 Planned)

| Step | Status | Purpose |
|------|--------|---------|
| 6. Prod Foundation | 📋 Templates Ready | VNet, VPN, DNS, Private Endpoints |
| 7. Prod Data | 📋 Templates Ready | PostgreSQL GP + Redis Premium (private) |

---

## 🔐 Security Model

### Beta Environment

- **Public Access**: Resources accessible from internet with firewall rules
- **Authentication**: Managed Identity for Container Apps → ACR/Key Vault
- **Secrets Management**: Azure Key Vault with RBAC
- **Network**: Container Apps with public ingress

### Production Environment

- **Private Access**: All resources in VNet with private endpoints
- **VPN Required**: P2S VPN Gateway for administrative access
- **DNS Integration**: Private DNS zones for name resolution
- **Enhanced Security**:
  - No public IPs
  - NSG rules
  - Private endpoint connections
  - Certificate-based VPN auth

---

## 📦 Technology Stack

### Infrastructure as Code
- **Bicep** templates for Azure resource deployment
- **Azure CLI** for automation and scripting
- **GitHub Actions** for CI/CD validation

### Azure Services

| Service | Purpose | Beta SKU | Prod SKU |
|---------|---------|----------|----------|
| PostgreSQL Flexible Server | Primary database | Standard_B1ms | Standard_D2ds_v4 |
| Azure Cache for Redis | L2 cache layer | Basic C0 | Premium P1 |
| Container Apps | API hosting | Consumption | Consumption |
| Key Vault | Secrets storage | Standard | Standard |
| Container Registry | Docker images | Basic | Basic |
| VNet | Network isolation | - | /16 address space |
| VPN Gateway | Secure access | - | VpnGw1 |
| DNS Resolver | Name resolution | - | Standard |

### APIs to Deploy (5 Services)

1. **Auth API** (port 8004) - Authentication and authorization
2. **Native API** (port 8002) - Native trading operations
3. **Pilot API** (port 8003) - Pilot/demo features
4. **Card API** (port 8005) - Card-based trading interface
5. **Sim API** (port 8084) - Paper trading simulation

---

## 💰 Cost Estimates

### Beta Environment: ~$37/month

| Resource | Monthly Cost |
|----------|-------------|
| PostgreSQL Standard_B1ms | ~$15 |
| Redis Basic C0 | ~$16 |
| Container Apps (5) | ~$0 (free tier) |
| Key Vault (2) | <$1 |
| Container Registry | ~$5 |

### Production Environment: ~$500/month (estimated)

| Resource | Monthly Cost |
|----------|-------------|
| PostgreSQL Standard_D2ds_v4 | ~$120 |
| Redis Premium P1 | ~$250 |
| VPN Gateway VpnGw1 | ~$140 |
| DNS Resolver | ~$25 |
| Container Apps | ~$0 (within free tier) |
| Key Vault + Misc | ~$10 |

*Note: Actual costs depend on usage patterns, data transfer, and storage growth.*

---

## 🛠️ Common Tasks

### Deploy Beta Environment

```bash
cd sigmatiq-infrastructure/scripts

# Step 1: Resource Groups
./01-deploy-resource-groups.sh

# Step 2: Shared Resources
./02a-deploy-shared-keyvault.sh
./02b-deploy-shared-acr.sh

# Step 3: Beta Data Layer
export POSTGRES_ADMIN_USER="sqladmin"
export POSTGRES_ADMIN_PASSWORD="<your-password>"
./03-deploy-beta-data.sh

# Step 4: Beta App Infrastructure
./04-deploy-beta-app-infra.sh

# Step 5: Beta Container Apps (requires Docker images first)
./05-deploy-beta-container-apps.sh
```

### Deploy Production Environment

```bash
cd sigmatiq-infrastructure/scripts

# All-in-one production deployment
./deploy_prod_all.sh

# Or step-by-step:
# Step 6: Production Foundation
cd ../bicep/main
az deployment sub create --template-file 06-deploy-prod-secure-foundation.bicep

# Step 7: Production Data Layer
az deployment group create --template-file 07-deploy-prod-secure-data.bicep \
  --resource-group rg-trading-prod-data
```

See [PROD_RUNBOOK.md](./PROD_RUNBOOK.md) for complete production deployment guide.

### Build and Push Docker Images

```bash
# Login to ACR
az acr login --name acrtradingshared

# Build and push auth-api (example)
cd sigmatiq-auth-api
docker build -t acrtradingshared.azurecr.io/sigmatiq-auth-api:beta .
docker push acrtradingshared.azurecr.io/sigmatiq-auth-api:beta

# Repeat for other APIs...
```

### Store Provider API Keys

```bash
# Store in shared Key Vault
az keyvault secret set --vault-name kv-trading-shared \
  --name Polygon-API-Key --value "<your-key>"

az keyvault secret set --vault-name kv-trading-shared \
  --name Alpaca-API-Key --value "<your-key>"

az keyvault secret set --vault-name kv-trading-shared \
  --name Alpaca-Secret-Key --value "<your-secret>"

az keyvault secret set --vault-name kv-trading-shared \
  --name AlphaVantage-API-Key --value "<your-key>"
```

### Create PostgreSQL Databases

```bash
# Connect to PostgreSQL
psql "postgresql://sqladmin:<password>@psql-trading-beta.postgres.database.azure.com:5432/postgres?sslmode=require"

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

### Run Database Migrations

```bash
cd sigmatiq-database

# Set connection string
export DATABASE_URL="postgresql://sqladmin:<password>@psql-trading-beta.postgres.database.azure.com:5432/sigmatiq_core?sslmode=require"

# Run migrations
python scripts/apply_migrations.py --dir migrations/core
```

---

## 🔍 Troubleshooting

### Common Issues

#### PostgreSQL Connection Refused

```bash
# Check firewall rules
az postgres flexible-server firewall-rule list \
  --name psql-trading-beta \
  --resource-group rg-trading-beta-data

# Temporarily whitelist your IP
./scripts/whitelist-my-ip-beta.sh
```

#### Container App Image Pull Failure

```bash
# Verify Managed Identity has AcrPull role
az role assignment list --assignee <MI-principal-id>

# Grant role via Azure Portal:
# ACR → Access control (IAM) → Add → AcrPull → Select mi-trading-beta
```

#### Key Vault Access Denied

```bash
# Verify RBAC role assignment (not access policies)
az role assignment list --scope <key-vault-resource-id>

# Grant Key Vault Secrets Officer via Azure Portal:
# Key Vault → Access control (IAM) → Add → Key Vault Secrets Officer
```

### Getting Help

- **Infrastructure Issues**: Check [BETA_DEPLOYMENT_SUMMARY.md](./BETA_DEPLOYMENT_SUMMARY.md)
- **Production Deployment**: See [PROD_RUNBOOK.md](./PROD_RUNBOOK.md)
- **VPN Problems**: Refer to [PROD_VPN_SETUP.md](./PROD_VPN_SETUP.md)
- **CI/CD Issues**: Review [CI_NOTES.md](./CI_NOTES.md)

---

## 📖 Related Documentation

### Sigmatiq Platform Docs

- **Architecture**: See main documentation site
- **API Documentation**: Individual API README files
- **Database Schemas**: sigmatiq-database repository
- **Point System**: sigmatiq-point-system repository

### Azure Documentation

- [Azure Container Apps](https://learn.microsoft.com/azure/container-apps/)
- [PostgreSQL Flexible Server](https://learn.microsoft.com/azure/postgresql/flexible-server/)
- [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)
- [Bicep Documentation](https://learn.microsoft.com/azure/azure-resource-manager/bicep/)

---

## 🤝 Contributing

Infrastructure changes should:

1. Follow the existing Bicep module structure
2. Include parameter validation and descriptions
3. Add documentation to appropriate guide
4. Pass CI validation (Bicep build + shellcheck)
5. Be reviewed before merging to main

See `.github/workflows/ci.yml` and [CI_NOTES.md](./CI_NOTES.md) for CI requirements.

---

## 📝 Change Log

### October 23, 2025
- ✅ Completed beta deployment Steps 1-4
- 🐛 Fixed PostgreSQL API version (→ 2023-06-01-preview)
- 🐛 Fixed Bicep syntax errors (network.bicep, resource-group.bicep)
- ➕ Added suffix parameters for DNS conflict resolution
- 📚 Added comprehensive deployment documentation
- 🚀 Created production infrastructure templates
- 🔧 Added CI/CD workflow with OIDC support

### October 22, 2025
- 📋 Initial Azure deployment planning
- 🏗️ Created base Bicep module structure
- 📖 Documented shared Key Vault architecture

---

**Repository**: [Sigmatiq/sigmatiq-infrastructure](https://github.com/Sigmatiq/sigmatiq-infrastructure)

**Maintained By**: Sigmatiq Team

**Last Updated**: October 23, 2025
