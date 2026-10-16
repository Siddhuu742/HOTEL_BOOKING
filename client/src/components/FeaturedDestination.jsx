import React from 'react'
import Hotelcard from './Hotelcard'
import Title from './Title'
import {useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const FeaturedDestination = () => {
  const {rooms,navigate} = useAppContext();
  
  return rooms.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 
    lg:px:-24 bg-slate-50 py-20'>
      
      <Title Title="Featured Destinations" subTitle="Discover our hand picked selection of exceptional properties around the world, offering unique luxury and unforgettable memories and experiences." />
      
      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
         {rooms.slice(0, 4).map((room, index) => (
            <Hotelcard key={room._id} room={room} index={index} />   
        ))}
      </div>

    <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}}
     className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
      view All Destinations
    </button>
    </div>
  )
}

export default FeaturedDestination
