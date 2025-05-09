import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip = { tripData: { itinerary: [] } } }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900">
        Places To Visit
      </h2>
      
      <div className="space-y-8">
        {Array.isArray(trip?.tripData?.itinerary) && trip.tripData.itinerary.length > 0 ? (
          trip.tripData.itinerary.map((item, index) => (
            <div key={index} className="space-y-4">
              {/* Day Heading */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.day}
                </h3>
              </div>

              {/* Places Grid */}
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {item.plan.map((place, placeIndex) => (
                  <div key={placeIndex} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="p-4">
                      <span className="inline-block px-3 py-1 mb-3 text-sm font-medium text-orange-600 bg-orange-50 rounded-full">
                        {place.time}
                      </span>
                      <PlaceCardItem place={place} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No itinerary available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;