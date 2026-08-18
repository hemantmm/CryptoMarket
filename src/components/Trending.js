import React from 'react';
import useAxios from '../hooks/useAxios';
import CoinTrending from './CoinTrending';
import { TrendingSkeleton } from './SkeletonLoaders';
import { FireIcon } from '../icons/icons';

const Trending = () => {
  const { response, loading } = useAxios('search/trending');

  const coins = response?.coins?.slice(0, 6) || [];

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <FireIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              Trending Tokens
            </h2>
            <p className="text-xs text-slate-400">
              Most searched cryptocurrencies in the last 24 hours
            </p>
          </div>
        </div>
      </div>

      {loading && !response ? (
        <TrendingSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {coins.map((coin, index) => (
            <CoinTrending
              key={coin.item.id || coin.item.coin_id || index}
              coin={coin.item}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Trending;