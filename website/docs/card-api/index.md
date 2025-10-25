---
sidebar_position: 1
title: Card API
---

# Card API - Complete Guide

The Sigmatiq Card API transforms complex market data into simple, actionable trading insights through a card-based system designed for beginner traders.

## Quick Start

**Base URL:** `https://api.sigmatiq.com/api/v1/cards`

**Single Endpoint:** `GET /api/v1/cards/{card_id}`

**Example:**
```bash
curl -H "X-User-Id: demo" \
  "https://api.sigmatiq.com/api/v1/cards/ticker_performance?symbol=AAPL&mode=beginner"
```

## What Are Trading Cards?

Cards are pre-packaged analytics that answer specific trading questions in plain language. Instead of raw data feeds, you get:

- **Plain language summaries** - No jargon, clear explanations
- **Three skill levels** - Beginner → Intermediate → Advanced
- **Actionable insights** - What to do, not just what happened
- **Educational context** - Learn while you trade

## Available Cards (34 Total)

### Market Overview (7 cards)
- `market_breadth` - Overall market health
- `sector_rotation` - Which sectors are leading
- `index_heatmap` - Major index performance
- `unusual_options` - Unusual options activity
- `index_technicals` - S&P 500 technical analysis
- `market_internals` - Market momentum and breadth
- `vix_analysis` - Volatility and fear gauge

### Ticker Analysis (18 cards)
- `ticker_performance` - Price action summary
- `ticker_technicals` - Technical indicator overview
- `ticker_momentum` - Momentum and trend strength
- `ticker_volatility` - Historical and implied volatility
- `ticker_volume` - Volume analysis
- `ticker_support_resistance` - Key price levels
- `ticker_moving_averages` - MA crossovers and trends
- `ticker_rsi_macd` - Oscillator signals
- `ticker_bollinger` - Bollinger Band analysis
- `ticker_stochastic` - Stochastic oscillator
- `ticker_fundamentals` - Key financial metrics
- `ticker_relative_strength` - Performance vs market
- `ticker_liquidity` - Trading liquidity assessment
- `ticker_breakout` - Breakout potential scoring
- `ticker_reversal` - Reversal signal detection
- `ticker_short_interest` - Short squeeze potential
- `ticker_insider` - Insider transaction analysis
- `ticker_institutional` - Smart money positioning

### Options Cards (5 cards)
- `ticker_options_flow` - Options flow analysis
- `ticker_options_chain` - At-a-glance chain overview
- `ticker_earnings` - Earnings calendar and history
- `ticker_dividends` - Dividend information
- `ticker_news` - Recent news sentiment

### Utility Cards (4 cards)
- `position_sizer` - Risk-based position sizing calculator
- `risk_calculator` - Risk/reward analysis tool
- `watchlist_stats` - Aggregate watchlist metrics
- `ticker_correlation` - Correlation and beta analysis

## Card Modes

Each card supports three modes:

### Beginner Mode (Default)
- **Goal:** Quick decisions, minimal information overload
- **Format:** Plain language, simple metrics, clear actions
- **Example:** "AAPL is in a strong uptrend. Price above all MAs. Consider buying dips."

### Intermediate Mode
- **Goal:** More context for experienced traders
- **Format:** Additional metrics, multi-timeframe analysis
- **Example:** Includes specific MA values, RSI levels, volume comparisons

### Advanced Mode
- **Goal:** Full data for algorithmic/professional use
- **Format:** All raw metrics, detailed breakdowns, precise values
- **Example:** Complete indicator values, historical comparisons, statistical measures

## API Usage

### Headers
```
X-User-Id: <string> (required)
```

### Query Parameters
- `mode` - beginner | intermediate | advanced (default: beginner)
- `symbol` - Ticker symbol (required for ticker cards)
- `date` - YYYY-MM-DD (optional, defaults to latest)

### Response Format
```json
{
  "card_id": "ticker_performance",
  "symbol": "AAPL",
  "mode": "beginner",
  "data": {
    // Card-specific data structure
  },
  "timestamp": "2025-10-23T12:00:00Z"
}
```

### Error Codes
- `400` - Missing required parameters (e.g., symbol)
- `403` - Card disabled
- `404` - No data found
- `500` - Internal error

## Common Use Cases

### 1. Morning Market Check
```bash
# Check overall market health
GET /api/v1/cards/market_breadth?mode=beginner

# Check sector rotation
GET /api/v1/cards/sector_rotation?mode=beginner
```

### 2. Stock Research
```bash
# Get performance overview
GET /api/v1/cards/ticker_performance?symbol=AAPL&mode=beginner

# Check technical setup
GET /api/v1/cards/ticker_technicals?symbol=AAPL&mode=beginner

# Review fundamentals
GET /api/v1/cards/ticker_fundamentals?symbol=AAPL&mode=beginner
```

### 3. Trade Planning
```bash
# Calculate position size
GET /api/v1/cards/position_sizer?symbol=AAPL&account=10000&risk_pct=1&entry=150&stop=145

# Check risk/reward
GET /api/v1/cards/risk_calculator?entry=150&stop=145&target=160
```

## Best Practices

### For Beginners
1. Start with `market_breadth` daily
2. Use `ticker_performance` for stock research
3. Always check `ticker_technicals` before trading
4. Use `position_sizer` to manage risk

### For Intermediate Traders
1. Combine multiple cards for complete picture
2. Use `mode=intermediate` for more context
3. Track `sector_rotation` for swing trades
4. Monitor `ticker_relative_strength` for momentum

### For Advanced Users
1. Use `mode=advanced` for algorithmic trading
2. Aggregate data from multiple cards
3. Build custom dashboards
4. Implement automated alerts

## Common Mistakes to Avoid

1. **Trading without market context** - Always check `market_breadth` first
2. **Ignoring risk management** - Use `position_sizer` for every trade
3. **Information overload** - Start with beginner mode
4. **Not checking all timeframes** - Review multiple technical cards

## Next Steps

- View [Complete Card Reference](./all-cards-reference.md) for detailed card documentation
- Check [Trading Glossary](./glossary.md) for term definitions
- Review [Proposed Enhancements](./enhancements.md) for upcoming features

## Support

For API issues or questions:
- GitHub: [Sigmatiq/sigmatiq-docs](https://github.com/Sigmatiq/sigmatiq-docs)
- Email: support@sigmatiq.com
