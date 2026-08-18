import React, { useState, useMemo } from 'react';
import useAxios from '../hooks/useAxios';
import { useCrypto } from '../context/CryptoContext';
import Coin from './Coin';
import { TableSkeleton, GridSkeleton } from './SkeletonLoaders';
import {
  GridIcon,
  TableIcon,
  SearchIcon,
  CloseIcon,
  StarIcon,
  SparklesIcon,
  RefreshIcon,
} from '../icons/icons';

const Markets = () => {
  const {
    currency,
    watchlist,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
  } = useCrypto();

  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const { response, loading, refetch } = useAxios(
    `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true`
  );

  // Filter and sort coins
  const filteredCoins = useMemo(() => {
    if (!response || !Array.isArray(response)) return [];

    let coins = [...response];

    // Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      coins = coins.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
      );
    }

    // Category tab filtering
    if (activeTab === 'gainers') {
      coins = coins.filter((c) => (c.price_change_percentage_24h || 0) > 0);
      coins.sort(
        (a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
      );
    } else if (activeTab === 'losers') {
      coins = coins.filter((c) => (c.price_change_percentage_24h || 0) < 0);
      coins.sort(
        (a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0)
      );
    } else if (activeTab === 'watchlist') {
      coins = coins.filter((c) => watchlist.includes(c.id));
    }

    // Explicit sorting if not already sorted by gainers/losers tab
    if (activeTab === 'all' || activeTab === 'watchlist') {
      if (sortBy === 'market_cap_desc') {
        coins.sort((a, b) => (b.market_cap || 0) - (a.market_cap || 0));
      } else if (sortBy === 'price_desc') {
        coins.sort((a, b) => (b.current_price || 0) - (a.current_price || 0));
      } else if (sortBy === 'price_asc') {
        coins.sort((a, b) => (a.current_price || 0) - (b.current_price || 0));
      } else if (sortBy === 'change_desc') {
        coins.sort(
          (a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
        );
      } else if (sortBy === 'change_asc') {
        coins.sort(
          (a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0)
        );
      } else if (sortBy === 'name_asc') {
        coins.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    return coins;
  }, [response, searchQuery, activeTab, sortBy, watchlist]);

  // Pagination slicing
  const totalPages = Math.ceil(filteredCoins.length / itemsPerPage) || 1;
  const paginatedCoins = filteredCoins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <section className="mt-4 mb-16">
      {/* Section Header & Interactive Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            Market Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time cryptocurrency prices, volume, market cap & 7-day performance
          </p>
        </div>

        {/* Action Controls: Refresh, View Switcher */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={refetch}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            title="Refresh Prices"
          >
            <RefreshIcon className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          {/* View Mode Toggle: Table / Grid */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Grid Cards View"
            >
              <GridIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs, Search Filter & Sort Bar */}
      <div className="glass-card p-3 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Filter Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            All Coins
          </button>

          <button
            onClick={() => handleTabChange('gainers')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
              activeTab === 'gainers'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>🚀 Top Gainers</span>
          </button>

          <button
            onClick={() => handleTabChange('losers')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
              activeTab === 'losers'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>🔻 Top Losers</span>
          </button>

          <button
            onClick={() => handleTabChange('watchlist')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'watchlist'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <StarIcon filled={activeTab === 'watchlist'} className="w-3.5 h-3.5" />
            <span>Watchlist ({watchlist.length})</span>
          </button>
        </div>

        {/* Search & Sort Dropdowns */}
        <div className="flex items-center gap-2.5">
          {/* Quick Filter Search */}
          <div className="relative flex-1 sm:w-56">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <SearchIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Filter by name/symbol..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <CloseIcon className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold py-1.5 pl-3 pr-7 rounded-xl cursor-pointer hover:border-slate-700 focus:outline-none focus:border-cyan-500"
            >
              <option value="market_cap_desc">Market Cap (High to Low)</option>
              <option value="price_desc">Price (High to Low)</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="change_desc">24h Gainers</option>
              <option value="change_asc">24h Losers</option>
              <option value="name_asc">Name (A-Z)</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[9px]">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {loading && !response ? (
        viewMode === 'table' ? (
          <TableSkeleton rows={10} />
        ) : (
          <GridSkeleton count={9} />
        )
      ) : filteredCoins.length === 0 ? (
        <div className="glass-card text-center py-16 px-4">
          <SparklesIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">No Cryptocurrencies Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {activeTab === 'watchlist'
              ? "You haven't starred any coins in your watchlist yet. Click the star icon next to any coin to add it!"
              : `No coins match your search "${searchQuery}". Try searching for another symbol or clear your filter.`}
          </p>
          {(searchQuery || activeTab !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {viewMode === 'table' ? (
            <div className="space-y-2">
              {/* Table Column Headers */}
              <div className="px-4 py-2 grid grid-cols-12 items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
                <div className="col-span-6 sm:col-span-4 md:col-span-3 flex items-center gap-2">
                  <span className="w-4"></span>
                  <span className="w-6 text-center">#</span>
                  <span>Asset</span>
                </div>
                <div className="col-span-6 sm:col-span-3 md:col-span-2 text-right">Price</div>
                <div className="hidden sm:block col-span-2 text-right">24h Change</div>
                <div className="hidden md:block col-span-2 text-right">24h Volume</div>
                <div className="hidden lg:block col-span-2 text-right">Market Cap</div>
                <div className="hidden xl:block col-span-1 text-right">7D Chart</div>
              </div>

              {/* Rows */}
              {paginatedCoins.map((coin) => (
                <Coin key={coin.id} coin={coin} viewMode="table" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedCoins.map((coin) => (
                <Coin key={coin.id} coin={coin} viewMode="grid" />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between text-xs text-slate-400">
              <div>
                Showing{' '}
                <span className="font-semibold text-slate-200">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{' '}
                to{' '}
                <span className="font-semibold text-slate-200">
                  {Math.min(currentPage * itemsPerPage, filteredCoins.length)}
                </span>{' '}
                of <span className="font-semibold text-slate-200">{filteredCoins.length}</span> coins
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-700 text-slate-200 font-semibold"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1 px-2 font-mono font-semibold text-slate-300">
                  {currentPage} / {totalPages}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-700 text-slate-200 font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Markets;