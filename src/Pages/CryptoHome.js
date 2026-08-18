import React from 'react';
import Trending from '../components/Trending';
import Markets from '../components/Markets';
import { SparklesIcon } from '../icons/icons';

const CryptoHome = () => {
  return (
    <main className="wrapper-container py-8">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden glass-card p-6 md:p-8 mb-8 border-slate-800/80 bg-gradient-to-r from-dark-900/90 via-dark-850/80 to-slate-900/90">
        {/* Background ambient glow shapes */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Real-Time Market Terminal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
              Track, Analyze & Explore the <span className="text-gradient-cyan">Crypto Economy</span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Explore live streaming prices, market capitalizations, volume depth, and historical performance across 10,000+ digital assets.
            </p>
          </div>

          {/* Quick stats mini badge pill */}
          <div className="flex flex-wrap gap-2.5">
            <div className="bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-xl">
              <span className="text-[11px] text-slate-400 block font-medium">Tracking</span>
              <span className="text-sm font-bold text-slate-200 font-mono">10,000+ Assets</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-xl">
              <span className="text-[11px] text-slate-400 block font-medium">Updates</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">Real-Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top 24h Trending Section */}
      <Trending />

      {/* Main Markets Intelligence Explorer */}
      <Markets />
    </main>
  );
};

export default CryptoHome;