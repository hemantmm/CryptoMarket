import { useParams } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import { ScaleLoader } from 'react-spinners'
import { useEffect, useState } from 'react'

const CoinDetail = () => {

    const {id}=useParams()

    const {response}=useAxios(`coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`)
    // console.log(response);

    const [loading,setLoading]=useState(false)
    useEffect(()=>{
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 5000);
    },[])

    if(!response)
    {
        return (
          <>
          {/* <div>Loading...</div> */}
        <div className='flex items-center h-screen justify-center '>
          <ScaleLoader color={'#D2181B'} loading={loading} size={50} />
        </div>
        </>
        )
    }

  return (
    <div className='my-6'>
        <div className='flex gap-2 items-center'>
            <img src={response.image.small} alt={response.name} />
            <h1 className='text-2xl mb-2 capitalize font-bold'>{response.name}</h1>
        </div>
            <p className='mt-6 text-gray-500 [&>a]:text-blue-600 [&>a]:underline' dangerouslySetInnerHTML={{__html:response.description.en}}></p>

    </div>
  )
}

export default CoinDetail