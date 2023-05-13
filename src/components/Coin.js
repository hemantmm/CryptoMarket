import { Link, useNavigate } from "react-router-dom";
import { TrendingDown, TrendingUp } from "../icons/icons";
import { currencyFormat } from "../utils";
// import Trending from "./Trending";

const Coin = ({coin}) => {

    console.log(coin);
    // const navigate=useNavigate()

    // const handleChange=()=>{
    //   console.log('hi');
    //     navigate('/coins/coin.id')
    // }

  return (
   <Link to={`/coin/${coin.id}`}>
   <div className="grid grid-col-3 sm:grid-cols-4 font-medium p-2 rounded border-gray-200 border-b hover:bg-gray-200 cursor-pointer" 
  //  onClick={handleChange}
   >
      <div className="flex items-center gap-1 w-full">
        <img src={coin.image} alt={coin.name} className="w-6" />
        <p>{coin.name}</p>
        <span className="text-xs">({coin.symbol})</span>
      </div>
      <span className="w-full text-center">{currencyFormat(coin.current_price)}</span>
      <span className={`flex gap-1 ${coin.price_change_percentage_24h < 0 ? 'text-red-400': 'text-green-400'}`}>
        {/* {coin.price_change_percentage_24h < 0 ? <TrendingDown />:<TrendingUp />} */}
        {coin.price_change_percentage_24h < 0 ? <TrendingDown /> : <TrendingUp /> }
        {coin.price_change_percentage_24h}
      </span>
      {/* <span className="gap-1 text-blue-400">
         <h3 className="text-black">Market_cap in</h3>
        {`$`+coin.market_cap}
      </span> */}
      <div className="hidden sm:block">
        <p className="font-semibold">Market cap</p>
        <span>{currencyFormat(coin.market_cap)}</span>
      </div>
      {/* <span className="text-violet-600">
        <h3 className="text-gray-500">Total_volume</h3>
        {coin.total_volume}
      </span> */}
   </div>
   </Link>
    )
}

export default Coin