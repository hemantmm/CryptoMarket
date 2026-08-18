import React, { useEffect } from 'react';
import CoinDetail from '../components/CoinDetail';
import HistoryChart from '../components/HistoryChart';

const CryptoDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="wrapper-container py-8">
      {/* Interactive Timeframe Chart */}
      <HistoryChart />
      
      {/* Deep Token Details, Stats, and Converter */}
      <CoinDetail />
    </main>
  );
};

export default CryptoDetail;