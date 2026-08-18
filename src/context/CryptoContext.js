import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENCIES } from '../utils';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  // Currency state
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('crypto_currency') || 'usd';
  });

  // Watchlist state (stored as array of coin IDs in localStorage)
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('crypto_watchlist');
      return saved ? JSON.parse(saved) : ['bitcoin', 'ethereum', 'solana'];
    } catch {
      return ['bitcoin', 'ethereum', 'solana'];
    }
  });

  // Search query & active filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'gainers' | 'losers' | 'watchlist'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  // Sync currency to localStorage
  useEffect(() => {
    localStorage.setItem('crypto_currency', currency);
  }, [currency]);

  // Sync watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('crypto_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (coinId) => {
    setWatchlist((prev) => {
      if (prev.includes(coinId)) {
        return prev.filter((id) => id !== coinId);
      } else {
        return [...prev, coinId];
      }
    });
  };

  const isFavorite = (coinId) => watchlist.includes(coinId);

  return (
    <CryptoContext.Provider
      value={{
        currency,
        setCurrency,
        currencies: CURRENCIES,
        watchlist,
        toggleWatchlist,
        isFavorite,
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        isWatchlistOpen,
        setIsWatchlistOpen,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};
