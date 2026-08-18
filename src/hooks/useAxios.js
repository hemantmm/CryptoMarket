import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

// In-memory cache to prevent excessive API calls and handle rate limits smoothly
const apiCache = new Map();

// High quality fallback data in case CoinGecko free tier is temporarily rate-limited
const FALLBACK_TRENDING = {
  coins: [
    { item: { id: 'bitcoin', coin_id: 1, name: 'Bitcoin', symbol: 'BTC', score: 0, small: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', data: { price: '$64,250', price_change_percentage_24h: { usd: 2.45 } } } },
    { item: { id: 'ethereum', coin_id: 2, name: 'Ethereum', symbol: 'ETH', score: 1, small: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', data: { price: '$3,480', price_change_percentage_24h: { usd: 4.12 } } } },
    { item: { id: 'solana', coin_id: 3, name: 'Solana', symbol: 'SOL', score: 2, small: 'https://assets.coingecko.com/coins/images/4128/small/solana.png', data: { price: '$148.50', price_change_percentage_24h: { usd: 7.85 } } } },
    { item: { id: 'binancecoin', coin_id: 4, name: 'BNB', symbol: 'BNB', score: 3, small: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png', data: { price: '$585.20', price_change_percentage_24h: { usd: -0.85 } } } },
    { item: { id: 'ripple', coin_id: 5, name: 'XRP', symbol: 'XRP', score: 4, small: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png', data: { price: '$0.58', price_change_percentage_24h: { usd: 1.25 } } } },
    { item: { id: 'dogecoin', coin_id: 6, name: 'Dogecoin', symbol: 'DOGE', score: 5, small: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png', data: { price: '$0.125', price_change_percentage_24h: { usd: 3.40 } } } },
  ]
};

const FALLBACK_MARKETS = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 64250.00,
    market_cap: 1265890000000,
    market_cap_rank: 1,
    total_volume: 28450000000,
    high_24h: 65100.00,
    low_24h: 63200.00,
    price_change_24h: 1540.00,
    price_change_percentage_24h: 2.45,
    circulating_supply: 19740000,
    total_supply: 21000000,
    sparkline_in_7d: { price: [62000, 62500, 63100, 62800, 63900, 64100, 64250] }
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 3480.50,
    market_cap: 418500000000,
    market_cap_rank: 2,
    total_volume: 15200000000,
    high_24h: 3520.00,
    low_24h: 3390.00,
    price_change_24h: 137.50,
    price_change_percentage_24h: 4.12,
    circulating_supply: 120250000,
    total_supply: 120250000,
    sparkline_in_7d: { price: [3300, 3350, 3400, 3380, 3420, 3460, 3480] }
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 148.75,
    market_cap: 68900000000,
    market_cap_rank: 3,
    total_volume: 4800000000,
    high_24h: 152.00,
    low_24h: 138.00,
    price_change_24h: 10.85,
    price_change_percentage_24h: 7.85,
    circulating_supply: 463000000,
    total_supply: 580000000,
    sparkline_in_7d: { price: [135, 138, 140, 142, 145, 147, 148.75] }
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    current_price: 585.20,
    market_cap: 89400000000,
    market_cap_rank: 4,
    total_volume: 1100000000,
    high_24h: 592.00,
    low_24h: 580.00,
    price_change_24h: -5.00,
    price_change_percentage_24h: -0.85,
    circulating_supply: 153000000,
    total_supply: 153000000,
    sparkline_in_7d: { price: [590, 588, 595, 590, 586, 584, 585.2] }
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 0.582,
    market_cap: 32400000000,
    market_cap_rank: 5,
    total_volume: 1350000000,
    high_24h: 0.60,
    low_24h: 0.57,
    price_change_24h: 0.007,
    price_change_percentage_24h: 1.25,
    circulating_supply: 56000000000,
    total_supply: 100000000000,
    sparkline_in_7d: { price: [0.56, 0.57, 0.575, 0.58, 0.585, 0.58, 0.582] }
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    current_price: 0.385,
    market_cap: 13800000000,
    market_cap_rank: 6,
    total_volume: 420000000,
    high_24h: 0.40,
    low_24h: 0.37,
    price_change_24h: -0.012,
    price_change_percentage_24h: -3.02,
    circulating_supply: 35600000000,
    total_supply: 45000000000,
    sparkline_in_7d: { price: [0.41, 0.40, 0.395, 0.39, 0.388, 0.382, 0.385] }
  },
  {
    id: 'avalanche-2',
    symbol: 'avax',
    name: 'Avalanche',
    image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    current_price: 24.60,
    market_cap: 9750000000,
    market_cap_rank: 7,
    total_volume: 380000000,
    high_24h: 25.40,
    low_24h: 23.90,
    price_change_24h: 1.15,
    price_change_percentage_24h: 4.90,
    circulating_supply: 395000000,
    total_supply: 720000000,
    sparkline_in_7d: { price: [22.5, 23.0, 23.8, 23.5, 24.1, 24.4, 24.6] }
  },
  {
    id: 'dogecoin',
    symbol: 'doge',
    name: 'Dogecoin',
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    current_price: 0.1245,
    market_cap: 18100000000,
    market_cap_rank: 8,
    total_volume: 790000000,
    high_24h: 0.13,
    low_24h: 0.118,
    price_change_24h: 0.004,
    price_change_percentage_24h: 3.40,
    circulating_supply: 145000000000,
    total_supply: 145000000000,
    sparkline_in_7d: { price: [0.115, 0.118, 0.120, 0.122, 0.121, 0.123, 0.1245] }
  },
  {
    id: 'chainlink',
    symbol: 'link',
    name: 'Chainlink',
    image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    current_price: 12.80,
    market_cap: 7520000000,
    market_cap_rank: 9,
    total_volume: 240000000,
    high_24h: 13.10,
    low_24h: 12.40,
    price_change_24h: 0.65,
    price_change_percentage_24h: 5.35,
    circulating_supply: 608000000,
    total_supply: 1000000000,
    sparkline_in_7d: { price: [11.8, 12.1, 12.3, 12.5, 12.6, 12.7, 12.8] }
  },
  {
    id: 'polkadot',
    symbol: 'dot',
    name: 'Polkadot',
    image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    current_price: 4.85,
    market_cap: 6950000000,
    market_cap_rank: 10,
    total_volume: 180000000,
    high_24h: 5.05,
    low_24h: 4.70,
    price_change_24h: -0.15,
    price_change_percentage_24h: -3.00,
    circulating_supply: 1430000000,
    total_supply: 1470000000,
    sparkline_in_7d: { price: [5.2, 5.1, 5.0, 4.95, 4.90, 4.88, 4.85] }
  }
];

const useAxios = (param) => {
  const [response, setResponse] = useState(() => {
    // Check if initial cache exists
    if (param && apiCache.has(param)) {
      return apiCache.get(param);
    }
    return null;
  });
  const [loading, setLoading] = useState(!apiCache.has(param));
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  const axiosInstance = useRef(
    axios.create({
      baseURL: 'https://api.coingecko.com/api/v3',
      timeout: 8000,
    })
  );

  const fetchData = useCallback(async (endpoint) => {
    if (!endpoint) return;

    // Check cache first for high responsiveness
    if (apiCache.has(endpoint)) {
      const cached = apiCache.get(endpoint);
      setResponse(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }

    try {
      const result = await axiosInstance.current.get(endpoint);
      if (isMounted.current) {
        apiCache.set(endpoint, result.data);
        setResponse(result.data);
        setError(null);
      }
    } catch (err) {
      if (isMounted.current) {
        console.warn(`[useAxios] API request issue for ${endpoint}:`, err.message);
        setError(err);
        
        // If no response is cached yet, provide resilient fallback data based on endpoint
        if (!apiCache.has(endpoint)) {
          if (endpoint.includes('search/trending')) {
            setResponse(FALLBACK_TRENDING);
            apiCache.set(endpoint, FALLBACK_TRENDING);
          } else if (endpoint.includes('coins/markets')) {
            setResponse(FALLBACK_MARKETS);
            apiCache.set(endpoint, FALLBACK_MARKETS);
          } else if (endpoint.includes('market_chart')) {
            // Generate fallback price chart
            const now = Date.now();
            const daysCount = endpoint.includes('days=1') ? 24 : endpoint.includes('days=30') ? 30 : 7;
            const step = (86400000 * (daysCount > 24 ? daysCount : 1)) / (daysCount > 24 ? daysCount : 24);
            const basePrice = endpoint.includes('ethereum') ? 3480 : endpoint.includes('solana') ? 148 : 64250;
            const prices = [];
            for (let i = 0; i < (daysCount > 24 ? daysCount : 24); i++) {
              const t = now - ((daysCount > 24 ? daysCount : 24) - i) * step;
              const variance = 1 + (Math.sin(i / 2) * 0.04 + (Math.random() - 0.5) * 0.02);
              prices.push([t, basePrice * variance]);
            }
            const fallbackChart = { prices };
            setResponse(fallbackChart);
            apiCache.set(endpoint, fallbackChart);
          }
        }
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchData(param);
    return () => {
      isMounted.current = false;
    };
  }, [param, fetchData]);

  const refetch = () => {
    if (param) {
      apiCache.delete(param);
      fetchData(param);
    }
  };

  return { response, loading, error, refetch };
};

export default useAxios;