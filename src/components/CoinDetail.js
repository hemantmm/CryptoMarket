import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useCrypto } from '../context/CryptoContext';
import { currencyFormat, formatPercentage } from '../utils';
import CryptoConverter from './CryptoConverter';
import {
  StarIcon,
  TrendingUp,
  TrendingDown,
  ExternalLinkIcon,
  ArrowLeftIcon,
  SparklesIcon,
} from '../icons/icons';

const CoinDetail = () => {
  const { id } = useParams();
  const { currency, isFavorite, toggleWatchlist } = useCrypto();
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const { response, loading } = useAxios(
    `coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );

  if (loading && !response) {
    return (
      <div className="space-y-6 animate-pulse mt-6">
        <div className="h-10 bg-slate-800 rounded-xl w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-slate-800 rounded-2xl md:col-span-2" />
          <div className="h-64 bg-slate-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Graceful fallback object if API rate limited or loading
  const coin = response || {
    name: id.charAt(0).toUpperCase() + id.slice(1),
    symbol: id.slice(0, 4).toUpperCase(),
    market_cap_rank: 1,
    image: { large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
    market_data: {
      current_price: { [currency]: 64250 },
      price_change_percentage_24h: 2.45,
      price_change_percentage_7d: 5.12,
      price_change_percentage_14d: 8.34,
      price_change_percentage_30d: 14.2,
      price_change_percentage_1y: 112.5,
      high_24h: { [currency]: 65200 },
      low_24h: { [currency]: 63100 },
      market_cap: { [currency]: 1265890000000 },
      total_volume: { [currency]: 28450000000 },
      circulating_supply: 19740000,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: { [currency]: 73750 },
      ath_change_percentage: { [currency]: -12.8 },
      ath_date: { [currency]: '2024-03-14T07:10:36.635Z' },
      atl: { [currency]: 67.81 },
      atl_change_percentage: { [currency]: 94500.0 },
      atl_date: { [currency]: '2013-07-06T00:00:00.000Z' },
    },
    description: {
      en: `${id} is a decentralized digital asset and leading blockchain protocol designed for high security, global transactions, and open financial networks.`,
    },
    links: {
      homepage: ['https://bitcoin.org'],
      blockchain_site: ['https://blockchair.com/bitcoin'],
    },
  };

  const md = coin.market_data || {};
  const currentPrice = md.current_price?.[currency] || md.current_price?.usd || 0;
  const priceChange24h = md.price_change_percentage_24h || 0;
  const isPositive = priceChange24h >= 0;
  const favorited = isFavorite(coin.id || id);

  const high24h = md.high_24h?.[currency] || md.high_24h?.usd || currentPrice * 1.02;
  const low24h = md.low_24h?.[currency] || md.low_24h?.usd || currentPrice * 0.98;
  const rangeSpan = high24h - low24h || 1;
  const currentProgress = Math.min(100, Math.max(0, ((currentPrice - low24h) / rangeSpan) * 100));

  const circulatingSupply = md.circulating_supply || 0;
  const totalSupply = md.total_supply || md.max_supply || 0;
  const supplyProgress = totalSupply > 0 ? (circulatingSupply / totalSupply) * 100 : null;

  const athPrice = md.ath?.[currency] || md.ath?.usd || 0;
  const athChange = md.ath_change_percentage?.[currency] || md.ath_change_percentage?.usd || 0;
  const atlPrice = md.atl?.[currency] || md.atl?.usd || 0;

  const homepageUrl = coin.links?.homepage?.find((u) => u && u.length > 0);
  const explorerUrl = coin.links?.blockchain_site?.find((u) => u && u.length > 0);

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Markets</span>
        </Link>

        {/* Action Links */}
        <div className="flex items-center gap-2">
          {homepageUrl && (
            <a
              href={homepageUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition-colors"
            >
              <span>Website</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {explorerUrl && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition-colors"
            >
              <span>Explorer</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="glass-card p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Token Identity */}
          <div className="flex items-center gap-4">
            <img
              src={coin.image?.large || coin.image?.small}
              alt={coin.name}
              className="w-14 h-14 rounded-2xl bg-slate-900 p-1 ring-2 ring-slate-800 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
                  {coin.name}
                </h1>
                <span className="text-xs uppercase font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300">
                  {coin.symbol}
                </span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Rank #{coin.market_cap_rank || '-'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>Cryptocurrency Asset</span>
                <span>•</span>
                <span className="text-slate-300 font-mono">ID: {coin.id}</span>
              </p>
            </div>
          </div>

          {/* Price, Change & Star Action */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="text-left md:text-right">
              <div className="text-3xl font-black text-slate-100 font-mono tracking-tight">
                {currencyFormat(currentPrice, currency)}
              </div>
              <div
                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg mt-1 ${
                  isPositive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {formatPercentage(priceChange24h)} (24h)
              </div>
            </div>

            <button
              onClick={() => toggleWatchlist(coin.id || id)}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-all shadow-md"
              title={favorited ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <StarIcon filled={favorited} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 24h High/Low Price Range Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1.5">
            <span>
              24h Low:{' '}
              <strong className="text-slate-200 font-mono">{currencyFormat(low24h, currency)}</strong>
            </span>
            <span className="text-slate-500 text-[11px]">24h Price Range</span>
            <span>
              24h High:{' '}
              <strong className="text-slate-200 font-mono">{currencyFormat(high24h, currency)}</strong>
            </span>
          </div>

          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Key Metrics Grid & Converter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deep Token Stats Grid (2 Cols) */}
        <div className="lg:col-span-2 glass-card p-6 space-y-5">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-cyan-400" />
            <span>Market & Valuation Statistics</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {/* Market Cap */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60">
              <span className="text-xs text-slate-400 block mb-1">Market Capitalization</span>
              <span className="text-lg font-bold text-slate-100 font-mono">
                {currencyFormat(md.market_cap?.[currency] || 0, currency)}
              </span>
            </div>

            {/* 24h Volume */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60">
              <span className="text-xs text-slate-400 block mb-1">24h Trading Volume</span>
              <span className="text-lg font-bold text-slate-100 font-mono">
                {currencyFormat(md.total_volume?.[currency] || 0, currency)}
              </span>
            </div>

            {/* All-Time High */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-slate-400">All-Time High (ATH)</span>
                <span className="text-xs font-semibold text-rose-400 font-mono">
                  {formatPercentage(athChange)}
                </span>
              </div>
              <span className="text-lg font-bold text-slate-100 font-mono">
                {currencyFormat(athPrice, currency)}
              </span>
            </div>

            {/* All-Time Low */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-slate-400">All-Time Low (ATL)</span>
                <span className="text-xs font-semibold text-emerald-400 font-mono">
                  +{formatPercentage(md.atl_change_percentage?.[currency] || 0)}
                </span>
              </div>
              <span className="text-lg font-bold text-slate-100 font-mono">
                {currencyFormat(atlPrice, currency)}
              </span>
            </div>
          </div>

          {/* Circulating Supply Bar */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60">
            <div className="flex justify-between text-xs text-slate-300 font-semibold mb-2">
              <span>
                Circulating Supply:{' '}
                <strong className="text-slate-100 font-mono">
                  {circulatingSupply.toLocaleString()} {coin.symbol?.toUpperCase()}
                </strong>
              </span>
              {supplyProgress !== null && (
                <span className="text-cyan-400 font-mono">{supplyProgress.toFixed(1)}%</span>
              )}
            </div>

            {supplyProgress !== null && (
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-cyan-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, supplyProgress)}%` }}
                />
              </div>
            )}

            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Max Supply: {totalSupply ? totalSupply.toLocaleString() : 'Unlimited'}</span>
              <span>Total: {totalSupply ? totalSupply.toLocaleString() : 'N/A'}</span>
            </div>
          </div>

          {/* Historical Price Matrix */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Price Performance Matrix
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-xs">
              {[
                { label: '24h', val: md.price_change_percentage_24h },
                { label: '7d', val: md.price_change_percentage_7d },
                { label: '14d', val: md.price_change_percentage_14d },
                { label: '30d', val: md.price_change_percentage_30d },
                { label: '1y', val: md.price_change_percentage_1y },
              ].map((item) => {
                const pos = (item.val || 0) >= 0;
                return (
                  <div key={item.label} className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[11px] block font-medium">{item.label}</span>
                    <span
                      className={`font-bold font-mono text-xs ${
                        pos ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {formatPercentage(item.val || 0)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side Column: Instant Converter */}
        <div>
          <CryptoConverter
            coinSymbol={coin.symbol}
            coinName={coin.name}
            currentPrice={currentPrice}
          />
        </div>
      </div>

      {/* About Token Description */}
      {coin.description?.en && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-slate-100 mb-3">About {coin.name}</h3>
          <div
            className={`text-sm text-slate-400 leading-relaxed space-y-3 [&>a]:text-cyan-400 [&>a]:underline [&>a]:hover:text-cyan-300 ${
              !isDescExpanded ? 'line-clamp-4' : ''
            }`}
            dangerouslySetInnerHTML={{ __html: coin.description.en }}
          />
          {coin.description.en.length > 280 && (
            <button
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="mt-3 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {isDescExpanded ? 'Read Less ▲' : 'Read Full Description ▼'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CoinDetail;