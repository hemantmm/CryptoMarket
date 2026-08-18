import React, { useState } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { currencyFormat } from '../utils';

const CryptoConverter = ({ coinSymbol = 'BTC', coinName = 'Bitcoin', currentPrice = 0 }) => {
  const { currency, currencies } = useCrypto();
  const [cryptoAmount, setCryptoAmount] = useState('1');
  const [fiatAmount, setFiatAmount] = useState(
    currentPrice ? (1 * currentPrice).toFixed(2) : '0.00'
  );

  const handleCryptoChange = (e) => {
    const val = e.target.value;
    setCryptoAmount(val);
    if (!val || isNaN(val)) {
      setFiatAmount('');
    } else {
      setFiatAmount((parseFloat(val) * currentPrice).toFixed(2));
    }
  };

  const handleFiatChange = (e) => {
    const val = e.target.value;
    setFiatAmount(val);
    if (!val || isNaN(val) || !currentPrice) {
      setCryptoAmount('');
    } else {
      setCryptoAmount((parseFloat(val) / currentPrice).toFixed(6));
    }
  };

  const currSymbol = currencies[currency]?.symbol || '$';

  return (
    <div className="glass-card p-5 relative overflow-hidden">
      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
        <span>🔄 Instant Price Calculator</span>
      </h3>

      <div className="space-y-3">
        {/* Crypto Input */}
        <div>
          <label className="text-xs text-slate-400 font-medium mb-1 block">
            {coinName} ({coinSymbol.toUpperCase()})
          </label>
          <div className="relative">
            <input
              type="number"
              value={cryptoAmount}
              onChange={handleCryptoChange}
              placeholder="0.00"
              className="w-full pl-3 pr-16 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-mono text-slate-100 focus:outline-none focus:border-cyan-500 font-semibold"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
              {coinSymbol.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Fiat Input */}
        <div>
          <label className="text-xs text-slate-400 font-medium mb-1 block">
            {currencies[currency]?.name || 'US Dollar'} ({currency.toUpperCase()})
          </label>
          <div className="relative">
            <input
              type="number"
              value={fiatAmount}
              onChange={handleFiatChange}
              placeholder="0.00"
              className="w-full pl-7 pr-16 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-mono text-slate-100 focus:outline-none focus:border-cyan-500 font-semibold"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
              {currSymbol}
            </span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
              {currency.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-500 text-center">
        1 {coinSymbol.toUpperCase()} = {currencyFormat(currentPrice, currency)}
      </div>
    </div>
  );
};

export default CryptoConverter;
