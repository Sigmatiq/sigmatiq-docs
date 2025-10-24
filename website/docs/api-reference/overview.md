---
sidebar_position: 1
title: API Overview
description: Sigmatiq API reference for developers
keywords: [api, rest, authentication, endpoints]
---

# API Reference

The Sigmatiq platform provides multiple APIs for building trading applications.

## Available APIs

### Native API (Port 8002)
Core trading functionality for beginner traders.

**Base URL:** `https://api.sigmatiq.com/native` *(production - coming soon)*

**Features:**
- Watchlists and universe presets
- Real-time market data
- Point system scores
- User preferences
- Market snapshots

**Use Cases:**
- Mobile trading apps
- Web dashboards
- Custom trading tools

### Auth API (Port 8004)
User authentication and account management.

**Base URL:** `https://api.sigmatiq.com/auth` *(production - coming soon)*

**Features:**
- Email/password authentication
- Google OAuth integration
- Session management
- User profiles

### Pilot API (Port 8003)
Experimental features and broker integrations.

**Base URL:** `https://api.sigmatiq.com/pilot` *(production - coming soon)*

**Features:**
- Broker connections (Alpaca, etc.)
- Real-money trading
- Advanced features (beta)

### Sim API (Port 8084)
Paper trading simulation.

**Base URL:** `https://api.sigmatiq.com/sim` *(production - coming soon)*

**Features:**
- Virtual accounts
- Paper trading orders
- Position tracking
- Performance analytics

### Card API (Port 8000)
Card-based UI data for mobile apps.

**Base URL:** `https://api.sigmatiq.com/cards` *(production - coming soon)*

**Features:**
- Dynamic card data
- Personalized recommendations
- UI configuration

## Authentication

All API requests require authentication using JWT tokens.

```bash
# Get auth token
curl -X POST https://api.sigmatiq.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "your-password"}'

# Use token in requests
curl https://api.sigmatiq.com/native/watchlists \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Rate Limits

| Tier | Requests/Minute | Requests/Day |
|------|-----------------|--------------|
| Free | 60 | 5,000 |
| Pro | 300 | 50,000 |
| Enterprise | Custom | Custom |

## Response Format

All successful responses return JSON:

```json
{
  "data": { ... },
  "meta": {
    "cached": true,
    "cache_age_seconds": 45,
    "cached_at": "2025-10-23T12:00:00Z"
  }
}
```

## Error Handling

Error responses include standard HTTP status codes:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Watchlist not found",
    "details": {
      "watchlist_id": "abc123"
    }
  }
}
```

## API Endpoints

import DocCardList from '@theme/DocCardList';

<DocCardList />

## SDKs

Official SDKs coming soon:
- Python SDK
- JavaScript/TypeScript SDK
- React Native SDK

## Need Help?

-  **Developer Support:** dev@sigmatiq.com
-  **Report API Issues:** [GitHub Issues](https://github.com/Sigmatiq/sigmatiq-docs/issues)
-  **Community:** [Discord](https://discord.gg/sigmatiq) *(coming soon)*
