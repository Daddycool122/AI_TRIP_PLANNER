import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
        Hotel Recommendations
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {trip?.tripData?.hotelOptions?.map((item, index) => (
          <div key={index} className="w-full">
            <HotelCardItem item={item} />
          </div>
        ))}
        
        {/* Loading state or empty state */}
        {!trip?.tripData?.hotelOptions && (
          <div className="col-span-full text-center py-8 text-gray-500">
            Loading hotel recommendations...
          </div>
        )}
      </div>
    </div>
  )
}

export default Hotels