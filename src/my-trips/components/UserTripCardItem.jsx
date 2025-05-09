import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { GetPlaceDetails } from '@/services/globalAPI';
import { PHOTO_REF_URL } from '@/services/globalAPI';





function UserTripCardItem({trip}) {

  const [photoUrl,setPhotoUrl]= useState();
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])
  

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.place // The place query from user selection
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
    <Link to={`/view-trip/${trip.id}`}>
    <div className='mt-5 hover:scale-105 transition-all '>
        <img className='object-cover rounded-xl h-[220px] w-[350px] ' src={photoUrl} alt=""  />
        <div>
            <h2 className='font-bold text-lg'>{trip.userSelection.place}</h2>
            <h2 className='text-sm text-gray-500'>{trip.userSelection.days} days trip with a {trip.userSelection.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem