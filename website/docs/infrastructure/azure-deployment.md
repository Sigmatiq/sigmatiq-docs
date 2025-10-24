---
sidebar_position: 1
title: Azure Deployment Plan
description: Deploy the Sigmatiq trading platform to Microsoft Azure
keywords: [azure, deployment, infrastructure, beginner-friendly]
---

# Azure Deployment Plan

> **For:** DevOps engineers and developers deploying the Sigmatiq platform
> **Last Updated:** October 23, 2025
> **Status:** Active - Fresh Azure account setup

##  Overview

This document describes how we deploy the Sigmatiq trading platform to Microsoft Azure. We designed this infrastructure with **beginner traders** in mind - safe, scalable, and cost-effective.

### What You'll Learn
- How our Azure resources are organized
- Which apps and databases we deploy
- How data flows between services
- How to deploy to beta and production environments

---

##  Design Principles

### 1. **Beginner-First Safety**
- **Data separation:** Databases are in separate resource groups from apps (prevents accidental deletion)
- **Progressive disclosure:** Beta environment for safe testing before production
- **Paper trading:** Simulation API lets beginners practice without risk

### 2. **Cost Optimization**
- **Shared container registry:** One ACR for both beta and prod (lower cost)
- **Scale-to-zero:** Beta apps can scale down when idle
- **Right-sized databases:** Burstable tier PostgreSQL for cost efficiency

### 3. **Developer Experience**
- **Consistent naming:** Predictable resource names across environments
- **Clear boundaries:** Each API has its own database where needed
- **Redis caching:** Fast response times without expensive database queries

---

##  Infrastructure Architecture

### Environments

We use **two environments only:**

| Environment | Purpose | Scale | Cost Profile |
|-------------|---------|-------|--------------|
| **Beta** | Beginner testing, feature validation | Scale-to-zero | Low (~$50-100/month) |
| **Prod** | Live trading platform | Always-on, redundant | Higher (~$300-500/month) |

**Why only two?** Simplicity. Fewer environments = less confusion for beginners and lower maintenance.

---

##  Resource Organization

### Resource Groups (5 total)

We organize resources into **5 resource groups** for safety and access control:

```
Azure Subscription

 rg-trading-shared
    kv-trading-shared (Key Vault for provider secrets)
    acrtradingshared (Container Registry)

 rg-trading-beta-data
    psql-trading-beta (PostgreSQL Server)
    redis-trading-beta (Redis Cache)

 rg-trading-beta-apps
    kv-trading-beta (Key Vault)
    appconfig-trading-beta (App Configuration)
    cae-trading-beta (Container Apps Environment)
    auth-api-beta (Authentication API)
    native-api-beta (Native Trading API)
    pilot-api-beta (Pilot Features API)
    card-api-beta (Card API)
    sim-api-beta (Paper Trading API)

 rg-trading-prod-data
    psql-trading-prod (PostgreSQL Server)
    redis-trading-prod (Redis Cache)

 rg-trading-prod-apps
     kv-trading-prod (Key Vault)
     appconfig-trading-prod (App Configuration)
     cae-trading-prod (Container Apps Environment)
     [Same 5 APIs as beta]
```

### Why Separate Data and Apps?

**Safety!** If someone accidentally deletes the apps resource group, your databases are safe. This protects beginner trader data - accounts, watchlists, paper trading history.

---

##  Naming Convention

**Pattern:** `{resource-type}-{product}-{environment}`

**Examples:**
- Resource Group: `rg-trading-beta`
- PostgreSQL: `psql-trading-beta`
- Redis: `redis-trading-beta`
- Key Vault: `kv-trading-beta`
- Container App: `auth-api-beta`

**Exception:** Container Registry is shared, so it's `acrtradingshared` (no environment suffix)

**Why this pattern?** Easy to identify resources at a glance. When you see `psql-trading-beta`, you instantly know it's a PostgreSQL server for the trading platform in the beta environment.

---

##  Database Architecture

### PostgreSQL Server: `psql-trading-beta`

One PostgreSQL server hosts **8 databases:**

| Database | Used By | Purpose |
|----------|---------|---------|
| `sigmatiq_auth` | auth-api | User accounts, authentication, sessions |
| `sigmatiq_core` | native-api | **Lightweight:** Watchlists, presets, user preferences, securities |
| `sigmatiq_backfill` | ALL APIs | Market data cache + expensive computations (indicators, news, fundamentals) |
| `sigmatiq_research` | *Future* | Models, backtests, scanners, alerts, ML (advanced features) |
| `sigmatiq_pilot` | pilot-api | Broker integrations, feeds, showcase features |
| `sigmatiq_cards` | card-api | Card-based UI features |
| `sigmatiq_paper` | sim-api | Paper trading accounts, orders, positions |
| `sigmatiq_signals` | native-api | Point system signals and scoring |

### Why 8 Databases?

**Separation of concerns:**
- **Security:** Auth data is isolated
- **Clarity:** Each API owns its data
- **Migration safety:** Changes to one database don't affect others
- **Beginner-friendly:** Clear boundaries make it easier to understand data flow

### Database Size Strategy

**Beta Environment:**
- PostgreSQL: Burstable tier `Standard_B1ms` (1 vCore, 2GB RAM, 32GB storage)
- Redis: Basic tier `C0` (250MB)
- Auto-scaling enabled

**Production Environment (future):**
- PostgreSQL: General Purpose tier (2-4 vCores, auto-scaling storage)
- Redis: Standard tier with persistence
- Zone redundancy enabled

---

##  Application Services

### Container Apps (5 APIs)

All apps run on **Azure Container Apps** (serverless containers):

| App | Port | Purpose | Min Replicas (Beta) |
|-----|------|---------|---------------------|
| `auth-api-beta` | 8004 | Authentication, user management | 0 (scale-to-zero) |
| `native-api-beta` | 8002 | Core trading API (watchlists, market data) | 1 (always on) |
| `pilot-api-beta` | 8003 | Experimental features, broker connections | 0 |
| `card-api-beta` | 8000 | Card-based UI data | 0 |
| `sim-api-beta` | 8084 | Paper trading simulation | 0 |

**Why scale-to-zero?** Beta environment saves costs when idle. Production will have `minReplicas: 2` for reliability.

### Container Registry

**`acrtradingshared`** - Premium tier

**Stores images:**
```
trading/auth-api:latest
trading/auth-api:v1.2.3
trading/native-api:latest
trading/pilot-api:latest
trading/card-api:latest
trading/sim-api:latest
```

**Why shared?** Image promotion from beta to prod is just retagging - no rebuilds needed.

---

##  Caching Strategy

**3-Level Cache (L1  L2  L3):**

```
Request
  
[L1: Memory Cache]  Fast (microseconds), per-process
   miss
[L2: Redis Cache]  Medium (milliseconds), shared
   miss
[L3: Database Tables]  Slow (seconds), persistent
   miss
[Provider API]  Expensive ($$$), rate-limited
```

### Configuration

```bash
# Enable in-memory cache (L1)
SIGMA_KV_ENABLE_MEM=true

# Enable Redis cache (L2)
USE_REDIS_CACHE=true
REDIS_HOST=redis-trading-beta.redis.cache.windows.net
REDIS_PORT=6380

# L3 PostgreSQL cache - DISABLED
# (We use dedicated tables in sigmatiq_backfill instead)
# SIGMA_KV_PG_URL=<not set>
```

### Where Data is Cached

**L1 (Memory):** API responses (short TTL, 60s)
**L2 (Redis):** User preferences, watchlists, session data
**L3 (Backfill DB):** Market data, indicators, news, fundamentals

**Why disable L3 generic cache?** We have proper tables in `sigmatiq_backfill` for market data. No need for a generic KV cache table.

---

##  Security & Secrets

### Shared Key Vault: `kv-trading-shared`  NEW

**Purpose:** Centralized storage for provider secrets shared across all environments

**Stores:**
- **Provider API Keys:** Polygon, Alpaca, Alpha Vantage
- **External Integrations:** OpenAI API keys
- **CI/CD Secrets:** GitHub tokens, Azure DevOps PATs
- **Shared credentials:** Third-party integrations

**Why shared?** No secret duplication. Update once, use everywhere. Better compliance and audit trail.

**Security:**
- Purge protection: **Enabled** (90-day retention)
- RBAC authorization
- Soft delete: 90 days
- Access logs for compliance

### Environment Key Vaults

Each environment has its own vault for environment-specific secrets:

**`kv-trading-beta`:**
- PostgreSQL passwords (beta-specific)
- Redis connection strings
- Environment-specific config

**`kv-trading-prod` (future):**
- PostgreSQL passwords (prod-specific)
- Redis connection strings
- Production-specific secrets

**Why separate?** Environment isolation. Beta can be purged; prod cannot.

### Managed Identities

Each environment has a **Managed Identity** (passwordless authentication):

- `mi-trading-beta`  Used by all beta container apps
- `mi-trading-prod`  Used by all prod container apps

**Permissions:**
- AcrPull on container registry
- Key Vault Secrets User
- App Configuration Data Reader

**Why Managed Identities?** No passwords in code. Azure handles authentication automatically.

---

##  Networking & Domains

### Beta Environment

**Container Apps default domains:**
```
auth-api-beta.{region}.azurecontainerapps.io
native-api-beta.{region}.azurecontainerapps.io
...
```

**Future custom domains:**
```
beta-api.sigmatiq.com  API Gateway
beta.sigmatiq.com  Mobile/Web UI
```

### Production Environment

**Custom domains (future):**
```
api.sigmatiq.com  Production API Gateway
app.sigmatiq.com  Production Mobile/Web UI
docs.sigmatiq.ai  Developer documentation
```

---

##  Cost Estimates

### Beta Environment (Monthly)

| Resource | Tier | Est. Cost |
|----------|------|-----------|
| PostgreSQL Flexible Server | Burstable B1ms | $15-25 |
| Redis Cache | Basic C0 | $15 |
| Container Apps (5 apps) | Consumption | $10-30 |
| Container Registry (shared) | Premium | $20 |
| Key Vault - Shared | Standard | $3 |
| Key Vault - Beta | Standard | $2 |
| Storage & Networking | - | $5-10 |
| **Total** | | **~$70-105** |

### Production Environment (Monthly - Future)

| Resource | Tier | Est. Cost |
|----------|------|-----------|
| PostgreSQL Flexible Server | General Purpose 2 vCore | $150-200 |
| Redis Cache | Standard C1 | $75 |
| Container Apps (5 apps, always-on) | Consumption | $100-150 |
| Container Registry | Premium (shared) | $0 (shared) |
| Key Vault - Shared | Standard | $0 (shared) |
| Key Vault - Prod | Standard | $3 |
| Load Balancer / App Gateway | - | $50-75 |
| Monitoring & Logs | - | $20-30 |
| **Total** | | **~$398-533** |

**Cost optimization tips:**
- Use auto-scaling to scale down during off-hours
- Monitor and tune database sizes
- Archive old backfill data to cheaper storage

---

##  Migration Strategy (Future)

When we split `sigmatiq_core` into core + research:

**Keep in `sigmatiq_core` (lightweight, shared):**
- Migrations 0001-0015: Core schemas, watchlists, presets, securities
- User preferences
- Basic indicators registry (reference only)

**Move to `sigmatiq_research` (advanced features):**
- Migrations 0016+: Models, backtests, scanners, alerts
- ML training configs
- Jobs framework
- Wizard templates

**Why split?** Keep native-api fast and simple for beginners. Advanced features (backtesting, ML models) are for intermediate/pro traders.

---

##  Deployment Checklist

### Initial Setup (One-time)

**Step 1: Resource Groups**
- [ ] Create Azure subscription
- [ ] Create resource groups (5)
- [ ] Verify all RGs created with correct tags

**Step 2a: Shared Key Vault**  NEW
- [ ] Deploy `kv-trading-shared` in `rg-trading-shared`
- [ ] Store provider secrets (Polygon, Alpaca, Alpha Vantage)
- [ ] Store external integration secrets (OpenAI API keys)
- [ ] Store CI/CD secrets (GitHub tokens, Azure DevOps PATs)
- [ ] Verify purge protection is enabled

**Step 2b: Shared Container Registry**
- [ ] Deploy `acrtradingshared` in `rg-trading-shared`
- [ ] Configure 30-day retention policy
- [ ] Verify Premium tier for geo-replication

**Step 3: Data Layer (Beta)**
- [ ] Deploy PostgreSQL Flexible Server (`psql-trading-beta`)
- [ ] Deploy Redis Cache (`redis-trading-beta`)
- [ ] Store PostgreSQL admin password in environment Key Vault
- [ ] Configure firewall rules for Azure services

**Step 4: App Infrastructure (Beta)**
- [ ] Create managed identity (`mi-trading-beta`)
- [ ] Deploy environment Key Vault (`kv-trading-beta`)
- [ ] Deploy App Configuration (`appconfig-trading-beta`)
- [ ] Deploy Container Apps Environment (`cae-trading-beta`)
- [ ] Grant ACR Pull permissions to managed identity
- [ ] Grant Key Vault access to managed identity

**Step 5: Container Apps (Beta)**
- [ ] Build and push Docker images to ACR
- [ ] Deploy 5 container apps (auth, native, pilot, card, sim)
- [ ] Verify FQDNs and health endpoints
- [ ] Configure ingress and scaling

### Per-API Deployment

- [ ] Build Docker image
- [ ] Tag image: `acrtradingshared.azurecr.io/trading/{api-name}:latest`
- [ ] Push to ACR
- [ ] Deploy container app (or update existing)
- [ ] Run database migrations
- [ ] Test health endpoint
- [ ] Verify in Azure Portal

### Database Setup

- [ ] Run migrations for each database
- [ ] Seed reference data (securities, indicators)
- [ ] Test connections from each API
- [ ] Verify Redis connectivity
- [ ] Test caching behavior

---

##  Monitoring & Observability

### Health Checks

Each API exposes:
- `/healthz` - Basic health
- `/readyz` - Ready to serve traffic
- `/docs` - Swagger/OpenAPI docs

### Metrics (Future)

- Request latency (p50, p95, p99)
- Cache hit rates (L1, L2, backfill)
- Database connection pool usage
- Error rates by endpoint
- Active users (from auth-api)

### Alerts (Future)

- API downtime > 2 minutes
- Database CPU > 80%
- Redis memory > 90%
- Error rate > 5%
- Cache miss rate > 50%

---

##  Contributing

Questions or suggestions about this infrastructure?

1. Check existing docs in `/infrastructure/`
2. Open an issue: [sigmatiq-docs/issues](https://github.com/Sigmatiq/sigmatiq-docs/issues)
3. For urgent issues, contact the platform team

---

##  Related Documentation

- [Architecture Review Fixes](https://github.com/Sigmatiq/sigmatiq-infrastructure/blob/main/docs/REVIEW_FIXES.md) - All fixes applied based on architecture review
- [Infrastructure README](https://github.com/Sigmatiq/sigmatiq-infrastructure/blob/main/README.md) - Deployment scripts and troubleshooting
- [Database Schema Reference](./DATABASE_SCHEMA.md) *(coming soon)*
- [API Deployment Guide](./API_DEPLOYMENT.md) *(coming soon)*
- [Monitoring Setup](./MONITORING_SETUP.md) *(coming soon)*
- [Cost Optimization](./COST_OPTIMIZATION.md) *(coming soon)*

---

**Next Steps:**
- Review this plan with the team
- Validate cost estimates with Azure calculator
- Deploy beta environment
- Test with sample beginner trader workflows
- Document deployment scripts and automation
