export const states = {
    "Andhra Pradesh": ["Amaravati", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
    "Assam": ["Dispur", "Guwahati", "Dibrugarh", "Silchar"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
    "Gujarat": ["Gandhinagar", "Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Haryana": ["Chandigarh", "Faridabad", "Gurugram", "Panipat"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Manipur": ["Imphal", "Bishnupur", "Churachandpur", "Thoubal"],
    "Meghalaya": ["Shillong", "Tura", "Cherrapunji", "Nongpoh"],
    "Mizoram": ["Aizawl", "Lunglei", "Serchhip", "Champhai"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    "Sikkim": ["Gangtok", "Pelling", "Namchi", "Geyzing"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh"],
    "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Asansol"]
  };

export const SelectTravelCompanion = [
  {
    id:1,
    title:"just me",
    desc:"A sole travels in exploration",
    icon:"✌️",
    people:'1'
  },
  {
    id:2,
    title:"A couple",
    desc:"Two travels in tandem",
    icon:"🥂",
    people:'2 people'
  },
  {
    id:3,
    title:"Family",
    desc:"A group of fun loving adv",
    icon:"👪",
    people:'5-6 people'
  },{
    id:4,
    title:"Friends",
    desc:"A Bunch of thrill seeks",
    icon:"🎉",
    people:'9-10 people'
  }
]

export const SelectBudgetOptions = [
  {
   id:1,
   title:'Cheap',
   desc:'Stay conscious of costs',
   icon:'💶'

  },
  {
    id:2,
   title:'Moderate',
   desc:'Keep cost on the average side',
   icon:'💸'

  },
  {
    id:3,
   title:'Luxury',
   desc:'Have a luxurious visit',
   icon:'💰'

  },
]

export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {days} days for a {travelCompanion}  with a {budget} budget , Give me a Hotels options list with HotelName , Hotel address, price, hotel image url  , geo coordinates , ratings , descriptions and suggest itinerary with placeName , Place Details, Place Image Url , Geo coordinates , Ticket Pricing , time to travel each of the location for {days} days with each day plan with best time to visit in JSON format`