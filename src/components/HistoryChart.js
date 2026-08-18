import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useCrypto } from '../context/CryptoContext';
import { currencyFormat, formatPercentage } from '../utils';
import { ChartSkeleton } from './SkeletonLoaders';
import { TrendingUp, TrendingDown } from '../icons/icons';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const TIMEFRAMES = [
  { label: '24H', days: '1' },
  { label: '7D', days: '7' },
  { label: '30D', days: '30' },
  { label: '90D', days: '90' },
  { label: '1Y', days: '365' },
];

const HistoryChart = () => {
  const { id } = useParams();
  const { currency } = useCrypto();
  const [days, setDays] = useState('7');

  const { response, loading } = useAxios(
    `coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
  );

  if (loading && !response) {
    return <ChartSkeleton />;
  }

  const prices = response?.prices || [];
  if (prices.length === 0) {
    return (
      <div className="glass-card p-8 text-center text-slate-500">
        Price history chart is unavailable for this token.
      </div>
    );
  }

  const firstPrice = prices[0][1];
  const lastPrice = prices[prices.length - 1][1];
  const priceChange = lastPrice - firstPrice;
  const priceChangePercentage = firstPrice ? (priceChange / firstPrice) * 100 : 0;
  const isPositive = priceChange >= 0;

  const minPrice = Math.min(...prices.map((p) => p[1]));
  const maxPrice = Math.max(...prices.map((p) => p[1]));

  const chartData = {
    labels: prices.map((val) => {
      const timestamp = val[0];
      return days === '1'
        ? moment(timestamp).format('HH:mm')
        : days === '365'
        ? moment(timestamp).format('MMM YYYY')
        : moment(timestamp).format('MMM DD');
    }),
    datasets: [
      {
        fill: true,
        label: `${id.toUpperCase()} Price`,
        data: prices.map((val) => val[1]),
        borderColor: isPositive ? '#10b981' : '#f43f5e',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 320);
          if (isPositive) {
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.00)');
          } else {
            gradient.addColorStop(0, 'rgba(244, 63, 94, 0.35)');
            gradient.addColorStop(1, 'rgba(244, 63, 94, 0.00)');
          }
          return gradient;
        },
        borderWidth: 2.2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: isPositive ? '#10b981' : '#f43f5e',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        titleColor: '#94a3b8',
        bodyColor: '#f1f5f9',
        bodyFont: {
          weight: 'bold',
          family: 'JetBrains Mono',
        },
        borderColor: 'rgba(51, 65, 85, 0.7)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => {
            return `Price: ${currencyFormat(context.parsed.y, currency)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
          font: { size: 10 },
          maxTicksLimit: 8,
        },
      },
      y: {
        position: 'right',
        grid: {
          color: 'rgba(51, 65, 85, 0.25)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
          font: { size: 10 },
          callback: (value) => currencyFormat(value, currency),
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div className="glass-card p-5 md:p-6 relative overflow-hidden mb-6">
      {/* Chart Top Header & Timeframe Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-100 font-mono">
              {currencyFormat(lastPrice, currency)}
            </span>
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-lg ${
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {formatPercentage(priceChangePercentage)} ({currencyFormat(priceChange, currency)})
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Selected timeframe: {days === '1' ? 'Past 24 Hours' : `Past ${days} Days`}
          </span>
        </div>

        {/* Timeframe Selector Pills */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl self-start sm:self-auto">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.days}
              onClick={() => setDays(tf.days)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                days === tf.days
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 sm:h-80 w-full chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Range Statistics Bar */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50">
          <span className="text-slate-500 block text-[11px]">Period Low</span>
          <span className="font-bold text-slate-200 font-mono">
            {currencyFormat(minPrice, currency)}
          </span>
        </div>
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50">
          <span className="text-slate-500 block text-[11px]">Period High</span>
          <span className="font-bold text-slate-200 font-mono">
            {currencyFormat(maxPrice, currency)}
          </span>
        </div>
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50">
          <span className="text-slate-500 block text-[11px]">First Price</span>
          <span className="font-bold text-slate-200 font-mono">
            {currencyFormat(firstPrice, currency)}
          </span>
        </div>
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/50">
          <span className="text-slate-500 block text-[11px]">Price Trend</span>
          <span
            className={`font-bold font-mono ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositive ? 'Bullish Up' : 'Bearish Down'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HistoryChart;