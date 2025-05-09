import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/services/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';


function MyTrips() {

  
const navigation = useNavigation(); 

const[userTrips,setUserTrips] = useState([]);

useEffect(()=>{
  GetUserTrips();
},[])

const GetUserTrips = async()=>{
  const user = JSON.parse(localStorage.getItem('user'));
 
  if(!user){
    navigation('/');
    return;
  }
  
  const q = query (collection(db,'AITrips'),where('userEmail','==',user?.email));
  const querySnapshot = await getDocs(q);
      
  setUserTrips([]);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prevVal=>[...prevVal,doc.data()])
      });

}

    return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h2 className='font-bold text-3xl mb-6 text-center sm:text-left'>My Trips</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
        {userTrips.length > 0 ? userTrips.map((trip, index) => (
          <div className='w-full' key={index}>
            <UserTripCardItem trip={trip} />
          </div>
        )) : 
        [1,2,3,4,5,6].map((item, index) => (
          <div 
            key={index} 
            className='h-[200px] w-full bg-slate-200 animate-pulse rounded-xl 
                     shadow-sm hover:shadow-md transition-shadow duration-300'
          ></div>
        ))
        }
      </div>
    </div>
  )
}

export default MyTrips