---
title: Trading Guidance Blocks
sidebar_label: Guidance Blocks
---

Cards can include guidance blocks that translate analytics into a trade plan or risk posture. These are designed for beginnerâ€'first use and to be safe by default.

Action Block (ticker cards)
- `entry`: concrete trigger (e.g., pullback to 20â€'day with RSI>50)
- `invalidation`: where the idea is wrong (e.g., lose 20â€'day by ~1Ã-ATR)
- `risk`: `{ atr_pct, sizing_hint }` sizing based on stop distance
- `targets`: simple list (e.g., `+1R`, `+2R`)
- `confidence`: 0â€“100 based on confluence
- `post_check`: quick sanity check (e.g., volume pace â‰¥ 1.0)

Bias Block (context cards)
- `bias`: `risk_on` | `neutral` | `risk_off`
- `focus`: what to prefer (e.g., growth leadership, smallâ€'cap strength)
- `guardrails`: safety rails (e.g., reduce risk if AD ratio < 1 by midday)

Strategy Hint (options)
- `iv_regime`: `Low` | `Moderate` | `High` | `Unknown`
- `event_window_days`: days to earnings if available
- `suggestion`: beginnerâ€'safe strategy guidance (favor definedâ€'risk)
- `caution`: highlights event/gap risks

Sizing Hint (supporting)
- Simple string that translates volatility/liquidity/volume into position sizing guidance.

Examples
```json
{
  "action_block": {
    "entry": "Buy pullback to 20-day with RSI>50",
    "invalidation": "Below 20-day âˆ' ~1Ã-ATR",
    "risk": { "atr_pct": 1.8, "sizing_hint": "If risking 1%, size â‰ˆ 1%/1.8%" },
    "targets": ["+1R", "+2R"],
    "confidence": 75,
    "post_check": "Confirm relative volume â‰¥ 1.0"
  },
  "bias_block": {
    "bias": "risk_on",
    "focus": "trend continuation",
    "guardrails": "If internals weaken intraday, cut risk"
  },
  "strategy_hint": {
    "iv_regime": "High",
    "event_window_days": 3,
    "suggestion": "Prefer defined-risk (debit spreads)",
    "caution": "Earnings soon: elevated gap risk"
  },
  "sizing_hint": "Reduce size; high relative volume can increase volatility"
}
```

