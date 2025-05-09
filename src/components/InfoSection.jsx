/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaShare } from "react-icons/fa6";
import { GetPlaceDetails } from '@/services/globalAPI';
import { PHOTO_REF_URL } from '@/services/globalAPI';
function InfoSection({ trip }) {

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
  


  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Trip to ${trip?.userSelection?.place}`,
        text: `I'm planning a ${trip?.userSelection?.days} days trip to ${trip?.userSelection?.query}. Budget: ${trip?.userSelection?.budget}. Want to join?`,
        url: window.location.href,  // URL to share (can be current page or specific)
      })
      .then(() => console.log('Share successful!'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Your browser does not support the Web Share API. Please manually share this URL.');
    }
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero Image */}
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] mb-6">
        <img 
          src={photoUrl} 
          alt={trip?.userSelection?.place || 'Destination'} 
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {/* Location Title */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {trip?.userSelection?.place}
            </h1>
            <h2 className="text-xl sm:text-2xl text-gray-600">
              {trip?.userSelection?.query}
            </h2>
          </div>
          <Button 
            onClick={handleShare}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-black hover:bg-gray-700"
          >
            <FaShare className="w-4 h-4" />
            <span className="hidden sm:inline">Share Trip</span>
          </Button>
        </div>

        {/* Trip Details */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
            <span className="mr-2">📆</span>
            <span className="text-sm sm:text-base text-gray-700">
              {trip?.userSelection?.days} Days
            </span>
          </div>
          <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
            <span className="mr-2">💰</span>
            <span className="text-sm sm:text-base text-gray-700">
              {trip?.userSelection?.budget} Budget
            </span>
          </div>
          <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
            <span className="mr-2">🎉</span>
            <span className="text-sm sm:text-base text-gray-700">
              {trip?.userSelection?.travelCompanion}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
