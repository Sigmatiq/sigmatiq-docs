---
sidebar_position: 2
title: Authentication
description: How to authenticate with Sigmatiq APIs
keywords: [authentication, api keys, headers]
---

# Authentication

Sigmatiq APIs use simple header-based authentication and user identification.

## Required Headers

- `X-User-Id: <string>` — identifies the user for analytics and personalization.

## Notes

- For internal/beta environments, `X-User-Id` is sufficient to access read-only endpoints (e.g., Card API).
- Production environments may introduce API keys or OAuth flows. This page will be updated when that becomes available.

## Example

```bash
curl -H "X-User-Id: demo" \
  "https://<host>/api/v1/cards/market_breadth?mode=beginner"
```

---

Need help? Contact support at support@sigmatiq.com.

