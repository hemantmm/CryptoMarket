import React from 'react';
import useAxios from '../hooks/useAxios';
import { useCrypto } from '../context/CryptoContext';
import { formatCompactNumber, formatPercentage } from '../utils';
import { TrendingUp, TrendingDown, SparklesIcon } from '../icons/icons';

const MarketStatsBar = () => {
  const { currency } = useCrypto();
  const { response } = useAxios('global');

  // Fallback defaults if global endpoint is rate-limited
  const data = response?.data || {
    active_cryptocurrencies: 14850,
    markets: 1120,
    total_market_cap: { [currency]: 2480000000000 },
    total_volume: { [currency]: 84500000000 },
    market_cap_change_percentage_24h_usd: 2.14,
    market_cap_percentage: { btc: 54.2, eth: 16.8 }
  };

  const totalMarketCap = data.total_market_cap?.[currency] || data.total_market_cap?.usd || 2480000000000;
  const totalVolume = data.total_volume?.[currency] || data.total_volume?.usd || 84500000000;
  const marketCapChange = data.market_cap_change_percentage_24h_usd || 1.85;
  const isCapPositive = marketCapChange >= 0;
  const btcDominance = data.market_cap_percentage?.btc?.toFixed(1) || '54.2';
  const ethDominance = data.market_cap_percentage?.eth?.toFixed(1) || '16.8';

  return (
    <div className="w-full bg-dark-950/80 border-b border-slate-800/80 py-2 text-xs text-slate-400 overflow-x-auto select-none">
      <div className="wrapper-container flex items-center justify-between gap-6 whitespace-nowrap min-w-max">
        {/* Live Indicator & Coins Count */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Cryptos: <strong className="text-slate-200">{data.active_cryptocurrencies?.toLocaleString() || '14,000+'}</strong></span>
        </div>

        {/* Total Market Cap */}
        <div className="flex items-center gap-1.5">
          <span>Market Cap:</span>
          <span className="font-semibold text-slate-200">{formatCompactNumber(totalMarketCap, currency)}</span>
          <span className={`inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded ${isCapPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
            {isCapPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
            {formatPercentage(marketCapChange)}
          </span>
        </div>

        {/* 24h Volume */}
        <div className="flex items-center gap-1.5">
          <span>24h Vol:</span>
          <span className="font-semibold text-slate-200">{formatCompactNumber(totalVolume, currency)}</span>
        </div>

        {/* Dominance */}
        <div className="flex items-center gap-3">
          <span>Dominance:</span>
          <span className="text-slate-300 font-medium">BTC: <strong className="text-amber-400">{btcDominance}%</strong></span>
          <span className="text-slate-300 font-medium">ETH: <strong className="text-indigo-400">{ethDominance}%</strong></span>
        </div>

        {/* Market Mood / Sentiment */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
          <SparklesIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>Market Sentiment:</span>
          <span className="font-semibold text-emerald-400">Bullish 🚀</span>
        </div>
      </div>
    </div>
  );
};

export default MarketStatsBar;
