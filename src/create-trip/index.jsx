import { useState } from 'react';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelCompanion, states } from '@/constants/Options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/services/AIModel';
import { VITE_GOOGLE_PLACE_API_KEY } from '@/PrivateApi';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [formData, setFormData] = useState({
    place: '',
    days: '',
    budget: '',
    travelCompanion: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate number of days
    if (name === 'days') {
      const daysValue = parseInt(value, 10);
      if (isNaN(daysValue) || daysValue < 1 || daysValue > 6) {
        return; // Prevent invalid values for days
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle place selection from Google Places Autocomplete
  const handlePlaceChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      place: value.label // Update with selected place
    }));
  };

  // Handle budget and travel companion selection
  const handleOptionClick = (type, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: value
    }));
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => {
      console.error(error);
      toast.error("Google login failed. Please try again.");
    }
  });

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }
  
    // Ensure form data is logged for debugging
    console.log("Form Data before validation:", formData);
  
    // Check for missing fields
    if (!formData.place || !formData.days || !formData.budget || !formData.travelCompanion) {
      toast.error("Please fill in all fields before generating your trip.");
      return;
    }
  
    setLoading(true);
  
    // Construct final prompt
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.place)
      .replace('{days}', formData?.days)
      .replace('{travelCompanion}', formData?.travelCompanion)
      .replace('{budget}', formData?.budget) + " Please provide more than 6 hotel options and make sure to get minimum 2 places to visit for every day";
  
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("Generated Trip Data:", result?.response?.text());
      
      setLoading(false);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
      setLoading(false); // Stop the loading spinner on error
    }
  };
  
  const SaveAiTrip = async(TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user.email,
      id: docId
    });
    
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json'
        }
      });
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      handleGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6">
      <h2 className="font-bold text-2xl sm:text-3xl mb-2">Tell us your travel preferences🌴⛰️</h2>
      <p className="text-gray-500 text-base sm:text-lg md:text-xl mb-6">
        Just provide some basic information, and our trip planner will generate the best itineraries for you.
      </p>

      <div className="space-y-8">
        {/* Destination Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-medium mb-3">What is the destination of choice?</h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination of choice</label>
          <div className="w-full">
            <GooglePlacesAutocomplete
              apiKey={VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                value: formData.place ? { label: formData.place, value: formData.place } : null,
                onChange: handlePlaceChange,
                placeholder: "Enter a place",
                styles: {
                  control: (provided) => ({
                    ...provided,
                    borderColor: '#e5e7eb',
                    borderRadius: '0.5rem',
                    minHeight: '42px',
                  }),
                  menu: (provided) => ({
                    ...provided,
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  })
                }
              }}
            />
          </div>
        </div>

        {/* Days Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            How many days are you planning for your trip:
          </label>
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter number of days (1-6)"
            min="1"
            max="6"
          />
        </div>

        {/* Budget Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h2 className="block text-lg font-medium text-gray-700 mb-4">What is your Budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick('budget', item.title)}
                className={`p-4 border hover:cursor-pointer rounded-lg transition-all hover:shadow-md ${
                  formData?.budget === item.title 
                    ? 'shadow-lg border-black bg-gray-50' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companion Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h2 className="block text-lg font-medium text-gray-700 mb-4">Who do you plan to travel with on your next adventure?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {SelectTravelCompanion.map((item, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick('travelCompanion', item.title)}
                className={`p-4 border hover:cursor-pointer rounded-lg transition-all hover:shadow-md ${
                  formData?.travelCompanion === item.title 
                    ? 'shadow-lg border-black bg-gray-50' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="mt-8 flex justify-center sm:justify-end">
        <Button 
          onClick={handleGenerateTrip} 
          disabled={loading}
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              <span>Generating...</span>
            </span>
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Login Required</DialogTitle>
            <DialogDescription className="text-gray-500 mt-2 mb-4">
              You need to log in to generate a trip.
            </DialogDescription>
            <Button 
              onClick={() => login()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-300"
            >
              <FcGoogle className="text-xl" />
              <span>Login with Google</span>
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;