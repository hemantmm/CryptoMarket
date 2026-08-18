import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCrypto } from '../context/CryptoContext';
import { LogoIcon, SearchIcon, CloseIcon, StarIcon } from '../icons/icons';

const Navbar = () => {
  const navigate = useNavigate();
  const {
    currency,
    setCurrency,
    currencies,
    watchlist,
    setIsWatchlistOpen,
    searchQuery,
    setSearchQuery,
  } = useCrypto();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-dark-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="wrapper-container flex items-center justify-between h-16 gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group cursor-pointer select-none shrink-0"
        >
          <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
            <LogoIcon className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-extrabold text-lg tracking-tight">
              <span className="text-white">Crypto</span>
              <span className="text-gradient-cyan">Pulse</span>
            </div>
            <div className="text-[10px] text-slate-400 -mt-1 font-mono tracking-wider">
              MARKET INTELLIGENCE
            </div>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className={`flex-1 max-w-md relative hidden sm:flex items-center transition-all duration-200 ${
            isSearchFocused ? 'scale-[1.01]' : ''
          }`}
        >
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search coin, symbol (e.g. BTC, Solana)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-dark-900/90 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Right Side Actions: Currency & Watchlist */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Currency Switcher */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="appearance-none bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold py-2 pl-3 pr-8 rounded-xl cursor-pointer hover:border-slate-700 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 transition-all uppercase"
            >
              {Object.keys(currencies).map((curr) => (
                <option key={curr} value={curr} className="bg-dark-900 text-slate-100">
                  {currencies[curr].symbol} {currencies[curr].code.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* Watchlist Button */}
          <button
            onClick={() => setIsWatchlistOpen(true)}
            className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-400 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm"
            title="Open Watchlist"
          >
            <StarIcon filled={watchlist.length > 0} className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Watchlist</span>
            {watchlist.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono">
                {watchlist.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search input strip */}
      <div className="sm:hidden px-4 pb-3 pt-1">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search coin (e.g. BTC, ETH)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-dark-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-slate-400 hover:text-slate-200"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;