import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { GetPlaceDetails } from '@/services/globalAPI';
import { PHOTO_REF_URL } from '@/services/globalAPI';

function PlaceCardItem({place}) {
  const [photoUrl, setPhotoUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = { textQuery: place?.placeName };
      const result = await GetPlaceDetails(data);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error("Error fetching place details:", error.response?.data || error.message);
      setError("Failed to load image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`}
      target='_blank'
      className="block hover:no-underline"
    >
      <div className='group border rounded-xl p-4 transition-all duration-300
                      hover:shadow-lg hover:border-blue-200 bg-white'>
        <div className='flex flex-col sm:flex-row gap-4'>
          {/* Image Container */}
          <div className='relative w-full sm:w-[150px] h-[120px] rounded-xl overflow-hidden'>
            {isLoading ? (
              <div className="animate-pulse bg-gray-200 w-full h-full rounded-xl" />
            ) : error ? (
              <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-xl">
                <span className="text-gray-400 text-sm">Image unavailable</span>
              </div>
            ) : (
              <img 
                src={photoUrl} 
                alt={place?.placeName || "Place image"}
                className='w-full h-full object-cover rounded-xl transition-transform duration-300
                         group-hover:scale-105'
              />
            )}
          </div>

          {/* Content Container */}
          <div className='flex-1 space-y-2'>
            <h2 className='font-bold text-lg text-gray-900 line-clamp-1'>
              {place.placeName}
            </h2>
            <p className='text-sm text-gray-600 line-clamp-2'>
              {place.placeDetails}
            </p>
            <div className='flex items-center gap-2 text-gray-700'>
              <span className="text-lg">⏰</span>
              <span className='text-sm'>{place.timeToTravel}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem