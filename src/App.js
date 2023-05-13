import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CryptoHome from './Pages/CryptoHome';
import CryptoDetail from './Pages/CryptoDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    {/* <h2 className='text-center'>hello</h2> */}
    <Router>
      {/* navbar */}
      <Navbar />
      <Routes>
        <Route path='/' element={<CryptoHome />} />
        <Route path='/coin/:id' element={<CryptoDetail />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
