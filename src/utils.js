// Multi-Currency Symbol Map
export const CURRENCIES = {
  usd: { code: 'usd', symbol: '$', name: 'US Dollar', rateMultiplier: 1 },
  eur: { code: 'eur', symbol: '€', name: 'Euro', rateMultiplier: 0.92 },
  gbp: { code: 'gbp', symbol: '£', name: 'British Pound', rateMultiplier: 0.79 },
  inr: { code: 'inr', symbol: '₹', name: 'Indian Rupee', rateMultiplier: 83.5 },
  jpy: { code: 'jpy', symbol: '¥', name: 'Japanese Yen', rateMultiplier: 155.0 },
  aud: { code: 'aud', symbol: 'A$', name: 'Australian Dollar', rateMultiplier: 1.52 },
  cad: { code: 'cad', symbol: 'C$', name: 'Canadian Dollar', rateMultiplier: 1.37 },
};

/**
 * Formats a number as a currency string with appropriate decimals
 */
export function currencyFormat(num, currencyCode = 'usd') {
  if (num === undefined || num === null || isNaN(num)) return '$0.00';
  
  const curr = CURRENCIES[currencyCode.toLowerCase()] || CURRENCIES.usd;
  const symbol = curr.symbol;
  
  const abs = Math.abs(num);
  let formatted = '';
  
  if (abs === 0) {
    formatted = '0.00';
  } else if (abs < 0.000001) {
    formatted = num.toExponential(4);
  } else if (abs < 0.01) {
    formatted = num.toFixed(6);
  } else if (abs < 1) {
    formatted = num.toFixed(4);
  } else if (abs < 10000) {
    formatted = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    formatted = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  
  return `${num < 0 ? '-' : ''}${symbol}${formatted}`;
}

/**
 * Formats large market caps or volumes into compact notations like $1.45B, $23.1M
 */
export function formatCompactNumber(num, currencyCode = 'usd') {
  if (num === undefined || num === null || isNaN(num)) return '$0';
  
  const curr = CURRENCIES[currencyCode.toLowerCase()] || CURRENCIES.usd;
  const symbol = curr.symbol;
  const abs = Math.abs(num);
  
  let formatted = '';
  let suffix = '';
  
  if (abs >= 1e12) {
    formatted = (num / 1e12).toFixed(2);
    suffix = 'T';
  } else if (abs >= 1e9) {
    formatted = (num / 1e9).toFixed(2);
    suffix = 'B';
  } else if (abs >= 1e6) {
    formatted = (num / 1e6).toFixed(2);
    suffix = 'M';
  } else if (abs >= 1e3) {
    formatted = (num / 1e3).toFixed(2);
    suffix = 'K';
  } else {
    formatted = num.toFixed(2);
  }
  
  return `${symbol}${formatted}${suffix}`;
}

/**
 * Formats percentage change with leading + or -
 */
export function formatPercentage(num) {
  if (num === undefined || num === null || isNaN(num)) return '0.00%';
  const sign = num > 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
}

/**
 * Truncate long text
 */
export function truncate(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}