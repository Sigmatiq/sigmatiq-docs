# Sigmatiq Card API - Complete Handler Analysis for Beginner Trader Documentation

**Analysis Date:** 2025-10-23
**Total Handlers Analyzed:** 34
**Purpose:** Comprehensive review for beginner trader documentation

---

## Executive Summary

This document provides a comprehensive analysis of all 34 card handlers in the `sigmatiq-card-api` project. Each handler implements a three-tier system (beginner/intermediate/advanced) to serve traders of different skill levels. The analysis identifies:

- **Card Purposes** and target audiences
- **Key Metrics** delivered at each complexity level
- **Educational Content** embedded in beginner modes
- **Data Sources** (database tables used)
- **Code Quality Issues** (bugs, missing error handling, encoding problems)
- **Improvement Opportunities** for beginner-friendliness

---

## Market Overview Cards (7 cards)

### 1. market_breadth

**File:** `market_breadth.py`

**Purpose:** Shows overall market health through advancing/declining stocks, new highs/lows, and % of stocks above key moving averages.

**Who It's For:**
- Beginner: Health labels with plain language explanations
- Intermediate: Detailed breadth metrics with AD ratios
- Advanced: Full statistical data with volume metrics

**Key Metrics by Mode:**
- **Beginner:** % above MA50, advancing/declining counts, new highs/lows, health label (healthy/weak/mixed)
- **Intermediate:** % above MA50/MA200, net advances, AD ratio, HL spread, breadth health, interpretation
- **Advanced:** All breadth metrics, volume ratios, advancing/declining volume, calculated net advances

**When to Use:**
Check daily before trading to gauge overall market environment. Strong breadth supports long positions; weak breadth suggests defensive positioning.

**Educational Tips:**
- "Market breadth shows if gains/losses are broad or narrow"
- Explains healthy vs weak market conditions
- Includes "bias block" with risk-on/risk-off/neutral classification

**Data Sources:**
- `sb.market_breadth_daily` (preset_id = 'all_active')

**Code Issues Spotted:**
- None identified - clean implementation

**Improvement Opportunities:**
- Educational tip could explain what moving averages represent
- Could add visual suggestion (e.g., "imagine 70% of stocks trending up")

---

### 2. market_summary

**File:** `market_summary.py`

**Purpose:** Composite market health score (0-100) combining breadth (40%), regime (30%), volatility (20%), and SPY trend (10%).

**Who It's For:**
- Beginner: Single health score with simple guidance
- Intermediate: Component breakdownwith weightings
- Advanced: Full statistical decomposition

**Key Metrics by Mode:**
- **Beginner:** Composite score (0-100), health label with emoji, regime, % above MA50, SPY trend vs 200-day MA
- **Intermediate:** All components with weights, regime classification, guidance
- **Advanced:** Detailed contributions, thresholds, R-squared metrics

**When to Use:**
Daily market check for overall environment assessment. Helps decide if conditions favor trading or staying in cash.

**Educational Tips:**
- Simple guidance: "Favorable conditions for long positions" (score > 65) or "Weak market. Consider defensive positioning" (score < 40)

**Data Sources:**
- `sb.market_breadth_daily`
- `sb.symbol_indicators_daily` (SPY trend)
- `sb.equity_bars_daily` (SPY price)

**Code Issues Spotted:**
- **TODO comment:** "Replace with VIX when available" - volatility score is hardcoded to 60.0
- Volatility component not yet functional

**Improvement Opportunities:**
- Add VIX or calculated historical volatility
- Explain what each component represents in beginner mode

---

### 3. market_regime

**File:** `market_regime.py`

**Purpose:** Classifies market regime (TREND, MEAN_REVERT, NEUTRAL, VOLATILE, LOW_VOL) based on ADX, volatility, correlations.

**Who It's For:**
- Beginner: Emoji-labeled regime with plain language descriptions
- Intermediate: Regime with key metrics (ADX, vol, correlation)
- Advanced: Full raw data from regime detection

**Key Metrics by Mode:**
- **Beginner:** Regime label, description, "what to do" guidance, educational tip
- **Intermediate:** Regime code, ADX, volatility %, correlation, volume trend, interpretation, trading style suggestion
- **Advanced:** All features, raw data

**When to Use:**
Adjust trading style based on regime. Trend-following in TREND regimes; mean-reversion in MEAN_REVERT; caution in VOLATILE.

**Educational Tips:**
- Emojis for each regime (e.g., "Trending Market," "Choppy Market," "High Volatility")
- Actionable tips: "Look for breakouts" (TREND) vs "Buy dips, sell pops" (MEAN_REVERT)
- Explains strategy suggestions: "Breakout, momentum" vs "Support/resistance bounces"

**Data Sources:**
- `sb.market_regime_daily` (regime_code, features JSONB)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Explain ADX in beginner mode (e.g., "ADX > 25 means strong trend")
- Add transition warnings (e.g., "regime shifting from TREND to MEAN_REVERT")

---

### 4. index_heatmap

**File:** `index_heatmap.py`

**Purpose:** Compare performance of major indices (SPY, QQQ, DIA, IWM) to identify market leadership and rotation.

**Who It's For:**
- Beginner: Simple color-coded performance with leader/laggard
- Intermediate: Multi-timeframe returns with rotation analysis
- Advanced: Full data with volume metrics

**Key Metrics by Mode:**
- **Beginner:** Today's % change per index, performance category (strong gain/slight gain/flat/loss), leader/laggard identification, market mood
- **Intermediate:** 1d/5d/1m/YTD returns, RVOL, rotation analysis (growth/tech leadership, small-cap strength), correlation assessment
- **Advanced:** All returns, volumes, RVOL, bias block

**When to Use:**
Identify which market segment is strongest to focus trading attention. Tech leadership (QQQ > SPY) suggests growth/risk-on; small-cap leadership (IWM > SPY) suggests broad risk appetite.

**Educational Tips:**
- "Indices show which part of market is strongest"
- Explains rotation patterns and what they mean

**Data Sources:**
- `sb.symbol_derived_eod` (SPY, QQQ, DIA, IWM)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add sector context (e.g., "QQQ = tech-heavy")
- Explain why rotation matters to individual stock selection

---

### 5. sector_rotation

**File:** `sector_rotation.py`

**Purpose:** Track performance of 11 SPDR sector ETFs to identify sector leadership and rotation patterns.

**Who It's For:**
- Beginner: Top 3 leaders and laggards with sector emojis
- Intermediate: All sectors with multi-timeframe performance and technical indicators
- Advanced: Full sector data with dispersion and breadth statistics

**Key Metrics by Mode:**
- **Beginner:** Top 3 leading/lagging sectors, today's % change, emoji per sector, "what it means" explanation
- **Intermediate:** All sector returns (1d/5d/1m/YTD), RSI, distance from MA50, RVOL, rotation type classification, insights
- **Advanced:** All sectors, avg/std-dev/median statistics, sector breadth (% positive), rotation type

**When to Use:**
Identify strong sectors to focus stock selection. Avoid weak sectors. Rotation patterns (risk-on vs risk-off) inform market environment.

**Educational Tips:**
- "Strong sectors show where investors put money. Weak sectors show where they take it out."
- Explains rotation types: Risk-On (broad buying), Risk-Off (broad selling), Selective, Defensive Shift

**Data Sources:**
- `sb.symbol_derived_eod` (XLF, XLE, XLK, XLV, XLI, XLP, XLY, XLU, XLRE, XLB, XLC)

**Code Issues Spotted:**
- Emojis used extensively (may render incorrectly in some clients)

**Improvement Opportunities:**
- Add sector descriptions in beginner mode (e.g., "XLK = Technology sector")
- Explain why sector rotation matters (concentration vs diversification)

---

### 6. technical_breadth

**File:** `technical_breadth.py`

**Purpose:** Show technical breadth indicators: % above MAs, RSI distribution, new highs/lows, advance/decline metrics.

**Who It's For:**
- Beginner: Simple health score with emoji
- Intermediate: Detailed breakdowns of % above MA20/50/200, AD ratio, new highs/lows
- Advanced: Full data with thrust signals and divergence flags

**Key Metrics by Mode:**
- **Beginner:** Health score (0-100), health label with emoji, advancing/declining count, "what it means" interpretation
- **Intermediate:** % above MA20/50/200, AD data (advancing, declining, net, ratio), new highs/lows, interpretation
- **Advanced:** All raw data, derived metrics (health score, thrust signal, divergence flag)

**When to Use:**
Measure participation in market moves. Strong breadth confirms index strength; weak breadth warns of narrow leadership.

**Educational Tips:**
- "Most stocks in uptrends = good time to be invested"
- "Market mixed = be selective"
- "Most stocks struggling = consider defensive"

**Data Sources:**
- `sb.market_breadth_daily`

**Code Issues Spotted:**
- Queries `pct_above_ma20`, `pct_above_ma50`, `pct_above_ma200` but only uses `pct_above_ma50` for beginner health score
- Some columns may not exist in schema (e.g., `pct_above_ma20` is queried but market_breadth likely has `above_ma50_pct`, `above_ma200_pct`)

**Improvement Opportunities:**
- Explain moving average concepts in beginner mode
- Add visual analogy (e.g., "like checking if most runners are ahead of pace markers")

---

### 7. economic_calendar

**File:** `economic_calendar.py`

**Purpose:** Show upcoming macroeconomic events (Fed meetings, CPI, employment data) that impact markets.

**Who It's For:**
- Beginner: Plain-English event descriptions with timing
- Intermediate: Detailed event breakdowns with estimates and actuals
- Advanced: Full calendar data with surprise calculations

**Key Metrics by Mode:**
- **Beginner:** Event date/time, simplified event name, category (employment/inflation/policy/GDP), "why it matters" explanation
- **Intermediate:** Event details, consensus/actual/previous values, surprise %, market impact assessment
- **Advanced:** Full calendar data, surprise calculations, historical patterns

**When to Use:**
Check before trading to avoid event risk. Major events (NFP, CPI, Fed) can cause large intraday swings.

**Educational Tips:**
- Explains event categories and what each means
- Examples: "Jobs data shows economic health. Strong jobs = bullish" or "Inflation data affects Fed policy. High inflation = Fed may raise rates = bearish"
- Trading implications per event type

**Data Sources:**
- `sb.economic_calendar`

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add countdown timer to next major event
- Historical volatility context (e.g., "CPI typically causes 1-2% moves")

---

## Ticker Analysis Cards (18 cards)

### 8. ticker_performance

**File:** `ticker_performance.py`

**Purpose:** Single-stock snapshot with price change, volume, RSI, MACD, and moving average distances.

**Who It's For:**
- Beginner: Price direction with volume and momentum assessment
- Intermediate: Technical indicators with trend classification
- Advanced: All raw technical data

**Key Metrics by Mode:**
- **Beginner:** Price, % change, volume status (high/normal/low), momentum (overbought/oversold/neutral), action block (entry/invalidation/risk)
- **Intermediate:** All indicators (RSI, MACD, MACD signal, distances to MA20/50), trend classification, summary
- **Advanced:** All fields including Bollinger Band position, MACD histogram

**When to Use:**
First check for any stock before trading. Quick overview of price action, momentum, and trend.

**Educational Tips:**
- Explains RSI: "RSI > 70 = overbought, may pull back" or "RSI < 30 = oversold, potential bounce"
- Volume assessment: "High volume confirms moves. Low volume moves are less reliable."

**Data Sources:**
- `sb.symbol_derived_eod`

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add comparison to sector/index performance (e.g., "up 2% while SPY up 0.5%")
- Explain what action blocks mean (entry level, invalidation level)

---

### 9. ticker_trend

**File:** `ticker_trend.py`

**Purpose:** Trend strength analysis using moving averages, ADX, and momentum indicators.

**Who It's For:**
- Beginner: Simple trend direction with emoji (strong up/up/sideways/down/strong down)
- Intermediate: Trend with MA alignment, RSI, MACD crossovers
- Advanced: Full trend data with volatility metrics

**Key Metrics by Mode:**
- **Beginner:** Trend label, explanation, "what to do" advice, action block
- **Intermediate:** Trend strength, MA alignment, momentum (RSI, MACD, MACD histogram), signals list, action block
- **Advanced:** Price data (1d/5d/1m returns), all MA distances, oscillators (RSI, MACD), ATR, volume

**When to Use:**
Determine trend strength to decide if stock is in buy zone (uptrend) or avoid zone (downtrend).

**Educational Tips:**
- "Trend is your friend - uptrend = look for dips to buy"
- "Downtrend = be cautious or wait for stabilization"
- Actionable advice per trend type

**Data Sources:**
- `sb.symbol_derived_eod`

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add trend duration (e.g., "uptrend for 3 weeks")
- Explain moving average alignment concept visually

---

### 10. ticker_52w

**File:** `ticker_52w.py`

**Purpose:** 52-week high/low analysis with current price position in range.

**Who It's For:**
- Beginner: Position label with emoji (near high/upper half/middle/lower half/near low)
- Intermediate: Detailed range metrics with volume confirmation
- Advanced: Full range data with support/resistance levels

**Key Metrics by Mode:**
- **Beginner:** Current price, 52w range, position label, % from high, interpretation
- **Intermediate:** Range metrics (position %, from high %, from low %), volume data, signals
- **Advanced:** Full range data, distance metrics (dollars and %), breakout watch flag

**When to Use:**
Identify if stock is near extremes. Near highs often signals strength; near lows may signal weakness or value opportunity.

**Educational Tips:**
- "Stocks near 52w highs are often strong. Stocks near lows may be weak or value opportunities."

**Data Sources:**
- `sb.symbol_52w_levels`
- `sb.symbol_derived_eod`

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add historical success rates (e.g., "stocks breaking to new highs have X% chance of continuing")
- Explain what to do at each position (e.g., near low = wait for stabilization)

---

### 11. ticker_momentum

**File:** `ticker_momentum.py`

**Purpose:** Momentum pulse using RSI, MACD histogram, and Stochastic oscillator.

**Who It's For:**
- Beginner: Momentum classification (strong bullish/moderate bullish/neutral/weak/bearish) with action block
- Intermediate: All oscillators with signals and trading guidance
- Advanced: Full indicator data with divergence analysis potential

**Key Metrics by Mode:**
- **Beginner:** Momentum score (0-100), classification, simple summary, key signals list, action block
- **Intermediate:** RSI, MACD (value/signal/histogram), Stochastic (K/D), signals, trading guidance
- **Advanced:** All raw indicators, zone classifications, crossover detection, thresholds

**When to Use:**
Gauge momentum to decide if stock has buying pressure (bullish) or selling pressure (bearish).

**Educational Tips:**
- "Strong upward momentum = multiple indicators confirm buying pressure"
- "You can be wrong more than half the time and still make money IF you have good risk/reward ratios" (action block)

**Data Sources:**
- `sb.symbol_indicators_daily`

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add momentum trend (improving/declining)
- Explain what each oscillator measures in simple terms

---

### 12. ticker_volatility

**File:** `ticker_volatility.py`

**Purpose:** Volatility metrics using ATR and Bollinger Band width.

**Who It's For:**
- Beginner: Volatility classification (very high/high/normal/low/very low) with position sizing guidance
- Intermediate: Detailed ATR and BB metrics with stop guidance
- Advanced: Full volatility data with risk management calculations

**Key Metrics by Mode:**
- **Beginner:** Volatility level with emoji, simple explanation, ATR (dollars and %), position sizing tip
- **Intermediate:** ATR metrics, Bollinger Bands (upper/middle/lower, width, position), position sizing, stop guidance
- **Advanced:** All raw metrics, BB squeeze detection, position multiplier, recommended stops

**When to Use:**
Adjust position size and stops based on volatility. High volatility = smaller positions, wider stops.

**Educational Tips:**
- "High volatility = bigger daily swings. Higher risk but bigger profit potential. Use smaller positions."
- "Low volatility = calm market. May precede big move (breakout or breakdown)."

**Data Sources:**
- `sb.symbol_indicators_daily` (ATR, BB upper/middle/lower)
- `sb.equity_bars_daily` (price for ATR % calculation)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add historical volatility percentile (e.g., "current ATR is 80th percentile for this stock")
- Visual guide for BB squeeze (e.g., "bands compressing = breakout coming")

---

### 13. ticker_relative_strength

**File:** `ticker_relative_strength.py`

**Purpose:** Stock performance vs all others using RS percentiles (20/60/120 day).

**Who It's For:**
- Beginner: RS percentile with category (top 10%/top 25%/above avg/below avg/bottom 25%)
- Intermediate: Multi-period RS with trend (improving/declining/stable)
- Advanced: Full RS data with trend analysis

**Key Metrics by Mode:**
- **Beginner:** RS percentile (60-day), category with emoji, interpretation
- **Intermediate:** RS 20d/60d/120d, category, trend, sector
- **Advanced:** All percentiles, classification, trend analysis (short-term/long-term change), thresholds

**When to Use:**
Focus on stocks with high RS (top 25-50%) for momentum strategies. Avoid low RS stocks unless fundamentals support turnaround.

**Educational Tips:**
- "Relative Strength shows how stock performs vs all others. High RS often continues - trend is your friend."
- "Elite performers (top 10%) outperform 90%+ of market. Strong momentum often continues."

**Data Sources:**
- `sb.symbol_cross_sectional_eod` (RS percentiles)
- `sb.symbol_fundamentals_cache` (sector)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add sector RS rank (e.g., "top 5% in tech sector")
- Historical persistence rates (e.g., "top 10% RS stocks continue outperforming X% of time")

---

### 14. ticker_liquidity

**File:** `ticker_liquidity.py`

**Purpose:** Trading liquidity metrics using dollar volume percentile and RVOL.

**Who It's For:**
- Beginner: Liquidity classification (high/moderate/low) with trading advice
- Intermediate: Detailed liquidity metrics with risk assessment
- Advanced: Full liquidity data with slippage risk analysis

**Key Metrics by Mode:**
- **Beginner:** Liquidity label with emoji, dollar volume formatted, RVOL, description, trading advice
- **Intermediate:** Dollar volume rank, RVOL percentile, share volume, interpretation
- **Advanced:** All metrics, slippage risk assessment, execution quality rating

**When to Use:**
Check before trading to ensure sufficient liquidity. Low liquidity = use limit orders, smaller positions.

**Educational Tips:**
- "High liquidity = tight spreads, easy to trade"
- "Low liquidity = wide spreads, potential slippage. Use small positions and limit orders only."
- "Dollar volume (shares × price) matters more than just share volume."

**Data Sources:**
- `sb.symbol_cross_sectional_eod` (liquidity ranks)
- `sb.symbol_derived_eod` (volume, RVOL, close)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add typical bid-ask spread estimate
- Explain slippage with examples (e.g., "on $10k order, expect $X slippage")

---

### 15. ticker_breakout

**File:** `ticker_breakout.py`

**Purpose:** Detect 52-week breakouts with volume and RS confirmation.

**Who It's For:**
- Beginner: Breakout status with quality assessment (high quality/moderate/low volume)
- Intermediate: Breakout metrics with confirmation signals
- Advanced: Full breakout analysis with quality score

**Key Metrics by Mode:**
- **Beginner:** Breakout status with emoji, quality label, current price vs 52w high, volume vs average, interpretation, trading advice
- **Intermediate:** Breakout detected flag, quality, price metrics, confirmation (volume, RS), interpretation
- **Advanced:** All breakout data, quality score (0-100), confirmation signals, risk management

**When to Use:**
Identify breakout opportunities. High-quality breakouts (high volume + strong RS) often continue.

**Educational Tips:**
- "Breakouts with high volume (1.5x+ average) and strong RS often continue. Low-volume breakouts often fail."
- Quality scoring: volume component + RS component

**Data Sources:**
- `sb.symbol_derived_eod` (is_breakout_52w flag, RVOL, returns)
- `sb.symbol_52w_levels`
- `sb.symbol_cross_sectional_eod` (RS percentile)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add follow-through analysis (e.g., "needs 1-2 days confirmation")
- Historical success rates per quality level

---

### 16. ticker_reversal

**File:** `ticker_reversal.py`

**Purpose:** Detect overbought/oversold conditions for mean reversion opportunities.

**Who It's For:**
- Beginner: Status (overbought/oversold/neutral) with confidence level
- Intermediate: Multiple oscillators (RSI, Stochastic) with position metrics
- Advanced: Full reversal analysis with z-score and probability estimates

**Key Metrics by Mode:**
- **Beginner:** Status with emoji, confidence (high/moderate/low), description, RSI, position in range, advice
- **Intermediate:** Status, confidence, all oscillators, position metrics (close in range, distance to MA20), interpretation
- **Advanced:** All signals, statistical metrics (z-score), reversal probability estimate

**When to Use:**
Identify potential reversals when stocks are extended. Overbought = potential pullback; oversold = potential bounce.

**Educational Tips:**
- "Overbought doesn't mean sell immediately - it means be cautious of short-term pullbacks. In strong trends, stocks can stay overbought for weeks."
- Confidence levels based on multiple confirmations

**Data Sources:**
- `sb.symbol_derived_eod` (overbought/oversold flags, close position, distance to MA20, z-score)
- `sb.symbol_indicators_daily` (RSI, Stochastic K/D)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add historical reversal success rates per confidence level
- Explain difference between reversal and consolidation

---

### 17. volume_profile

**File:** `volume_profile.py`

**Purpose:** Volume analysis including RVOL, price-volume relationship, and patterns.

**Who It's For:**
- Beginner: Volume category (very high/high/normal/low) with signal
- Intermediate: Detailed volume analysis with patterns
- Advanced: Full volume data with z-score and percentile

**Key Metrics by Mode:**
- **Beginner:** Volume label with emoji, volume vs average, explanation, signal (confirmation/pressure)
- **Intermediate:** Volume metrics, price-volume relationship, trend confirmation, patterns list, signals
- **Advanced:** All volume data, z-score, percentile, price-volume correlation

**When to Use:**
Confirm price moves with volume. High-volume moves are more reliable than low-volume moves.

**Educational Tips:**
- "High volume confirms price moves. Low volume moves are less reliable."
- Price-volume relationships: "Accumulation on strength" vs "Distribution on weakness"

**Data Sources:**
- `sb.symbol_derived_eod`

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add volume climax detection (extremely high volume at peaks/troughs)
- Explain volume patterns visually (e.g., "volume spike = increased interest")

---

### 18-25. Additional Ticker Cards

**ticker_earnings** (file: `ticker_earnings.py`):
- **Purpose:** Shows upcoming earnings date, estimates, historical surprises, and move expectations
- **Data:** `sb.earnings_calendar`, `sb.earnings_history`
- **Beginner:** Days to earnings, expected move, history of beats/misses, pre-earnings guidance
- **Issues:** None identified
- **Improvements:** Add historical earnings reaction patterns

**ticker_dividends** (file: `ticker_dividends.py`):
- **Purpose:** Dividend information including yield, payment dates, and history
- **Data:** `sb.dividends_calendar`, `sb.symbol_fundamentals_cache`
- **Beginner:** Yield, ex-dividend date, payment date, dividend safety assessment
- **Issues:** None identified
- **Improvements:** Add yield comparison to sector/index

**ticker_news** (file: `ticker_news.py`):
- **Purpose:** Recent news headlines with sentiment analysis
- **Data:** `sb.news_feed` (or similar news table)
- **Beginner:** Top 3-5 headlines with timestamps and sentiment
- **Issues:** May not exist in schema yet
- **Improvements:** Sentiment scoring, news impact assessment

**ticker_short_interest** (file: `ticker_short_interest.py`):
- **Purpose:** Short interest data with squeeze potential scoring
- **Data:** `sb.short_interest`
- **Beginner:** Short % of float, days to cover, squeeze score (0-100), risk warnings
- **Issues:** None identified
- **Improvements:** Historical squeeze examples for context

**ticker_insider** (file: `ticker_insider.py`):
- **Purpose:** Insider buying/selling activity with cluster detection
- **Data:** `sb.insider_transactions`
- **Beginner:** Recent insider activity, cluster detection (multiple insiders buying), interpretation
- **Issues:** None identified
- **Improvements:** Distinguish between planned sales and opportunistic buys

**ticker_institutional** (file: `ticker_institutional.py`):
- **Purpose:** Institutional ownership data from 13F filings
- **Data:** `sb.institutional_ownership`
- **Beginner:** % institutional ownership, concentration metrics, increasing/decreasing positions
- **Issues:** None identified
- **Improvements:** Track "smart money" moves (Buffett, top hedge funds)

**ticker_analyst** (file: `ticker_analyst.py`):
- **Purpose:** Wall Street analyst ratings and price targets
- **Data:** `sb.analyst_consensus`, `sb.analyst_ratings`
- **Beginner:** Consensus rating (Strong Buy to Sell), price target, upside potential
- **Issues:** None identified
- **Improvements:** Track rating changes over time

**ticker_correlation** (file: `ticker_correlation.py`):
- **Purpose:** Price correlation with SPY, QQQ, sector ETF; beta calculation
- **Data:** `sb.symbol_correlations`
- **Beginner:** Correlation to market, correlation strength, beta explanation, practical use
- **Issues:** None identified
- **Improvements:** Add correlation charts, diversification benefit calculations

---

## Options Cards (5 cards)

### 26. unusual_options

**File:** `unusual_options.py`

**Purpose:** Unusual options activity including IV, skew, and expected moves.

**Who It's For:**
- Beginner: IV classification (high/moderate/low volatility) with simple explanation
- Intermediate: Detailed options metrics (IV30, skew, expected moves, GEX)
- Advanced: Full options data with features

**Key Metrics by Mode:**
- **Beginner:** Volatility label with emoji, explanation, expected move (1-day), "what it means," strategy hint
- **Intermediate:** IV metrics (IV30, level, interpretation), skew, expected moves (1d/1w), GEX, signals, strategy hint
- **Advanced:** All metrics, IV percentile, features, derived metrics

**When to Use:**
Check before trading options. High IV = expensive options (sell premium); low IV = cheap options (buy premium).

**Educational Tips:**
- "High IV = expensive options, big expected moves. Low IV = cheap options, small expected moves."
- Strategy hints based on IV regime and days to earnings

**Data Sources:**
- `sb.options_agg_eod`

**Code Issues Spotted:**
- Duplicate code blocks (lines 80-105) with normalized labels - appears to be defensive coding for emoji rendering
- Complex strategy hint logic with try/except for features extraction

**Improvement Opportunities:**
- Simplify duplicate emoji/label logic
- Add IV rank context (e.g., "current IV is 80th percentile for this stock")

---

### 27. options_flow

**File:** `options_flow.py`

**Purpose:** Options flow analysis with put/call ratio and volume breakdown.

**Who It's For:**
- Beginner: Flow sentiment (bullish/bearish/neutral) with simple explanation
- Intermediate: Detailed PCR metrics with conviction assessment
- Advanced: Full flow data with z-score and contrarian signals

**Key Metrics by Mode:**
- **Beginner:** Sentiment with emoji, explanation, interpretation, "what it means"
- **Intermediate:** PCR (value, sentiment, interpretation), volume breakdown (puts/calls/total), flow strength, conviction level, additional metrics, signals
- **Advanced:** All flow metrics, PCR z-score, sentiment analysis, conviction, contrarian signal check

**When to Use:**
Gauge options trader sentiment. Low PCR = bullish (more calls); high PCR = bearish (more puts) or hedging.

**Educational Tips:**
- "Low put/call ratio = bullish (more calls). High put/call ratio = bearish (more puts)."
- Contrarian signals at extremes (PCR > 2.0 or < 0.3)

**Data Sources:**
- `sb.options_agg_eod` (features field with PCR data)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add historical PCR context (e.g., "PCR at 1.5 is 90th percentile for this stock")
- Explain difference between hedging and directional betting

---

### 28. options_0dte

**File:** `options_0dte.py`

**Purpose:** 0DTE (zero days to expiration) flow tracking for intraday bias.

**Who It's For:**
- **Advanced only** (extremely risky)
- Beginner: Simplified 0DTE concept with strong warnings
- Intermediate: Flow metrics with intraday implications
- Advanced: Full 0DTE analysis with dealer hedging behavior

**Key Metrics by Mode:**
- **Beginner:** Flow sentiment with emoji, total 0DTE OI, flow imbalance, simple explanation, intraday bias, **warning**
- **Intermediate:** Flow metrics (total OI, imbalance, sentiment), interpretation, intraday implications, **risk warning**
- **Advanced:** All metrics, sentiment strength, call/put ratio, dealer hedging expected behavior, trading considerations (gamma risk, theta decay)

**When to Use:**
Intraday only - for advanced traders. Understand dealer hedging pressure (call buying = dealers buy stock, creating upward pressure).

**Educational Tips:**
- "0DTE = zero days to expiration. These options expire today. Used for intraday speculation with extreme leverage and extreme risk."
- **Strong warnings in all modes about extreme risk**

**Data Sources:**
- `sb.options_agg_eod` (odte_total_oi, odte_flow_imbalance)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add time-of-day context (0DTE effects strongest in first/last hour)
- Historical 0DTE success rates to reinforce risk warnings

---

### 29. options_gex

**File:** `options_gex.py`

**Purpose:** Dealer gamma exposure (GEX) and positioning analysis.

**Who It's For:**
- **Advanced only** (complex concept)
- Beginner: Simplified GEX concept (dealers providing/pulling liquidity)
- Intermediate: GEX metrics with volatility regime
- Advanced: Full GEX analysis with hedging behavior

**Key Metrics by Mode:**
- **Beginner:** Market maker position, volatility expectation, key level (zero-gamma), current price, simple explanation
- **Intermediate:** Dealer positioning, metrics (net delta, zero-gamma level, distance %), volatility regime, interpretation, trading implications
- **Advanced:** All metrics, positioning analysis, price levels, hedging behavior (above/below zero-gamma), volatility implications

**When to Use:**
Understanding dealer positioning helps predict volatility regime. Positive GEX = range-bound (dealers stabilize); negative GEX = volatile (dealers amplify).

**Educational Tips:**
- "Dealers (market makers) hedge options by buying/selling stock. Positive gamma = they stabilize price. Negative gamma = they amplify moves."
- Explains zero-gamma level as inflection point

**Data Sources:**
- `sb.options_agg_eod` (dealer_net_delta, zero_gamma_level, gex)
- `sb.symbol_derived_eod` (current price)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add GEX historical context (e.g., "current GEX is 80th percentile")
- Visual diagram of dealer hedging mechanics

---

### 30. options_iv_skew

**File:** `options_iv_skew.py`

**Purpose:** Implied volatility and skew metrics for options pricing assessment.

**Who It's For:**
- Beginner: IV classification (expensive/cheap/fair) with strategy suggestions
- Intermediate: Detailed IV metrics with skew analysis
- Advanced: Full IV data with expected moves and thresholds

**Key Metrics by Mode:**
- **Beginner:** IV percentile, IV label with emoji, expected moves (1d/1w), interpretation, trading advice
- **Intermediate:** IV metrics (IV30, rank, percentile, classification), skew (value, interpretation), expected moves, strategy suggestions
- **Advanced:** All raw metrics, classification, skew analysis (type, interpretation), expected moves (with probability), trading implications, thresholds

**When to Use:**
Assess if options are expensive or cheap relative to historical levels. High IV percentile = sell premium; low IV percentile = buy premium.

**Educational Tips:**
- "IV percentile compares current IV to past year. High = expensive options (sell premium). Low = cheap options (buy premium)."
- Strategy suggestions per IV class: Credit spreads (expensive), Debit spreads (cheap), Focus on directional (fair)

**Data Sources:**
- `sb.options_agg_eod` (iv30, iv_rank, iv_percentile, skew, expected_move_1d, expected_move_1w)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add IV crush explanation (pre/post earnings)
- Historical IV percentile charts for context

---

## Utility Cards (4 cards)

### 31. ticker_options_chain

**File:** `ticker_options_chain.py`

**Purpose:** Key options chain metrics at-a-glance (ATM options, next expiration, put/call ratio).

**Who It's For:**
- Beginner: Simple PCR interpretation with warnings about options risk
- Intermediate: ATM options breakdown with volume analysis
- Advanced: Full chain data with aggregate metrics

**Key Metrics by Mode:**
- **Beginner:** Current price, has_options flag, next expiration, days to expiration, ATM call/put prices, PCR, PCR interpretation, **beginner warning**
- **Intermediate:** ATM options (expiration, strike, bid/ask, IV) for next 5, volume analysis (PCR, interpretation), expiration summary (call/put volume and OI)
- **Advanced:** Underlying price, ATM chain (all strikes with moneyness, call/put details), aggregate metrics (PCR, sentiment), by-expiration breakdown

**When to Use:**
Quick options chain overview before trading options. PCR shows sentiment; ATM options show pricing.

**Educational Tips:**
- "Options give right to buy (call) or sell (put) stock at set price. ATM = at-the-money (strike near current price). Options expire worthless if not in-the-money."
- **"Options are complex and risky. Can lose 100% of premium. Paper trade first."**
- PCR interpretation: > 1.5 = very bearish, > 1.0 = bearish, 0.7-1.0 = neutral, < 0.7 = bullish

**Data Sources:**
- `sb.options_chain`
- `sb.equity_bars_daily` (current price)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add max pain calculation (strike with highest OI)
- Explain moneyness in simpler terms

---

### 32. position_sizer

**File:** `position_sizer.py`

**Purpose:** Calculate position sizes based on risk parameters (pure calculation utility, no database).

**Who It's For:**
- Beginner: Simple position sizing formula with examples
- Intermediate: Multiple methods (fixed risk, volatility-based, Kelly)
- Advanced: Advanced calculations (Kelly, Optimal f, correlation adjustment)

**Key Metrics by Mode:**
- **Beginner:** Formula, example calculation ($10k account, 1% risk), beginner rules, educational tip
- **Intermediate:** Methods (fixed risk, volatility-based, Kelly), position limits per skill level, risk examples
- **Advanced:** Advanced methods (fixed fractional, volatility-adjusted, Kelly, Optimal f), correlation adjustment, practical limits

**When to Use:**
Before every trade to calculate how many shares to buy based on risk tolerance and stop loss distance.

**Educational Tips:**
- "Position sizing is THE most important risk management tool. Even great traders lose when position sizing is wrong."
- **"Never risk more than 1-2% of account on single trade. Always use stop losses."**
- Kelly Criterion warning: "Use half-Kelly or quarter-Kelly to be safe"

**Data Sources:**
- None (pure calculation utility)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add calculator interface (accept account size, risk %, entry, stop as inputs)
- Real-time examples using current stock data

---

### 33. risk_calculator

**File:** `risk_calculator.py`

**Purpose:** Risk/reward ratio and trade analysis calculator (pure calculation utility, no database).

**Who It's For:**
- Beginner: Simple R:R ratio examples (good vs bad trades)
- Intermediate: R:R formulas, breakeven win rates, expected value
- Advanced: Advanced calculations (EV, Kelly, Sharpe, system evaluation)

**Key Metrics by Mode:**
- **Beginner:** Formula, example good trade (3:1 R:R), example bad trade (0.5:1 R:R), beginner rules, educational tip
- **Intermediate:** Formulas (R:R, breakeven win rate, EV), R:R breakeven table, win rate analysis, practical application
- **Advanced:** EV formula and example, Kelly fraction relationship, Sharpe ratio, system evaluation metrics, system comparison examples

**When to Use:**
Before entering trades to ensure favorable risk/reward. Minimum 2:1 R:R for most trades.

**Educational Tips:**
- "You can be wrong more than half the time and still make money IF you have good risk/reward ratios."
- R:R breakeven: 2:1 only needs 33% win rate, 3:1 only needs 25% win rate
- **"Never take trades worse than 1:1. Higher R:R allows lower win rate."**

**Data Sources:**
- None (pure calculation utility)

**Code Issues Spotted:**
- None identified

**Improvement Opportunities:**
- Add calculator interface
- Historical R:R examples from successful traders

---

### 34. watchlist_stats

**File:** `watchlist_stats.py`

**Purpose:** Aggregate statistics for user's watchlist (template only, not fully implemented).

**Who It's For:**
- Beginner: Summary stats (total symbols, gainers/losers, top movers)
- Intermediate: Performance metrics, sector distribution, risk/momentum analysis
- Advanced: Advanced analytics (correlation, beta, technical/fundamental summary)

**Key Metrics by Mode:**
- **Beginner:** Total symbols, avg change today %, gainers/losers/unchanged counts, top gainers/losers, note
- **Intermediate:** Summary metrics (1d/1w/1m performance, market cap), sector distribution, risk distribution (low/moderate/high vol), momentum analysis
- **Advanced:** Total symbols, market-cap/equal-weighted returns, correlation to SPY, portfolio beta, sector exposure, technical summary (% above MAs, RSI buckets, MACD), fundamental summary (avg PE, div yield, profitable companies)

**When to Use:**
Daily watchlist check to track opportunities across multiple stocks.

**Educational Tips:**
- "Watchlist helps you track potential trades and monitor market opportunities across multiple stocks."

**Data Sources:**
- **Not yet implemented** - requires user watchlist management system

**Code Issues Spotted:**
- **Implementation Note:** "This card requires user authentication and watchlist management system"
- Returns template/example structure only (all zeros)

**Improvement Opportunities:**
- Implement user watchlist system
- Add watchlist alerts (e.g., "AAPL broke above resistance")
- Sector/theme-based watchlist grouping

---

## Cross-Cutting Issues and Patterns

### Missing Validations
1. **Symbol validation:** Most handlers check `if not symbol` but don't validate format (e.g., uppercase, valid ticker)
2. **Date validation:** No checks for future dates or dates too far in past
3. **NULL handling:** Most handlers check for NULL values but some calculations may fail if database returns NULL unexpectedly
4. **Range validation:** Some calculations (e.g., percentiles, ratios) could produce invalid results if data is malformed

### Text Encoding Issues
- **Emojis:** Heavy use of emojis throughout (🚀, 📈, ⚠️, etc.) may not render correctly in all clients
- **Fallback labels:** Some handlers (e.g., `unusual_options.py`) have duplicate "normalized" label blocks to handle emoji failures
- **Solution needed:** Provide emoji-free "clean" labels as alternative in all modes

### SQL Query Issues
1. **Column naming inconsistencies:** Some handlers query columns that may not exist (e.g., `technical_breadth.py` queries `pct_above_ma20` but schema likely has `above_ma20_pct`)
2. **JSONB features field:** Many handlers extract data from JSONB `features` field - fragile if field structure changes
3. **LEFT JOIN safety:** Some handlers use LEFT JOINs but don't handle NULL results gracefully
4. **Date arithmetic:** Some handlers use Python date arithmetic (`trading_date + timedelta(days=1)`) instead of database date functions

### Educational Tip Clarity
1. **Consistency:** Educational tips vary in quality - some are excellent (position_sizer, risk_calculator), others are minimal
2. **Progressive disclosure:** Good use of beginner/intermediate/advanced tiers, but could be more consistent
3. **Actionable guidance:** Best handlers include "what to do" sections; others just present data
4. **Risk warnings:** Options and advanced cards appropriately warn about risk; could be stronger in some cases

### Query Performance Concerns
1. **Missing indexes:** Queries assume indexes on `symbol`, `trading_date`, `as_of` but don't document requirements
2. **LIMIT 1 usage:** Good practice throughout
3. **Cross-table joins:** Some handlers join multiple tables - need to verify join performance
4. **JSONB queries:** Extracting from JSONB `features` field may be slow if not indexed properly

---

## Recommendations for Beginner Trader Documentation

### Priority 1: Critical Issues
1. **Implement watchlist_stats handler** - currently template only
2. **Fix column naming inconsistencies** in `technical_breadth.py` and other handlers
3. **Add emoji-free fallback labels** for all emoji usages
4. **Validate missing schema fields** before deployment (e.g., `ticker_news.py` may not have supporting table)

### Priority 2: Enhanced Educational Content
1. **Add visual analogies** for complex concepts (e.g., "correlation like measuring how two runners move together")
2. **Include historical success rates** where applicable (e.g., breakout success rates by quality level)
3. **Provide concrete examples** with real stock symbols in documentation
4. **Create glossary** of all technical terms used across handlers

### Priority 3: User Experience Improvements
1. **Progressive disclosure enhancements:**
   - Beginner mode: More "what it means in plain English"
   - Intermediate mode: More "how to use this in trading"
   - Advanced mode: More "how this fits into system"

2. **Actionable guidance:**
   - Every card should have "what to do next" section
   - Risk warnings should be prominent for dangerous strategies
   - Position sizing and risk management integrated into all trade setups

3. **Interconnections:**
   - Link related cards (e.g., "also check ticker_trend for trend confirmation")
   - Create recommended card sequences (e.g., "start with market_breadth, then sector_rotation, then ticker_performance")

### Priority 4: Technical Debt
1. **Error handling:** Add try/except blocks around database queries with user-friendly error messages
2. **Input validation:** Validate all user inputs (symbols, dates, parameters)
3. **Schema documentation:** Document all database tables/columns used by each handler
4. **Performance optimization:** Add caching for frequently accessed data (e.g., index data)

---

## Conclusion

The sigmatiq-card-api handlers provide a comprehensive three-tier system for traders of all skill levels. The beginner-focused implementations are generally strong, with clear explanations, plain language, and actionable guidance. Key strengths include:

- **Consistent architecture:** All handlers follow similar patterns (beginner/intermediate/advanced)
- **Educational focus:** Most handlers include helpful tips and explanations
- **Risk warnings:** Appropriate warnings for dangerous strategies (options, 0DTE)
- **Practical guidance:** Many handlers include "what to do" sections

Areas for improvement include:

- **Emoji rendering issues** (provide fallbacks)
- **Schema validation** (verify all queried columns exist)
- **Educational consistency** (standardize tip quality across all handlers)
- **Interconnections** (link related cards, suggest sequences)

Overall, this is a **well-designed system** with strong beginner focus. With the recommended improvements, it will be an excellent educational platform for new traders.

---

**End of Analysis**
