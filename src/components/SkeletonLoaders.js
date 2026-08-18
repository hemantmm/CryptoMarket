import React from 'react';

export const TableSkeleton = ({ rows = 8 }) => (
  <div className="w-full space-y-3">
    {Array.from({ length: rows }).map((_, idx) => (
      <div
        key={idx}
        className="glass-card p-4 flex items-center justify-between gap-4 animate-pulse"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="w-6 h-6 rounded-full bg-slate-800" />
          <div className="w-8 h-8 rounded-full bg-slate-800" />
          <div className="space-y-1.5">
            <div className="w-24 h-4 rounded bg-slate-800" />
            <div className="w-12 h-3 rounded bg-slate-800/70" />
          </div>
        </div>
        <div className="w-20 h-5 rounded bg-slate-800 hidden sm:block" />
        <div className="w-16 h-5 rounded bg-slate-800" />
        <div className="w-24 h-5 rounded bg-slate-800 hidden md:block" />
        <div className="w-24 h-8 rounded bg-slate-800 hidden lg:block" />
      </div>
    ))}
  </div>
);

export const GridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="glass-card p-5 space-y-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800" />
            <div className="space-y-1.5">
              <div className="w-24 h-4 rounded bg-slate-800" />
              <div className="w-12 h-3 rounded bg-slate-800/70" />
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-slate-800" />
        </div>
        <div className="space-y-2 pt-2">
          <div className="w-28 h-6 rounded bg-slate-800" />
          <div className="w-16 h-4 rounded bg-slate-800/70" />
        </div>
        <div className="pt-2 border-t border-slate-800/80 flex justify-between">
          <div className="w-20 h-4 rounded bg-slate-800" />
          <div className="w-20 h-4 rounded bg-slate-800" />
        </div>
      </div>
    ))}
  </div>
);

export const TrendingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
    {Array.from({ length: 6 }).map((_, idx) => (
      <div key={idx} className="glass-card p-3 flex items-center gap-3 animate-pulse">
        <div className="w-6 h-6 rounded bg-slate-800" />
        <div className="w-8 h-8 rounded-full bg-slate-800" />
        <div className="space-y-1 flex-1">
          <div className="w-16 h-3 rounded bg-slate-800" />
          <div className="w-10 h-2.5 rounded bg-slate-800/60" />
        </div>
      </div>
    ))}
  </div>
);

export const ChartSkeleton = () => (
  <div className="glass-card p-6 w-full h-80 animate-pulse flex flex-col justify-between">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <div className="w-32 h-6 rounded bg-slate-800" />
        <div className="w-24 h-4 rounded bg-slate-800/70" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-10 h-7 rounded-lg bg-slate-800" />
        ))}
      </div>
    </div>
    <div className="w-full h-48 rounded-xl bg-slate-800/40" />
  </div>
);
