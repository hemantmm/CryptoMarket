import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrypto } from '../context/CryptoContext';
import useAxios from '../hooks/useAxios';
import { currencyFormat, formatPercentage } from '../utils';
import { CloseIcon, StarIcon, TrendingUp, TrendingDown } from '../icons/icons';

const WatchlistDrawer = () => {
  const { isWatchlistOpen, setIsWatchlistOpen, watchlist, toggleWatchlist, currency } = useCrypto();
  const navigate = useNavigate();

  const { response: marketCoins } = useAxios(
    `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  if (!isWatchlistOpen) return null;

  const favoriteCoins = (marketCoins || []).filter((c) => watchlist.includes(c.id));

  const handleCoinClick = (coinId) => {
    setIsWatchlistOpen(false);
    navigate(`/coin/${coinId}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWatchlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-dark-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StarIcon filled={true} className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-slate-100">My Watchlist</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {watchlist.length}
              </span>
            </div>
            <button
              onClick={() => setIsWatchlistOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {watchlist.length === 0 ? (
              <div className="text-center py-16 px-4">
                <StarIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-base font-semibold text-slate-300">Your watchlist is empty</p>
                <p className="text-xs text-slate-500 mt-1">
                  Click the star icon next to any cryptocurrency to track it here.
                </p>
              </div>
            ) : (
              favoriteCoins.map((coin) => {
                const isPositive = coin.price_change_percentage_24h >= 0;
                return (
                  <div
                    key={coin.id}
                    className="glass-card glass-card-hover p-3 flex items-center justify-between gap-3 cursor-pointer group"
                    onClick={() => handleCoinClick(coin.id)}
                  >
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="font-semibold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                          {coin.name}
                        </div>
                        <div className="text-xs text-slate-400 uppercase font-mono">{coin.symbol}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-semibold text-slate-200">
                          {currencyFormat(coin.current_price, currency)}
                        </div>
                        <div
                          className={`text-xs font-medium flex items-center justify-end ${
                            isPositive ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3 mr-0.5" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-0.5" />
                          )}
                          {formatPercentage(coin.price_change_percentage_24h)}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWatchlist(coin.id);
                        }}
                        className="p-1.5 rounded-lg text-amber-400 hover:bg-slate-800 transition-colors"
                        title="Remove from watchlist"
                      >
                        <StarIcon filled={true} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistDrawer;
