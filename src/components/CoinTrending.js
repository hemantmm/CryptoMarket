import React from 'react';
import { Link } from 'react-router-dom';
import { FireIcon } from '../icons/icons';

const CoinTrending = ({ coin, index }) => {
  const rank = index !== undefined ? index + 1 : coin.score + 1;
  const priceChange = coin.data?.price_change_percentage_24h?.usd;
  const isPositive = priceChange !== undefined ? priceChange >= 0 : true;

  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="glass-card glass-card-hover p-3.5 relative overflow-hidden group cursor-pointer border-slate-800 hover:border-cyan-500/40">
        {/* Ambient Top Glow */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all" />

        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Rank Badge */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-800/80 border border-slate-700/50 text-[11px] font-bold text-amber-400">
            <FireIcon className="w-3 h-3 text-amber-400" />
            <span>#{rank}</span>
          </div>

          {priceChange !== undefined && (
            <span
              className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-rose-500/10 text-rose-400'
              }`}
            >
              {isPositive ? '+' : ''}
              {priceChange?.toFixed(2)}%
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <img
            className="w-8 h-8 rounded-full ring-1 ring-slate-700/60 p-0.5 bg-slate-900 group-hover:scale-110 transition-transform"
            src={coin.small || coin.large || coin.thumb}
            alt={coin.name}
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors truncate">
              {coin.name}
            </h3>
            <p className="text-xs text-slate-400 uppercase font-mono font-medium truncate">
              {coin.symbol}
            </p>
          </div>
        </div>

        {coin.data?.price && (
          <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <span className="text-slate-400">Price</span>
            <span className="font-semibold text-slate-200 font-mono">
              {coin.data.price}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CoinTrending;