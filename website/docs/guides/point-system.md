---
sidebar_position: 1
title: Point System Guide
description: Understand Sigmatiq's proprietary point scoring system
keywords: [point system, signals, scoring, trading indicators]
---

# Point System Guide

The **Sigmatiq Point System** is our proprietary scoring algorithm that simplifies complex technical analysis into a single, easy-to-understand score.

## What is the Point System?

Instead of looking at dozens of indicators (RSI, MACD, Bollinger Bands, etc.), the Point System gives you **one number** from **-80 to +80** that tells you the overall market sentiment for a stock.

### Score Ranges

| Score Range | Signal | What It Means | For Beginners |
|-------------|--------|---------------|---------------|
| **+60 to +80** |  Strong Bullish | Very positive momentum | Consider buying |
| **+20 to +60** |  Moderate Bullish | Positive trend | Watch closely |
| **-20 to +20** |  Neutral | No clear direction | Be cautious |
| **-60 to -20** |  Moderate Bearish | Negative trend | Avoid buying |
| **-80 to -60** |  Strong Bearish | Very negative momentum | Consider selling/avoiding |

:::tip For Beginners
Start by **only** considering stocks with scores above +40. This filters out risky or unclear opportunities.
:::

## How It Works

The Point System analyzes **28+ indicators** across multiple categories:

### 1. Trend Indicators
- Moving Averages (SMA, EMA)
- MACD (Moving Average Convergence Divergence)
- ADX (Average Directional Index)

### 2. Momentum Indicators
- RSI (Relative Strength Index)
- Stochastic Oscillator
- Rate of Change (ROC)

### 3. Volatility Indicators
- Bollinger Bands
- ATR (Average True Range)
- Keltner Channels

### 4. Volume Indicators
- Volume trends
- On-Balance Volume (OBV)
- Volume-weighted indicators

### 5. Regime Detection
- **Trend Regime:** Strong directional movement
- **Mean-Revert Regime:** Oscillating around average
- **Neutral Regime:** No clear pattern

## Real Example

Let's say you're looking at **AAPL (Apple)**:

```json
{
  "symbol": "AAPL",
  "score": 65,
  "coverage": 0.95,
  "reliability": 0.88,
  "regime": "trend",
  "indicators_used": 27,
  "total_indicators": 28
}
```

**What this tells you:**
- **Score: 65**  Strong bullish signal (in the +60 to +80 range)
- **Coverage: 0.95**  95% of indicators had data (high confidence)
- **Reliability: 0.88**  Historical accuracy of 88% in this regime
- **Regime: trend**  Stock is trending (not just bouncing around)
- **Indicators: 27/28**  Almost all indicators contributed

**Beginner translation:** "Apple looks very strong right now, based on 27 different technical indicators. This is a good potential buy signal."

## Coverage and Reliability

### Coverage (0.0 to 1.0)
**What it is:** Percentage of indicators that had enough data to calculate.

- **0.9 - 1.0:** Excellent - trust the score
- **0.7 - 0.9:** Good - mostly reliable
- **< 0.7:** Poor - be cautious, not enough data

:::caution Low Coverage Warning
If coverage is below 0.7, the score might not be accurate. This often happens with:
- Newly listed stocks
- Stocks with low trading volume
- Data provider issues
:::

### Reliability (0.0 to 1.0)
**What it is:** How accurate similar signals were in the past.

- **0.8 - 1.0:** Very reliable - strong track record
- **0.6 - 0.8:** Moderately reliable - decent accuracy
- **< 0.6:** Less reliable - proceed with caution

## Beginner-Friendly Filters

To keep things simple, we recommend these filters for beginners:

```python
# Good opportunities for beginners
score >= 40          # Strong bullish only
coverage >= 0.85     # High data quality
reliability >= 0.75  # Proven accuracy
```

This filters out:
- Weak or unclear signals
- Stocks with missing data
- Unreliable patterns

## What the Point System Does NOT Do

The Point System is **NOT**:
-  A guarantee of profit
-  A replacement for research
-  Financial advice
-  A crystal ball

It **IS**:
-  A data-driven analysis tool
-  A way to filter opportunities
-  A starting point for research
-  A beginner-friendly indicator

## Advanced: How Scores are Calculated

:::note For Advanced Users
This section is technical. Beginners can skip this.
:::

### Step 1: Normalize Indicators
Each indicator is converted to a **z-score** (standard deviations from average), then passed through a **tanh** function to scale to roughly -1 to +1.

### Step 2: Apply Weights
Indicators are weighted based on their **historical predictive power** (IC - Information Coefficient):
- High IC  Higher weight
- Low IC  Lower weight
- Weights are clamped between 0.4 and 2.0

### Step 3: Regime Adjustment
Indicators are mapped to the current market regime:
- **Trend regime:** Favor momentum indicators
- **Mean-revert regime:** Favor oscillators
- **Neutral:** Balanced weighting

### Step 4: Combine and Scale
Weighted scores are summed and scaled to **-80 to +80** range.

### Step 5: Add Discrete Bonuses
Small bonuses for:
- Breakouts (+3 to +5)
- Volume surges (+2 to +4)
- Earnings beats (+1 to +3)

## FAQs

**Q: Can I rely solely on the Point System?**
A: No. Always combine it with your own research, risk management, and market awareness.

**Q: How often do scores update?**
A: Real-time during market hours, with caching to reduce costs.

**Q: What if the score changes suddenly?**
A: Market conditions change. Sudden drops might indicate news, earnings, or technical breakdowns.

**Q: Why use 28 indicators instead of just one?**
A: Diversification. No single indicator is perfect. Combining many reduces noise and false signals.

## Next Steps

- **Try it:** Open your [Sigmatiq app](https://app.sigmatiq.com) and filter by score > 40
- **Learn more:** Read about [Market Analysis](/docs/guides/market-analysis) *(coming soon)*
- **API Access:** Use the [Native API](/docs/api-reference/overview) to build your own tools

---

**Remember:** The Point System is a tool, not a magic formula. Always practice with paper trading first!
