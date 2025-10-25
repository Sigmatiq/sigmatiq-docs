# Complete Card Reference - All 34 Cards

## Quick Navigation

**[Market Overview (7)](#market-overview-cards)** | **[Ticker Analysis (18)](#ticker-analysis-cards)** | **[Options (5)](#options-cards)** | **[Utilities (4)](#utility-cards)**

---

## Market Overview Cards

### 1. Market Breadth 
**Card ID**: `market_breadth`
**Skill Level**: Beginner
**Check Daily**:  Yes (Morning)

**What It Shows**:
How many stocks are going up vs down across the entire market. Like checking if most runners in a race are moving forward or falling behind.

**Key Metrics**:
- **Advancing/Declining** - Count of stocks up vs down
- **New Highs/Lows** - Stocks hitting extremes
- **% Above MA50** - Percentage in uptrends
- **Health Label** - Healthy / Mixed / Weak

**Beginner Mode Shows**:
```
% Above MA50: 68%
Advancing: 2,847 stocks
Declining: 1,234 stocks
New Highs: 156
New Lows: 23
Health: Healthy 
```

**How to Use**:
- **Healthy (&gt;60% above MA50)**  Good environment for long positions
- **Mixed (40-60%)**  Be selective, size smaller
- **Weak (&lt;40%)**  Defensive positioning, consider cash

**When to Trade**:
- Advancing > 2 Declining = Green light for longs
- Declining > 2 Advancing = Red light, avoid longs
- New Highs > New Lows = Market strength
- New Lows > New Highs = Market weakness

**Educational Tip**:
"Market breadth shows if gains/losses are broad or narrow. Healthy markets have most stocks participating in rallies. Weak markets have only a few leaders while most stocks struggle."

**Common Mistake**: Buying stocks when breadth is weak (&lt;40%). Even good stocks struggle when the overall market is weak.

---

### 2. Market Summary 
**Card ID**: `market_summary`
**Skill Level**: Beginner
**Check Daily**:  Yes (Morning)

**What It Shows**:
Single health score (0-100) combining breadth, trend, regime, and volatility. Your one-number market check.

**Key Metrics**:
- **Composite Score** (0-100)
- **Health Label** - Strong / Favorable / Neutral / Weak / Poor
- **Regime** - TREND / MEAN_REVERT / NEUTRAL / VOLATILE
- **SPY Trend** - Above/below 200-day MA

**Beginner Mode Shows**:
```
Market Health Score: 72/100
Health: Favorable 
Regime: TREND (follow momentum)
% Above MA50: 68%
SPY: Above 200-day MA (bullish)
Guidance: "Favorable conditions for long positions. Look for momentum trades."
```

**Score Breakdown**:
- **Components**:
  - Breadth (40%) - % above MA50
  - Regime (30%) - TREND = bullish, MEAN_REVERT = neutral
  - Volatility (20%) - Currently placeholder
  - SPY Trend (10%) - Above MA200 = bullish

**How to Use**:
- **Score &gt;75**  Strong market, trade actively
- **Score 65-75**  Favorable, normal trading
- **Score 50-65**  Neutral, be selective
- **Score 40-50**  Weak, reduce size or sit out
- **Score &lt;40**  Poor, defensive mode

**Trading Implications**:
- Strong (&gt;75): Swing for home runs, use full position sizes
- Favorable (65-75): Normal trading, stick to your rules
- Neutral (50-65): Be picky, take only A+ setups
- Weak (40-50): Small positions, tight stops, or cash
- Poor (&lt;40): Stay in cash or short only if experienced

**Educational Tip**:
"Market Summary is your daily traffic light. Green = trade actively. Yellow = be cautious. Red = sit it out. Don't fight a poor market - your edge disappears when conditions are bad."

---

### 3. Market Regime 
**Card ID**: `market_regime`
**Skill Level**: Intermediate
**Check Daily**:  Yes (Morning)

**What It Shows**:
What type of market we're in so you can adjust your trading style accordingly.

**Regime Types**:
1. **TREND**  - Strong directional moves (ADX &gt;25, low volatility)
2. **MEAN_REVERT**  - Choppy, range-bound (ADX &lt;20, normal vol)
3. **NEUTRAL**  - No clear pattern (ADX 20-25)
4. **VOLATILE**  - High uncertainty (high ATR, low correlation)
5. **LOW_VOL**  - Calm before storm (very low ATR)

**Beginner Mode Shows**:
```
Regime: TREND 
Description: "Trending Market - prices showing strong directional movement"
What to Do: "Look for breakouts and momentum trades. Let winners run."
Strategy: Breakout, momentum, trend-following
Educational Tip: "In trending markets, follow the trend. Buy dips in uptrends, avoid trying to pick tops."
```

**How to Trade Each Regime**:

**TREND Regime**:
-  Buy breakouts to new highs
-  Buy pullbacks to moving averages
-  Let winners run (trail stops)
-  Avoid fading strong moves
-  Don't take quick profits

**MEAN_REVERT Regime**:
-  Buy oversold bounces
-  Sell overbought pops
-  Trade support/resistance
-  Don't chase breakouts
-  Don't hold too long

**NEUTRAL Regime**:
-  Sit out or trade very selectively
- Only trade highest-conviction setups
- Smaller position sizes

**VOLATILE Regime**:
-  Reduce position sizes significantly
- Wider stops to avoid whipsaw
- Consider cash or hedging
- Only for experienced traders

**LOW_VOL Regime**:
-  Breakout coming (unknown direction)
- Reduce positions before breakout
- Wait for regime clarity

**Educational Tip**:
"The market alternates between trending and choppy. What works in one regime fails in another. Trend followers get chopped up in mean-revert markets. Mean-reversion traders miss big moves in trending markets. Identify the regime first, then match your strategy."

---

### 4. Index Heatmap 
**Card ID**: `index_heatmap`
**Skill Level**: Beginner
**Check Daily**:  Yes (Morning)

**What It Shows**:
Which major index is strongest/weakest. Identifies market leadership and rotation.

**Indices Tracked**:
- **SPY** - S&P 500 (large-cap blend)
- **QQQ** - Nasdaq 100 (tech-heavy)
- **DIA** - Dow Jones (blue-chip industrial)
- **IWM** - Russell 2000 (small-caps)

**Beginner Mode Shows**:
```
Today's Performance:
QQQ: +1.2%  Strong Gain
SPY: +0.8%  Gain
DIA: +0.5%  Slight Gain
IWM: -0.3%  Loss

Leader: QQQ (Tech/Growth)
Laggard: IWM (Small-Caps)
Market Mood: Risk-On (growth leading)
```

**What It Means**:

**QQQ Leading (Tech Strength)**:
- Risk-on sentiment
- Growth over value
- Focus on tech, innovative companies
- Aggressive positioning

**DIA Leading (Blue-Chip Strength)**:
- Defensive sentiment
- Quality over speculation
- Focus on established companies
- Conservative positioning

**IWM Leading (Small-Cap Strength)**:
- Strong risk appetite
- Broad market participation
- Healthy market (small-caps usually lag)
- Bullish signal

**Rotation Patterns**:
- **Risk-On**: QQQ > SPY > DIA > IWM (growth leading)
- **Risk-Off**: DIA > SPY > QQQ > IWM (defensive leading)
- **Broadening**: IWM > SPY > QQQ (healthy)
- **Narrowing**: QQQ >> all others (unsustainable)

**How to Use**:
1. **QQQ leading**  Trade tech stocks, growth names
2. **DIA leading**  Trade blue-chips, defensive stocks
3. **IWM leading**  Trade small-caps, breadth is strong
4. **All down**  Defensive mode, consider cash

**Educational Tip**:
"Indices show which part of market is strongest. If tech (QQQ) is leading, focus your trades on tech stocks. If everything is weak, don't force trades - wait for leadership to emerge."

---

### 5. Sector Rotation 
**Card ID**: `sector_rotation`
**Skill Level**: Intermediate
**Check Daily**:  Yes (Morning)

**What It Shows**:
Performance of 11 SPDR sector ETFs. Identifies which sectors are hot (buy) and cold (avoid).

**Sectors Tracked** (with emojis):
- **XLK**  - Technology
- **XLF**  - Financials
- **XLE**  - Energy
- **XLV**  - Healthcare
- **XLI**  - Industrials
- **XLP**  - Consumer Staples
- **XLY**  - Consumer Discretionary
- **XLU**  - Utilities
- **XLRE**  - Real Estate
- **XLB**  - Materials
- **XLC**  - Communication Services

**Beginner Mode Shows**:
```
Top 3 Leaders:
1. XLK (Technology) +1.5% 
2. XLC (Communication) +1.2% 
3. XLY (Consumer Disc) +0.9% 

Top 3 Laggards:
1. XLE (Energy) -1.8% 
2. XLU (Utilities) -0.9% 
3. XLRE (Real Estate) -0.6% 

What It Means: "Growth and tech sectors leading (risk-on). Defensive sectors weak. Market in risk-taking mode."
```

**Rotation Types**:

**Risk-On Rotation** (Bullish):
- Leaders: XLK, XLY, XLC, XLF
- Laggards: XLU, XLP, XLRE
- Meaning: Investors buying growth/cyclical sectors
- Action: Trade growth stocks, tech, cyclicals

**Risk-Off Rotation** (Bearish):
- Leaders: XLU, XLP, XLV
- Laggards: XLK, XLY, XLE
- Meaning: Investors fleeing to safety
- Action: Defensive positioning, avoid speculation

**Defensive Shift** (Market Topping):
- Leaders: XLU, XLP (utilities, staples)
- All cyclicals weak
- Meaning: Smart money getting defensive
- Action: Reduce exposure, raise cash

**Selective Rotation** (Normal):
- 3-4 sectors strong, 3-4 weak, rest mixed
- Meaning: Normal market, pick stocks carefully
- Action: Focus on strong sectors

**How to Use**:
1. Identify top 3 sectors  Focus your trades here
2. Avoid bottom 3 sectors  Don't fight weak areas
3. Classify rotation type  Adjust overall positioning

**Example**:
```
Rotation: Risk-On
Leaders: XLK +1.5%, XLY +1.2%, XLF +1.1%
Action: Trade tech stocks (XLK) and consumer discretionary (XLY)
Avoid: Utilities (XLU -0.8%), Real Estate (XLRE -0.5%)
```

**Educational Tip**:
"Strong sectors show where investors are putting money. Weak sectors show where they're taking it out. Trade WITH the flow, not against it. If tech is hot, trade tech stocks. If tech is cold, avoid it regardless of how 'cheap' stocks look."

---

### 6. Technical Breadth 
**Card ID**: `technical_breadth`
**Skill Level**: Beginner
**Check Daily**:  Yes (Morning)

**What It Shows**:
Technical health using % above moving averages, RSI distribution, and advance/decline metrics.

**Key Metrics**:
- **% Above MA20/MA50/MA200** - Trend health
- **Advancing/Declining** - Daily participation
- **New Highs/Lows** - Momentum extremes
- **Health Score** (0-100)

**Beginner Mode Shows**:
```
Health Score: 68/100
Health: Healthy 
Advancing: 2,847 stocks
Declining: 1,234 stocks
What It Means: "Most stocks in uptrends. Good time to be invested. Market showing broad participation."
```

**How to Interpret**:

**% Above Moving Averages**:
- **Above MA50**:
  - &gt;70% = Very strong (most stocks in uptrend)
  - 50-70% = Healthy (normal bull market)
  - 30-50% = Weak (defensive mode)
  - &lt;30% = Very weak (bear market conditions)

- **Above MA200**:
  - &gt;60% = Bull market intact
  - 40-60% = Transitional (watch closely)
  - &lt;40% = Bear market likely

**Advance/Decline Metrics**:
- **AD Ratio**:
  - &gt;2.0 = Strong breadth thrust
  - 1.5-2.0 = Healthy participation
  - 1.0-1.5 = Moderate breadth
  - 0.5-1.0 = Weak breadth
  - &lt;0.5 = Very weak (distribution)

**New Highs/Lows**:
- New Highs > 100 and New Lows < 40 = Healthy
- New Highs > New Lows = Bullish leadership
- New Lows > New Highs = Bearish leadership
- New Lows > 100 = Extreme selling

**Health Score Calculation**:
```
Components:
- % Above MA50 (40%)
- AD Ratio (30%)
- New Highs vs Lows (20%)
- % Above MA200 (10%)
```

**Trading Rules**:
- **Health Score &gt;70**  Trade actively, normal sizing
- **Health Score 50-70**  Normal trading
- **Health Score 30-50**  Reduce size, be selective
- **Health Score &lt;30**  Defensive mode, mostly cash

**Educational Tip**:
"Technical breadth is like checking if most runners are ahead of pace markers. If 70% of stocks are above their 50-day average, the market is healthy. If only 30% are, the market is struggling - time to be defensive."

---

### 7. Economic Calendar 
**Card ID**: `economic_calendar`
**Skill Level**: Beginner
**Check Daily**:  Yes (Morning)

**What It Shows**:
Upcoming macroeconomic events that move markets (Fed meetings, jobs reports, inflation data).

**Event Categories**:
1. **Employment**  - Jobs reports, unemployment
2. **Inflation**  - CPI, PPI, PCE
3. **Policy**  - Fed meetings, rate decisions
4. **GDP**  - Economic growth
5. **Consumer**  - Retail sales, consumer confidence

**Beginner Mode Shows**:
```
Upcoming Events (Next 7 Days):

Tomorrow 8:30 AM ET:
 Initial Jobless Claims
Category: Employment
Why It Matters: "Shows if layoffs are increasing. Rising claims = economic weakness. Market usually moves 0.3-0.7% on surprise."

Jan 25 2:00 PM ET:
 FOMC Rate Decision
Category: Policy
Why It Matters: "Fed sets interest rates. Rate hikes = bearish for stocks. Rate cuts = bullish. Expect 1-3% market move."

Jan 26 8:30 AM ET:
 Core CPI (Inflation)
Category: Inflation
Why It Matters: "Measures price increases. High inflation = Fed may raise rates = bearish. Expect 0.5-1.5% move on surprise."
```

**Major Events & Impact**:

**Highest Impact (1-3% moves)**:
- **FOMC Rate Decision** - Fed sets interest rates
- **Non-Farm Payrolls (NFP)** - Monthly jobs report
- **CPI (Inflation)** - Consumer price index
- **FOMC Minutes** - Detailed Fed meeting notes

**High Impact (0.5-1.5% moves)**:
- **PPI** - Producer prices
- **Retail Sales** - Consumer spending
- **GDP** - Economic growth
- **Unemployment Rate** - Jobless percentage

**Moderate Impact (0.3-0.7% moves)**:
- **Jobless Claims** - Weekly unemployment filings
- **Consumer Confidence** - Sentiment surveys
- **PMI** - Manufacturing activity
- **Housing Data** - Home sales, starts

**How to Use**:

**1-3 Days Before Major Events**:
-  Avoid new positions
-  Take profits on winners
-  Tighten stops
-  Consider hedging

**Morning of Event**:
-  Don't trade first 30 minutes
-  Extreme volatility, wide spreads
- Wait for dust to settle

**After Event (30+ min)**:
-  Trade the reaction (if clear direction)
- Volume and volatility normalize
- Clearer price action

**Event Outcomes**:

**Jobs Reports (NFP, Unemployment)**:
- Strong jobs (surprise beat) = Usually bullish (healthy economy)
- Weak jobs (surprise miss) = Usually bearish (recession fears)
- BUT: Strong jobs + high inflation = Bearish (Fed will hike)

**Inflation Reports (CPI, PPI)**:
- High inflation (surprise beat) = Bearish (Fed will hike rates)
- Low inflation (surprise miss) = Bullish (Fed can ease)

**Fed Decisions (FOMC)**:
- Rate hike = Usually bearish (higher discount rates)
- Rate cut = Usually bullish (easier money)
- Pause = Depends on guidance

**GDP**:
- Strong GDP = Bullish (economic growth)
- Weak GDP = Bearish (recession risk)

**Educational Tip**:
"Economic events create volatility. As a beginner, AVOID trading around major events (Fed, NFP, CPI). Experienced traders get crushed by these moves. Better to wait 30+ minutes after release, then trade the clear direction. Patience saves money."

**Common Beginner Mistakes**:
1.  Trading into events hoping for profit  Usually results in losses from volatility
2.  Holding positions through events  Stops get blown out by whipsaw
3.  Trading immediately after release  Spreads are wide, fills are terrible
4.  Check calendar every morning  Avoid being surprised

---

## Market Cards: Quick Decision Matrix

### Morning Checklist (5 min)

**Step 1**: Check Market Summary
- Score &gt;65?  Proceed to Step 2
- Score 50-65?  Be selective (only A+ setups)
- Score &lt;50?  Consider sitting out

**Step 2**: Check Market Breadth
- Advancing > 2 Declining?  Green light for longs
- Declining > Advancing?  Red light (avoid longs)

**Step 3**: Check Sector Rotation
- Identify top 3 sectors  Focus trades here
- Note bottom 3 sectors  Avoid these

**Step 4**: Check Economic Calendar
- Major event today?  Avoid or wait until after
- Major event this week?  Plan around it

**Step 5**: Check Market Regime
- TREND?  Follow momentum, let winners run
- MEAN_REVERT?  Fade extremes, take quick profits
- VOLATILE?  Reduce size or sit out

### Decision Matrix

| Market Summary | Breadth | Action |
|---|---|---|
| &gt;75 | Strong | Trade actively, full size |
| 65-75 | Healthy | Normal trading |
| 50-65 | Mixed | Selective, reduce size 25% |
| 40-50 | Weak | Very selective, reduce size 50% |
| &lt;40 | Poor | Mostly cash, only shorts (if skilled) |

### Regime-Based Strategy

| Regime | Strategy | Avoid |
|---|---|---|
| TREND | Breakouts, momentum, trend-follow | Fading, quick profits |
| MEAN_REVERT | Bounces, fades, range-trading | Breakouts, bag-holding |
| NEUTRAL | High-conviction only | Over-trading |
| VOLATILE | Reduce size 50%, wider stops | Normal sizing |
| LOW_VOL | Wait for breakout | Large positions |

---

## Common Questions

**Q: Do I need to check all 7 market cards every day?**
A: No. Start with Market Summary + Market Breadth + Economic Calendar (3 cards, 2 minutes). Add others as you gain experience.

**Q: What if Market Summary says "Favorable" but my stock is weak?**
A: Market health doesn't guarantee individual stock performance. Always check ticker-specific cards too. But weak markets make even good stocks harder to trade.

**Q: Can I trade when Market Summary &lt;40?**
A: You CAN, but your edge is dramatically reduced. Most beginner traders should stay in cash when market is poor. Experienced traders can short or trade specific strong stocks with reduced size.

**Q: How accurate is Economic Calendar?**
A: Event timing is accurate. Impact estimates are general guidelines - actual moves depend on surprise magnitude and market conditions.

**Q: Which regime is best for beginners?**
A: TREND regime. Clear directional moves are easier to trade. MEAN_REVERT and VOLATILE regimes are harder - wait for TREND regime to return.

**Q: Do market cards work for day trading?**
A: Yes, but check them at market open. Market Regime and Index Heatmap are especially useful for day traders to know intraday bias.

---

## Next Steps

1. **Practice**: Check Market Summary and Market Breadth every morning for 2 weeks
2. **Journal**: Record the scores and your observations
3. **Pattern Recognition**: Notice how your trades perform in different market conditions
4. **Add Complexity**: After 2 weeks, add Sector Rotation to your routine
5. **Refine**: Build your personal morning routine with cards that help YOU most

---

**Remember**: Market cards are your trading traffic light. Green = trade actively. Yellow = be cautious. Red = sit it out. The market tells you when to trade aggressively and when to protect capital. Listen to it.

---

## Ticker Analysis Cards

### 8. Ticker Performance 
**Card ID**: `ticker_performance`
**Skill Level**: Beginner
**Required Parameter**: `symbol=AAPL`
**Check When**: Before every trade

**What It Shows**:
Quick snapshot of stock's current state - price, volume, momentum, and basic technical indicators.

**Beginner Mode Shows**:
```
Price: $185.23 (+0.8% today)
Volume: High (1.3 average)
Momentum: Neutral (RSI 58)
Trend: Above MA50 (short-term uptrend)
Action Block:
  Entry: Watch for pullback to $182
  Invalidation: $178 (below MA50)
  Risk: 3% stop distance
  Target: $194 (prior high)
```

**Key Metrics**:
- Price & % change
- Volume status (High/Normal/Low)
- RSI (momentum indicator)
- Position relative to MAs

**How to Use**:
1. **First card to check** for any stock idea
2. Confirms basic health before deeper analysis
3. Action block gives trade structure

**Red Flags**:
-  Low volume (moves aren't reliable)
-  Below all MAs (downtrend)
-  RSI &gt;80 or &lt;20 (extended)

**Educational Tip**:
"High volume confirms moves - low volume moves are less reliable. RSI &gt;70 = overbought (caution), RSI &lt;30 = oversold (potential bounce)."

---

### 9. Ticker Trend 
**Card ID**: `ticker_trend`
**Skill Level**: Beginner
**Required**: `symbol=AAPL`

**What It Shows**:
Trend strength and direction using moving average alignment.

**Trend Classifications**:
- **Strong Uptrend**  - All MAs aligned bullishly
- **Uptrend**  - Price > MA50
- **Sideways**  - Choppy, no clear trend
- **Downtrend**  - Price < MA50
- **Strong Downtrend**  - All MAs aligned bearishly

**Beginner Mode**:
```
Trend: Strong Uptrend 
Explanation: "Stock in clear uptrend with price above all moving averages"
What to Do: "Look for pullbacks to MA20 or MA50 as buying opportunities. Let winners run."
Educational Tip: "Trend is your friend - uptrends are best time to buy dips"
```

**MA Alignment (Perfect Bullish)**:
```
Price > MA20 > MA50 > MA200
```

**How to Trade**:
- **Strong Uptrend**: Buy dips to MA20/MA50, hold
- **Uptrend**: Buy dips, watch MA50
- **Sideways**: Avoid or trade range
- **Downtrend**: Avoid (beginners) or short (advanced)
- **Strong Downtrend**: Stay away

**Educational Tip**:
"Never buy downtrends hoping for reversal ('catching falling knives'). Wait for trend to turn upward first. Missing the bottom is fine - missing the whole uptrend is not."

---

### 10. 52-Week Range 
**Card ID**: `ticker_52w`
**Skill Level**: Beginner
**Required**: `symbol=AAPL`

**What It Shows**:
Where price sits in 52-week range (high to low).

**Position Labels**:
- **Near High** (&gt;90%) - Testing resistance
- **Upper Half** (70-90%) - Strong position
- **Middle** (30-70%) - Neutral
- **Lower Half** (10-30%) - Weak position
- **Near Low** (&lt;10%) - At support

**Beginner Mode**:
```
Current: $185.23
52w High: $195.00 (5% away)
52w Low: $125.00
Position: 85% of range (Upper Half)
Interpretation: "Stock showing strength, near highs. Often signals institutional accumulation."
```

**How to Use**:

**Near 52w High (&gt;90%)**:
-  Breakout potential (if volume high)
-  Resistance area (may pullback)
- Watch for new high breakout

**Upper Half (70-90%)**:
-  Position of strength
-  Institutions likely accumulating
- Good area for swing trades

**Middle (30-70%)**:
-  Neutral - no edge from range position
- Need other confirmation

**Lower Half (10-30%)**:
-  Weak or "value" opportunity
- Wait for stabilization before buying
- Could be value trap

**Near 52w Low (&lt;10%)**:
-  Very weak (avoid for beginners)
- May be falling knife
- OR deep value (needs fundamental analysis)

**Educational Tip**:
"Stocks near 52w highs are often strong for a reason. Don't fear new highs - they often lead to higher highs. Stocks near 52w lows are often weak for a reason - wait for trend reversal confirmation before buying."

---

### 11. Ticker Momentum 
**Card ID**: `ticker_momentum`
**Skill Level**: Intermediate
**Required**: `symbol=AAPL`

**What It Shows**:
Buying/selling pressure using RSI, MACD, and Stochastic oscillators.

**Momentum Classifications**:
- **Strong Bullish** - Multiple indicators confirm buying
- **Moderate Bullish** - Leaning bullish
- **Neutral** - Mixed signals
- **Weak/Bearish** - Selling pressure

**Beginner Mode**:
```
Momentum Score: 68/100
Classification: Moderate Bullish
Summary: "Stock showing buying pressure across multiple indicators"
Key Signals:
   RSI trending up (58  62 over 5 days)
   MACD above signal line (bullish)
   Stochastic in mid-range (neutral)
Educational Tip: "Strong upward momentum = multiple indicators confirm buying pressure. You can be wrong more than half the time and still make money IF you have good risk/reward ratios."
```

**Indicators Explained**:

**RSI (Relative Strength Index)**:
- 70-100: Overbought (caution)
- 40-60: Neutral
- 0-30: Oversold (potential bounce)

**MACD (Trend + Momentum)**:
- MACD > Signal: Bullish
- MACD < Signal: Bearish
- Histogram expanding: Momentum strengthening

**Stochastic (Overbought/Oversold)**:
- &gt;80: Overbought
- 20-80: Neutral range
- &lt;20: Oversold

**How to Use**:
- All 3 bullish = High-confidence long
- 2 of 3 bullish = Moderate-confidence long
- All 3 bearish = Avoid or short
- Mixed = Wait for clarity

---

### 12. Ticker Volatility 
**Card ID**: `ticker_volatility`
**Skill Level**: Beginner
**Required**: `symbol=AAPL`

**What It Shows**:
How much stock moves daily (volatility) using ATR and Bollinger Bands.

**Volatility Levels**:
- **Very High** (&gt;5% ATR) - Extreme swings
- **High** (3-5% ATR) - Large daily moves
- **Normal** (1.5-3% ATR) - Average stock
- **Low** (0.5-1.5% ATR) - Calm, boring
- **Very Low** (&lt;0.5% ATR) - Compression (breakout coming)

**Beginner Mode**:
```
Volatility: Normal
ATR: $4.23 (2.3% of price)
Explanation: "Stock moves about $4 per day on average"
Position Sizing: "With $25k account and 1% risk ($250), entry $185, stop $181 (1 ATR below):
  Shares = $250  $4 = 62 shares"
Educational Tip: "High volatility = bigger swings = higher risk = use smaller positions"
```

**How to Adjust for Volatility**:

**High Volatility Stocks**:
-  Use SMALLER position sizes
-  Use WIDER stops (1.5-2 ATR)
-  Higher profit potential BUT higher risk

**Normal Volatility**:
-  Normal position sizing
-  Normal stops (1 ATR)

**Low Volatility**:
-  Breakout likely coming soon
- Wait for direction to clarify
- Then trade the breakout

**Position Sizing Formula**:
```
Account Risk  ATR = Shares
Example:
$25,000  1% = $250 risk
ATR = $4
Shares = $250  $4 = 62 shares
```

**Educational Tip**:
"Volatility is neither good nor bad - it's information. High volatility = adjust position size down. Low volatility = potential breakout coming. Always account for volatility in your stops and sizing."

---

### 13. Relative Strength 
**Card ID**: `ticker_relative_strength`
**Skill Level**: Beginner/Intermediate/Advanced
**Required**: `symbol=AAPL`
**Check When**: Evaluating momentum stocks or comparing performance vs market

**What It Shows**:
Compares stock performance vs all other stocks in the market. Shows where your stock ranks in price performance over different timeframes.

**Key Metrics**:
- RS Percentile (20/60/120 day): Ranking vs all stocks (0-100)
- RS Category: top_10, top_25, above_avg, below_avg, bottom_25
- RS Trend: improving, declining, or stable
- Sector classification

**Beginner Mode Shows**:
```
RS Percentile: 85
RS Label:  Top 15% performer
Category: Strong Performer (Top 25%)
Sector: Technology
Interpretation: "Strong momentum - outperforming most stocks. Good candidate for trend-following strategies."
```

**How to Use**:
1. **Check RS percentile**: Above 70 = strong momentum, below 30 = weak
2. **Look for improving trend**: RS moving from 60  80 = accelerating strength
3. **Combine with breakouts**: High RS + 52-week breakout = powerful setup
4. **Avoid weak RS longs**: Below 25th percentile rarely works for momentum trades
5. **Use for position sizing**: Higher RS = can use larger size with trailing stops

**Educational Tip**:
"Relative Strength shows how a stock performs vs all others. High RS often continues - the trend is your friend."

**Action Guidance**:
- **RS > 80**: Enter on pullbacks, use trailing stops
- **RS < 25**: Avoid longs unless strong fundamental catalyst
- **Improving trend**: Best time to add positions

---

### 14. Liquidity Analysis 
**Card ID**: `ticker_liquidity`
**Skill Level**: Beginner
**Required**: `symbol=AAPL`
**Check When**: Before entering any position

**What It Shows**:
Measures how easily you can buy/sell the stock without affecting price. Critical for execution quality.

**Key Metrics**:
- Dollar Volume Rank: Percentile (0-100)
- RVOL Percentile: Today's volume vs average
- Liquidity Classification: high, moderate, low
- Daily dollar volume

**Beginner Mode Shows**:
```
Liquidity:  High Liquidity
Dollar Volume: $15.2B daily
RVOL: 1.2x average
Advice: "Easy to trade with tight spreads. Safe for all position sizes."
```

**How to Use**:
1. **High liquidity (&gt;80th percentile)**: Can use market orders, normal sizing
2. **Moderate (40-80th)**: Use limit orders, watch spreads
3. **Low (&lt;40th)**: Small positions only, always use limits

**Educational Tip**:
"High liquidity = tight spreads, easy execution. Low liquidity = wide spreads, potential slippage. Use small positions and limit orders only."

**Position Sizing**:
- **High**: Normal sizing (3-5% portfolio)
- **Moderate**: Reduce to 2-3%, use limits
- **Low**: 1-2% max, expect wider spreads

---

### 15. Breakout Watch 
**Card ID**: `ticker_breakout`
**Skill Level**: Intermediate
**Required**: `symbol=AAPL`

**What It Shows**:
Detects 52-week breakouts with volume and RS confirmation. Identifies high-quality vs low-quality setups.

**Key Metrics**:
- Breakout Status: is_breakout_52w
- Breakout Quality: high_quality/moderate/low_volume
- RVOL confirmation
- RS percentile

**Beginner Mode Shows**:
```
Status:  52-Week Breakout!
Quality: High Quality Breakout
Volume: +85% vs average
Advice: "High-quality breakout with strong volume. Often continues higher."
```

**How to Use**:
1. **Wait for volume**: RVOL > 1.5x for high-quality
2. **Check RS**: Above 70 confirms strength
3. **Entry options**: Buy breakout or first pullback
4. **Set stops**: Below 52-week high level

**Educational Tip**:
"Breakouts with high volume (1.5x+) and strong RS often continue. Low-volume breakouts often fail."

**Quality Assessment**:
- **High**: RVOL > 1.5 AND RS > 70  80% confidence
- **Moderate**: RVOL > 1.0  60% confidence
- **Low**: RVOL < 1.0  Skip

---

### 16. Reversal Watch 
**Card ID**: `ticker_reversal`
**Skill Level**: Intermediate
**Required**: `symbol=AAPL`

**What It Shows**:
Identifies overbought/oversold conditions for mean-reversion opportunities.

**Key Metrics**:
- Status: overbought/oversold/neutral
- Confidence: high/moderate/low
- RSI, Stochastic K/D
- Distance to 20-day MA

**Beginner Mode Shows**:
```
Status:  Oversold (May Bounce)
Confidence: High
RSI: 25
Advice: "Potential buying opportunity if fundamentals solid. Wait for stabilization."
```

**How to Use**:
1. **Oversold + High confidence**: Mean-reversion entry after stabilization
2. **Overbought + High confidence**: Reduce longs, tighten stops
3. **Use with trend**: Oversold in uptrend = buy

**Educational Tip**:
"Overbought doesn't mean sell immediately. In strong trends, stocks can stay overbought for weeks."

---

### 17. Volume Profile 
**Card ID**: `volume_profile`
**Skill Level**: Beginner
**Required**: `symbol=AAPL`

**What It Shows**:
Volume analysis including RVOL and price-volume relationships.

**Key Metrics**:
- RVOL: Today's volume vs 20-day average
- Volume category: Extreme/Very High/High/Normal/Low
- Price-volume relationship

**Beginner Mode Shows**:
```
Volume:  High Volume
RVOL: 1.8x average
Signal:  Bullish confirmation - price rising on high volume
```

**How to Use**:
1. **Price up + High volume**: Strong bullish confirmation
2. **Price down + High volume**: Strong bearish pressure
3. **Price move + Low volume**: Weak, may reverse

**Educational Tip**:
"High volume confirms price moves. Low volume moves are less reliable."

---

### 18. Earnings Calendar 
**Card ID**: `ticker_earnings`
**Skill Level**: Beginner
**Required**: `symbol=AAPL`

**What It Shows**:
Upcoming earnings dates, historical surprises, price reactions.

**Key Metrics**:
- Next earnings date & time
- Days until earnings
- Historical surprise %
- Beat rate

**Beginner Mode Shows**:
```
Next Earnings: 2025-11-02 (14 days away)
Time: After Market Close
Recent Performance: Usually beats
Advice: "Earnings in 2 weeks. Consider reducing size before earnings."
```

**How to Use**:
1. **0-3 days**: Avoid new positions, reduce size
2. **4-14 days**: Lighter sizing, tighter stops
3. **15+ days**: Normal trading

**Educational Tip**:
"Stock often moves sharply on earnings day. Wait until after the report if you're unsure."

---

### 19. Dividends Calendar 
**Card ID**: `ticker_dividends`
**Skill Level**: Beginner
**Required**: `symbol=KO`

**What It Shows**:
Dividend payment schedule, yield, consistency.

**Key Metrics**:
- Dividend yield %
- Annual dividend amount
- Next ex-dividend & payment dates
- Payment consistency

**Beginner Mode Shows**:
```
Yield: 3.20%
Annual Dividend: $1.84
Next Ex-Date: 2025-11-15 (23 days)
Payment Date: 2025-12-01
Consistency: Highly Consistent
```

**Educational Tip**:
"Must own stock BEFORE ex-dividend date to receive payment. Stock often drops by dividend amount on ex-date."

---

### 20. News Sentiment 
**Card ID**: `ticker_news`
**Skill Level**: Beginner
**Required**: `symbol=AAPL`

**What It Shows**:
Aggregated news sentiment from past 7 days.

**Key Metrics**:
- Overall sentiment score
- Sentiment classification
- Article count
- Recent headlines

**Beginner Mode Shows**:
```
Sentiment:  Positive
Score: 25
Articles: 15 (9 positive, 4 neutral, 2 negative)
What It Means: "News is mostly positive. Good momentum."
```

**Educational Tip**:
"Positive news doesn't guarantee price increase, but extreme negative news often predicts volatility."

---

### 21. Short Interest 
**Card ID**: `ticker_short_interest`
**Skill Level**: Intermediate
**Required**: `symbol=GME`

**What It Shows**:
Short selling activity and squeeze potential.

**Key Metrics**:
- Short % of float
- Days to cover
- Squeeze potential score (0-100)
- Trend

**Beginner Mode Shows**:
```
Short Interest: 25.5% (VERY HIGH)
Days to Cover: 7.2
Squeeze Potential: High
Trend: Sharply Increasing
Warning: "High short interest = high risk both directions"
```

**Educational Tip**:
"High short interest can lead to squeezes. But also signals fundamental problems. Don't buy just for squeeze potential."

---

### 22. Insider Transactions 
**Card ID**: `ticker_insider`
**Skill Level**: Beginner
**Required**: `symbol=AAPL`

**What It Shows**:
Executive buying/selling activity, sentiment scoring.

**Key Metrics**:
- Buy vs Sell count
- Net activity
- Buy clusters
- Sentiment classification

**Beginner Mode Shows**:
```
Sentiment:  Bullish
Activity: 5 buys vs 2 sales
Net Value: $2.5M buying
Recent: CEO bought $1.5M
What It Means: "Net insider buying = positive signal"
```

**Educational Tip**:
"Insiders buy for ONE reason (think it will rise) but sell for MANY (diversification, taxes). Pay more attention to buying."

---

### 23. Institutional Ownership 
**Card ID**: `ticker_institutional`
**Skill Level**: Beginner
**Required**: `symbol=AAPL`

**What It Shows**:
"Smart money" holdings and recent changes.

**Key Metrics**:
- Total institutional %
- Top holders
- Recent trend
- Ownership concentration

**Beginner Mode Shows**:
```
Institutional Ownership: 62.5%
Level: High
Top Holders: Vanguard (8.2%), BlackRock (6.5%)
Trend: Increasing
What It Means: "Professional confidence - institutions accumulating"
```

**Educational Tip**:
"High institutional ownership shows professional confidence. Increasing positions = bullish."

---

### 24. Analyst Ratings 
**Card ID**: `ticker_analyst`
**Skill Level**: Beginner
**Required**: `symbol=AAPL`

**What It Shows**:
Wall Street consensus and price targets.

**Key Metrics**:
- Consensus rating
- Average price target
- Upside potential
- Rating distribution

**Beginner Mode Shows**:
```
Consensus:  Buy
Price Target: $200
Current: $185.50
Upside: +7.8%
Analysts: 35 covering
What It Means: "Analysts bullish with moderate upside"
```

**Educational Tip**:
"Analyst ratings are opinions, not facts. Use as one input. Pay attention to rating CHANGES more than absolute ratings."

---

### 25. Correlation Analysis 
**Card ID**: `ticker_correlation`
**Skill Level**: Intermediate
**Required**: `symbol=AAPL`

**What It Shows**:
How stock moves with market indices, beta calculation.

**Key Metrics**:
- Correlation to SPY/QQQ
- Beta
- Correlation strength
- R-squared

**Beginner Mode Shows**:
```
Correlation to Market: 0.75 (Strong)
Beta: 1.2
Meaning: "Stock moves 1.2% when market moves 1%"
Practical Use: "High correlation - stock follows market trends"
```

**Educational Tip**:
"High correlation = stock follows market. Low correlation = good diversifier. Beta shows volatility vs market."

---

## Options Cards

 **WARNING**: Options are extremely risky. You can lose 100% of premium paid. Paper trade for months before using real money. Not suitable for beginners.

### 26. Unusual Options 
**Card ID**: `unusual_options`
**Skill Level**: Advanced
**Required**: `symbol=AAPL`

**What It Shows**:
Options volatility (IV), expected moves, and activity.

**Key Metrics**:
- **IV30** - 30-day implied volatility
- **Expected Move** - How much stock could move
- **IV Percentile** - Is IV high or low historically?

**Beginner Mode**:
```
Volatility: Moderate (IV30: 32%)
Expected Move:
  1-day: $3.80 (2.1%)
  1-week: $8.50 (4.6%)
What It Means: "Options priced for normal-sized moves. Not expensive, not cheap."
Strategy Hint: "Wait for lower IV to buy options, or trade directionally with stock"
 WARNING: Options are risky - can lose 100% of premium. Paper trade first.
```

**IV Percentile Guide**:
- **&gt;80%** = Very Expensive (sell premium strategies)
- **60-80%** = Expensive (sell credit spreads)
- **40-60%** = Fair (directional trades)
- **20-40%** = Cheap (buy debit spreads)
- **&lt;20%** = Very Cheap (buy options)

**Educational Tip**:
"High IV = expensive options (good for selling, bad for buying). Low IV = cheap options (good for buying, bad for selling). Never buy options right before earnings (IV is highest = most expensive)."

---

### 27. Options Flow 
**Card ID**: `options_flow`
**Skill Level**: Advanced

**What It Shows**:
Put/Call ratio and options trader sentiment.

**Put/Call Ratio (PCR)**:
- **&gt;1.5** = Very Bearish (heavy put buying)
- **1.0-1.5** = Bearish (more puts)
- **0.7-1.0** = Neutral
- **&lt;0.7** = Bullish (call buying)
- **&lt;0.3** = Extremely Bullish (can be contrarian signal)

**Contrarian Signals**:
- PCR &gt;2.0 = Extreme fear (potential bottom)
- PCR &lt;0.3 = Extreme greed (potential top)

---

### 28. 0DTE Flow 
**Card ID**: `options_0dte`
**Skill Level**: Expert Only

**What It Shows**:
Same-day expiration options activity.

** EXTREME RISK WARNING**:
- 0DTE options expire TODAY
- Can lose 100% in hours
- Extreme leverage
- ONLY for experienced options traders
- Paper trade for 6+ months minimum

**Why It Exists**:
Shows dealer hedging pressure for intraday bias. Not for trading directly.

---

### 29. GEX (Gamma Exposure) 
**Card ID**: `options_gex`
**Skill Level**: Advanced

**What It Shows**:
Market maker positioning and expected volatility.

**Key Concept**:
- **Positive GEX** = Dealers stabilize price (range-bound)
- **Negative GEX** = Dealers amplify moves (volatile)
- **Zero-Gamma Level** = Inflection point

**For Beginners**: Skip this until you understand options Greeks.

---

### 30. IV Skew 
**Card ID**: `options_iv_skew`
**Skill Level**: Intermediate/Advanced

**What It Shows**:
Are options expensive or cheap historically?

**Key Metric**: **IV Percentile**
- High (&gt;70%) = Expensive  Sell premium
- Low (&lt;30%) = Cheap  Buy premium
- Mid (30-70%) = Fair  Directional trades

**Strategy by IV Level**:
- **High IV**: Sell credit spreads, iron condors
- **Fair IV**: Directional trades (calls/puts)
- **Low IV**: Buy debit spreads, straddles

---

### 31. Options Chain Summary 
**Card ID**: `ticker_options_chain`
**Skill Level**: Intermediate

**What It Shows**:
Quick options chain overview - ATM strikes, PCR, pricing.

**Beginner Mode**:
```
Current Price: $185.23
Next Expiration: Feb 16 (24 days)
ATM Call ($185): Bid $4.20 / Ask $4.40 (IV 34%)
ATM Put ($185): Bid $3.80 / Ask $4.00 (IV 33%)
Put/Call Ratio: 0.85 (Slightly Bearish)
 Options are complex and risky. Can lose 100% of premium. Paper trade first.
```

**How to Use**:
- Quick pricing check before trading options
- PCR shows sentiment
- Compare IV to IV Skew card

---

## Utility Cards

### 32. Position Sizer 
**Card ID**: `position_sizer`
**Skill Level**: Beginner (ESSENTIAL)

**What It Shows**:
How to calculate position size based on risk.

**The Formula**:
```
Shares = (Account Size  Risk %)  Stop Distance

Example:
Account: $25,000
Risk: 1% = $250
Entry: $50
Stop: $48
Distance: $2

Shares = $250  $2 = 125 shares
Position Cost = 125  $50 = $6,250 (25% of account)
Max Loss = exactly $250 (1%)
```

**Beginner Rules**:
1. **Never risk &gt;1-2% per trade**
2. **Always use stop losses**
3. **Position size BEFORE entering trade**

**Why This Matters**:
```
Trader A: Risks 10% per trade
- 3 losses in row = -30% (devastating)

Trader B: Risks 1% per trade
- 10 losses in row = -10% (survivable)

Position sizing is THE MOST IMPORTANT risk tool.
```

**Educational Tip**:
"Position sizing is more important than entry timing. Wrong position size turns winning strategies into losses. Even great traders lose when position sizing is wrong."

---

### 33. Risk Calculator 
**Card ID**: `risk_calculator`
**Skill Level**: Beginner (ESSENTIAL)

**What It Shows**:
Risk/Reward ratio and whether trade is worth taking.

**Risk/Reward Formula**:
```
R:R = Potential Profit  Potential Loss

Example Good Trade:
Entry: $50
Target: $56 (profit $6)
Stop: $48 (loss $2)
R:R = $6  $2 = 3:1  Excellent

Example Bad Trade:
Entry: $50
Target: $52 (profit $2)
Stop: $47 (loss $3)
R:R = $2  $3 = 0.67:1  Terrible
```

**Minimum Standards**:
- **3:1 or better** = Excellent, take it
- **2:1** = Good minimum for most trades
- **1:1** = Only if win rate &gt;60%
- **&lt;1:1** = Never take these trades

**Breakeven Win Rates**:
| R:R | Breakeven Win Rate |
|---|---|
| 1:1 | 50% (must win half) |
| 2:1 | 33% (can lose 2 of 3) |
| 3:1 | 25% (can lose 3 of 4) |
| 5:1 | 16.7% (can lose 5 of 6) |

**Why R:R Matters**:
```
Trader A: 70% win rate, 1:1 R:R
10 trades: 7 wins  $100 = $700
          3 losses  $100 = -$300
          Net: +$400

Trader B: 40% win rate, 3:1 R:R
10 trades: 4 wins  $300 = $1,200
          6 losses  $100 = -$600
          Net: +$600

Lower win rate trader makes MORE money due to better R:R!
```

**Educational Tip**:
"You can be wrong more than half the time and still make money IF you have good risk/reward ratios. Focus on R:R, not win rate. Never take trades worse than 2:1."

---

### 34. Watchlist Stats 
**Card ID**: `watchlist_stats`
**Skill Level**: Intermediate
**Status**: Coming Soon (requires user system)

**What It Will Show**:
- Aggregate stats across your watchlist
- Sector distribution
- How many symbols in uptrend/downtrend
- Top movers
- RSI distribution

**Use Case**:
Daily watchlist overview to find best opportunities.

---

## Complete Trading Workflow Using Cards

### Daily Routine (10 min)

**Morning Check (5 min)**:
```
1. Market Summary  Score &gt;65?
2. Market Breadth  Healthy?
3. Sector Rotation  Which sectors strong?
4. Economic Calendar  Events today?
5. Market Regime  Trending or choppy?
```

**Per-Stock Analysis (5 min)**:
```
6. Ticker Performance  Basic health
7. Ticker Trend  Direction clear?
8. 52-Week Range  Position?
9. Ticker Liquidity  Tradeable?
10. Earnings Calendar  Events soon?
```

### Before Placing Order (2 min)

**Position Sizing**:
```
11. Position Sizer  Calculate shares
12. Risk Calculator  Verify R:R &gt;2:1
13. Ticker Volatility  Adjust for ATR
```

### Advanced Analysis (Optional, 10 min)

**Deeper Dive**:
```
14. Ticker Momentum  Confirm pressure
15. Relative Strength  Top 25%?
16. Short Interest  Squeeze risk?
17. Insider Transactions  What do insiders know?
18. Analyst Ratings  Wall Street view?
```

---

## Most Important Cards for Beginners

**Start With These 5 Cards**:
1. **Market Summary** - Is today a good trading day?
2. **Ticker Performance** - Stock snapshot
3. **Ticker Trend** - Direction clear?
4. **Position Sizer** - How many shares?
5. **Risk Calculator** - Is R:R good enough?

**Add After 1 Month**:
6. Market Breadth
7. Sector Rotation
8. Ticker Liquidity
9. Economic Calendar

**Add After 3 Months**:
10. Ticker Momentum
11. 52-Week Range
12. Relative Strength
13. Ticker Volatility

**Advanced (6+ Months)**:
- All options cards
- Fundamental cards (insider, institutional, analyst)
- GEX, correlation, advanced analysis

---

## Final Tips

1. **Don't Overwhelm Yourself**: Start with 5 cards, master them, then add more
2. **Build Routines**: Same cards, same order, every day = pattern recognition
3. **Position Sizing is #1**: More important than any indicator
4. **Market Environment Matters**: Don't fight weak markets
5. **Risk/Reward is #2**: Never take trades &lt;2:1 R:R
6. **Journal Everything**: Track which cards help you most

---

**Next**: [Proposed Enhancements](./card-api-proposed-enhancements.md)

