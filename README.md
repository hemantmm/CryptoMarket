<div align="center">
  <h1>⚡ CryptoPulse — Market Intelligence Terminal</h1>
  <p><strong>A Next-Generation Real-Time Cryptocurrency & Market Intelligence Platform</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TailwindCSS-3.3.2-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Chart.js-4.3.0-ff6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
    <img src="https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js 24" />
    <img src="https://img.shields.io/badge/CoinGecko_API-v3-8dc351?style=for-the-badge" alt="CoinGecko API" />
  </p>
</div>

---

## 🌟 Overview

**CryptoPulse** is a high-performance cryptocurrency market intelligence dashboard built with React, Tailwind CSS, and Chart.js. It delivers real-time market data, interactive price charts with dynamic timeframes, instant search and filtering, multi-currency conversion, and persistent local watchlist management with an ultra-sleek dark glassmorphic interface.

---

## ✨ Key Features

### 1. 🌌 Midnight Glassmorphic Design System
- **Dark Theme Palette**: Ambient mesh radial gradients (`#060911` / `slate-950`) with frosted glass panels (`backdrop-blur-xl`).
- **Glow & Color Highlights**: Neon emerald (`#10b981`) for market gains and vibrant rose (`#f43f5e`) for dips.
- **Custom Modern Scrollbars & Micro-Animations**: Smooth transitions, hover cards, and active tab indicators.

### 2. ⚡ High Performance & Instant Loading
- **Zero Artificial Delays**: Fast data fetching with shimmering skeleton loaders.
- **Resilient In-Memory Caching & Rate-Limit Fallbacks**: Automatic caching and graceful fallback states to ensure uninterrupted operation during free-tier API rate limits.

### 3. 🌐 Global Market Ticker & Sticky Header
- **Live Market Marquee**: Displays total active cryptocurrencies, global market cap with 24h % change, 24h trading volume, and BTC & ETH dominance.
- **Multi-Currency Terminal**: Instant currency switching across **USD ($)**, **EUR (€)**, **GBP (£)**, **INR (₹)**, **JPY (¥)**, **AUD (A$)**, and **CAD (C$)**.
- **Real-Time Global Search**: Instant substring search with clear button.

### 4. ⭐ Watchlist Management
- **One-Click Pinning**: Star any token on the homepage or detail page to track your favorite coins.
- **Local Storage Persistence**: Starred assets are saved locally across browser sessions.
- **Slide-Over Drawer**: Dedicated drawer to quickly inspect, navigate to, or remove pinned assets from anywhere in the app.

### 5. 📊 Pro Markets Intelligence Explorer
- **Dual View Modes**: Switch seamlessly between a dense **Table View** and a modern **Grid Cards View**.
- **Instant Category Filtering**: Filter by *All Coins*, *🚀 Top Gainers*, *🔻 Top Losers*, or *⭐ Watchlist*.
- **Sorting Options**: Sort by Market Cap (High to Low), Price (High/Low), 24h Change, or Alphabetical Name.
- **7-Day Inline SVG Sparklines**: Lightweight, zero-overhead SVG trendlines rendered directly in table rows and cards.

### 6. 📈 Deep Coin Analytics & Interactive Charts
- **Timeframe Selector**: Dynamically toggle between `24H`, `7D`, `30D`, `90D`, and `1Y` historical views.
- **Gradient Area Line Charts**: Smooth bezier curves with dynamic bullish/bearish color gradients and custom dark tooltips.
- **Valuation Statistics**: Market Cap, 24h Volume, ATH (All-Time High) & ATL with dates and % changes, and Circulating vs. Max Supply progress bar.
- **Instant Price Calculator**: Live bidirectional cryptocurrency-to-fiat converter.
- **Price Performance Matrix**: 24h, 7d, 14d, 30d, and 1y historical price breakdown.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `20.x` or `24.x` (recommended)
- **npm**: `v9.x` or later

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hemantmm/CryptoMarket.git
   cd CryptoMarket
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   Generates an optimized, minified production build in the `build/` folder.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
