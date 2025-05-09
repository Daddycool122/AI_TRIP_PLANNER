/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex flex-col items-center">
      {/* Hero Text Content */}
      <div className="text-center w-full mb-8">
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
          <span className="text-orange-500">Discover your next adventure with AI:</span>
          <br className="hidden sm:block" />
          <span className="text-gray-800 mt-2 block">Personalized Itineraries at your fingertips</span>
        </h1>
        
        <p className="text-gray-500 text-base sm:text-lg md:text-xl mt-4 max-w-3xl mx-auto">
          Your dedicated travel planner and experience curator, crafting personalized itineraries that align with your preferences and budget.
        </p>
        
        <Link to="/create-trip" className="mt-8 inline-block">
          <Button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
            Get Started, It's Free
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="w-full mt-6 rounded-xl overflow-hidden shadow-lg">
        <img 
          src="/ABS.jpg" 
          alt="Travel Destinations" 
          className="w-full rounded-xl h-auto sm:h-64 md:h-80 lg:h-96 object-cover"
        />
      </div>
    </div>
  );
}

export default Hero;