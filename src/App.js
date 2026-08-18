import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { CryptoProvider } from './context/CryptoContext';
import Navbar from './components/Navbar';
import MarketStatsBar from './components/MarketStatsBar';
import WatchlistDrawer from './components/WatchlistDrawer';
import CryptoHome from './Pages/CryptoHome';
import CryptoDetail from './Pages/CryptoDetail';
import { LogoIcon } from './icons/icons';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
          {/* Global Sticky Navigation */}
          <Navbar />

          {/* Global Market Stats Ticker */}
          <MarketStatsBar />

          {/* Watchlist Slide-out Drawer */}
          <WatchlistDrawer />

          {/* Main Application Routes */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<CryptoHome />} />
              <Route path="/coin/:id" element={<CryptoDetail />} />
            </Routes>
          </div>

          {/* Futuristic Platform Footer */}
          <footer className="mt-auto border-t border-slate-800/80 bg-dark-950/90 py-8 text-xs text-slate-400">
            <div className="wrapper-container flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <LogoIcon className="w-6 h-6" />
                <span className="font-extrabold text-slate-200 text-sm">
                  Crypto<span className="text-gradient-cyan">Pulse</span>
                </span>
                <span className="text-slate-600 font-mono text-[11px]">v2.0 PRO</span>
              </div>

              <div className="flex items-center gap-6 text-slate-400">
                <span>Real-Time Market Data</span>
                <span>•</span>
                <span>Multi-Currency Terminal</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Systems Operational
                </span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CryptoProvider>
  );
}

export default App;
