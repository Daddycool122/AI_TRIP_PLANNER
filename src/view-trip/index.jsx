import { getDoc } from 'firebase/firestore';
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { doc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import InfoSection from '@/components/InfoSection';
import Hotels from '@/components/Hotels';
import PlacesToVisit from '@/components/PlacesToVisit';
function  ViewTrip() {
    const {tripId}= useParams();
    const [trip,setTrip]=useState();
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
    const GetTripData =async()=>{
        const docRef = doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            console.log('Document:',docSnap.data());
            setTrip(docSnap.data());
            
        }
        else{
            console.log('no such document');
            toast('no trip found')
            
        }
    }
   return (
        <div className="min-h-screen bg-gray-50">
            {/* Main container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Information section */}
                <div className="bg-white rounded-lg shadow-sm">
                    <InfoSection trip={trip} />
                </div>

                {/* Recommended hotels */}
                <div className="bg-white rounded-lg shadow-sm">
                    <Hotels trip={trip} />
                </div>

                {/* Daily plans */}
                <div className="bg-white rounded-lg shadow-sm">
                    <PlacesToVisit trip={trip} />
                </div>
            </div>

            {/* Loading state */}
            {!trip && (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}
        </div>
    )
}

export default ViewTrip