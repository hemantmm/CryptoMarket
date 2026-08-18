import React from 'react';
import { Link } from 'react-router-dom';
import { useCrypto } from '../context/CryptoContext';
import { currencyFormat, formatCompactNumber, formatPercentage } from '../utils';
import { TrendingDown, TrendingUp, StarIcon } from '../icons/icons';

// Lightweight inline SVG Sparkline generator for instant 7d trends
export const MiniSparkline = ({ data, isPositive, width = 120, height = 36 }) => {
  if (!data || !Array.isArray(data) || data.length < 2) return null;

  // Sample data points to keep SVG lightweight
  const step = Math.max(1, Math.floor(data.length / 25));
  const points = [];
  for (let i = 0; i < data.length; i += step) {
    points.push(data[i]);
  }
  if (points[points.length - 1] !== data[data.length - 1]) {
    points.push(data[data.length - 1]);
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const padding = 2;

  const pathCoords = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${pathCoords.join(' L ')}`;
  const strokeColor = isPositive ? '#10b981' : '#f43f5e';

  return (
    <svg width={width} height={height} className="overflow-visible select-none">
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Coin = ({ coin, viewMode = 'table' }) => {
  const { currency, isFavorite, toggleWatchlist } = useCrypto();
  const isPositive = coin.price_change_percentage_24h >= 0;
  const favorited = isFavorite(coin.id);

  const handleStarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(coin.id);
  };

  const sparklineData = coin.sparkline_in_7d?.price;

  // --- GRID CARD VIEW ---
  if (viewMode === 'grid') {
    return (
      <Link to={`/coin/${coin.id}`} className="block group">
        <div className="glass-card glass-card-hover p-5 relative overflow-hidden border-slate-800 hover:border-cyan-500/40">
          {/* Ambient Glow */}
          <div
            className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-15 group-hover:opacity-30 transition-opacity ${
              isPositive ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
          />

          {/* Card Header: Avatar, Name, Rank, Star */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-10 h-10 rounded-full bg-slate-900 p-0.5 ring-1 ring-slate-700/60 group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors truncate">
                    {coin.name}
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono font-medium">
                    #{coin.market_cap_rank || '-'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 uppercase font-mono font-medium truncate">
                  {coin.symbol}
                </p>
              </div>
            </div>

            <button
              onClick={handleStarClick}
              className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-slate-800 transition-colors shrink-0"
              title={favorited ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <StarIcon filled={favorited} className="w-5 h-5" />
            </button>
          </div>

          {/* Price & 24h Change */}
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <div>
              <div className="text-xs text-slate-500 mb-0.5">Current Price</div>
              <div className="text-xl font-extrabold text-slate-100 font-mono tracking-tight">
                {currencyFormat(coin.current_price, currency)}
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-bold ${
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {formatPercentage(coin.price_change_percentage_24h)}
            </div>
          </div>

          {/* Sparkline mini chart preview */}
          {sparklineData && (
            <div className="py-2 flex items-center justify-between border-t border-slate-800/80">
              <span className="text-[11px] text-slate-500 font-medium">7D Trend</span>
              <MiniSparkline data={sparklineData} isPositive={isPositive} width={130} height={32} />
            </div>
          )}

          {/* Footer Stats: Market Cap & 24h Volume */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Market Cap</span>
              <span className="font-semibold text-slate-300 font-mono">
                {formatCompactNumber(coin.market_cap, currency)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[11px]">24h Volume</span>
              <span className="font-semibold text-slate-300 font-mono">
                {formatCompactNumber(coin.total_volume, currency)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // --- TABLE ROW VIEW ---
  return (
    <Link to={`/coin/${coin.id}`} className="block group">
      <div className="glass-card glass-card-hover px-4 py-3.5 grid grid-cols-12 items-center gap-3 border-slate-800 hover:border-cyan-500/30">
        {/* Col 1: Star & Rank (cols 1-2 on desktop, cols 1-4 on mobile) */}
        <div className="col-span-6 sm:col-span-4 md:col-span-3 flex items-center gap-2.5 min-w-0">
          <button
            onClick={handleStarClick}
            className="p-1 text-slate-500 hover:text-amber-400 transition-colors shrink-0"
            title={favorited ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            <StarIcon filled={favorited} className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono text-slate-400 w-6 text-center shrink-0">
            {coin.market_cap_rank || '-'}
          </span>

          <img
            src={coin.image}
            alt={coin.name}
            className="w-7 h-7 rounded-full bg-slate-900 p-0.5 ring-1 ring-slate-700/50 shrink-0 group-hover:scale-105 transition-transform"
          />

          <div className="min-w-0">
            <div className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors truncate">
              {coin.name}
            </div>
            <div className="text-xs text-slate-400 uppercase font-mono">{coin.symbol}</div>
          </div>
        </div>

        {/* Col 2: Price (cols 3-6 on mobile, col 2 on desktop) */}
        <div className="col-span-6 sm:col-span-3 md:col-span-2 text-right">
          <div className="text-sm font-bold text-slate-100 font-mono tracking-tight">
            {currencyFormat(coin.current_price, currency)}
          </div>
          {/* On mobile, show 24h change inline below price */}
          <div
            className={`text-xs font-semibold sm:hidden flex items-center justify-end ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
            {formatPercentage(coin.price_change_percentage_24h)}
          </div>
        </div>

        {/* Col 3: 24h Change Badge (desktop) */}
        <div className="hidden sm:flex col-span-2 justify-end">
          <span
            className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-bold ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {formatPercentage(coin.price_change_percentage_24h)}
          </span>
        </div>

        {/* Col 4: 24h Volume */}
        <div className="hidden md:block col-span-2 text-right">
          <div className="text-sm font-semibold text-slate-200 font-mono">
            {formatCompactNumber(coin.total_volume, currency)}
          </div>
        </div>

        {/* Col 5: Market Cap */}
        <div className="hidden lg:block col-span-2 text-right">
          <div className="text-sm font-semibold text-slate-200 font-mono">
            {formatCompactNumber(coin.market_cap, currency)}
          </div>
        </div>

        {/* Col 6: 7d Sparkline Mini Chart */}
        <div className="hidden xl:flex col-span-1 justify-end">
          {sparklineData ? (
            <MiniSparkline data={sparklineData} isPositive={isPositive} width={90} height={28} />
          ) : (
            <span className="text-xs text-slate-600">-</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Coin;