import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { GetPlaceDetails } from '@/services/globalAPI';
import { PHOTO_REF_URL } from '@/services/globalAPI';

function HotelCardItem({item}) {


    const [photoUrl,setPhotoUrl]= useState();
  useEffect(()=>{
    item&&GetPlacePhoto();
  },[item])
  

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: item?.hotelName // The place query from user selection
    };
  
    try {
      const result = await GetPlaceDetails(data); // Pass `data` to the function
      console.log(result.data.places[0].photos[3].name);
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    } catch (error) {
    
      console.error("Error fetching place details:", error.response?.data || error.message);
    }
  };

  return (
    <Link  to= {`https://www.google.com/maps/search/?api=1&query=${item?.hotelName} , ${item?.hotelAddress}`} target='_blank'>
                    <div className='hover:scale-105 transition-all cursor-pointer '>
                        <img src={photoUrl} alt="" 
                        className='rounded-lg w-full h-40'
                        />
                        <div className='my-2 '>
                            <h2 className='font-medium'>{item.hotelName}</h2>
                            <h2 className='text-xs text-gray-500'>📍{item.hotelAddress}</h2>
                            <h2 className='text-sm'>💰{item.price} per night</h2>
                            <h2 className='text-sm'>⭐{item.ratings} stars</h2>
                        </div>
                    </div>
                    </Link>
  )
}

export default HotelCardItem