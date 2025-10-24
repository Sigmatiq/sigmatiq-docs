---
title: Endpoints
sidebar_label: Endpoints
---

Cards are served by a single read-only endpoint that returns derived analytics.

```
GET /api/v1/cards/{card_id}
```

**Headers:**
- `X-User-Id: <string>` (required)

**Query Parameters:**
- `mode`: `beginner` | `intermediate` | `advanced` (default: `beginner`)
- `symbol`: ticker symbol (required for ticker cards)
- `date`: `YYYY-MM-DD` (optional; defaults to latest EOD; falls back if needed)

## Examples

```bash
curl -H "X-User-Id: demo" \
  "https://<host>/api/v1/cards/ticker_performance?symbol=AAPL&mode=beginner"

curl -H "X-User-Id: demo" \
  "https://<host>/api/v1/cards/market_breadth?mode=intermediate&date=2025-10-22"
```

## Errors

- 400: missing `symbol` for symbol-required cards
- 403: card disabled
- 404: no data found within fallback window
- 500: internal error

## Notes

- Some cards include `action_block`, `bias_block`, `strategy_hint`, or `sizing_hint` to guide decisions. See Guidance Blocks for details.
- Fallbacks: if `date` has no data, API searches recent trading days; for ticker cards, a symbol-aware fallback is used first.
