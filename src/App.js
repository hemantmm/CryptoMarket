import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CryptoHome from './Pages/CryptoHome';
import CryptoDetail from './Pages/CryptoDetail';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

function App() {

  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  },[])

  return (
    <>
    {/* <h2 className='text-center'>hello</h2> */}
    {
      loading ?
      <div className='flex items-center h-screen justify-center'>
      <HashLoader color={'#D2181B'} loading={loading} size={50} />
      </div>
      :

    <Router>
      {/* navbar */}
      <Navbar />
      <Routes>
        <Route path='/' element={<CryptoHome />} />
        <Route path='/coin/:id' element={<CryptoDetail />} />
      </Routes>
    </Router>
}
    </>
  );
}

export default App;
