// Use ES6 imports
import { GoogleGenerativeAI } from "@google/generative-ai";
import { apiKey } from "@/PrivateApi";
 // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

// Start a chat session
export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: `Generate Travel Plan for Location: Dehradun, for 3 days for Couple with a cheap budget,
                    Give me a Hotels options list with HotelName, Hotel address, price, hotel image url, geo coordinates, 
                    ratings, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, 
                    Geo coordinates, Ticket Pricing, time to travel each of the location for 3 days with each day 
                    plan with best time to visit in JSON format`,
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: `{
                        "hotelOptions": [
                            {
                                "hotelName": "Hotel The Grand Dehradun",
                                "hotelAddress": "12, Rajpur Road, Dehradun, Uttarakhand 248001",
                                "price": "₹1500 - ₹3000",
                                "hotelImageUrl": "https://www.oyorooms.com/hotels/hotel-the-grand-dehradun-dehradun-uttarakhand/110276/images/hotel-exterior-1641855403",
                                "geoCoordinates": "30.3175, 78.0407",
                                "ratings": 4.0,
                                "description": "A well-maintained hotel offering comfortable rooms and basic amenities at an affordable price."
                            },
                            {
                                "hotelName": "The Golden Palms Resort",
                                "hotelAddress": "55, Sahastradhara Road, Dehradun, Uttarakhand 248001",
                                "price": "₹2000 - ₹4000",
                                "hotelImageUrl": "https://www.tripadvisor.com/Tourism-g304551-Dehradun-Hotels-g1-Dehradun_Hotels.html",
                                "geoCoordinates": "30.3159, 78.0244",
                                "ratings": 3.5,
                                "description": "A budget-friendly resort with a swimming pool and lush green surroundings."
                            },
                            {
                                "hotelName": "Hotel The Manu Maharani",
                                "hotelAddress": "40, Paltan Bazaar, Dehradun, Uttarakhand 248001",
                                "price": "₹1000 - ₹2500",
                                "hotelImageUrl": "https://www.makemytrip.com/hotels/hotel-the-manu-maharani-dehradun/dehradun/hotel-details-295894",
                                "geoCoordinates": "30.3209, 78.0424",
                                "ratings": 4.5,
                                "description": "A centrally located hotel with clean and comfortable rooms."
                            }
                        ],
                        "itinerary": [
                            {
                                "day": "Day 1",
                                "plan": [
                                    {
                                        "time": "Morning (8:00 AM - 12:00 PM)",
                                        "placeName": "Tapkeshwar Temple",
                                        "placeDetails": "A beautiful temple dedicated to Lord Shiva.",
                                        "placeImageUrl": "https://www.holidify.com/images/cmsuploads/2018/04/Tapkeshwar-Temple.jpg",
                                        "geoCoordinates": "30.3366, 78.0399",
                                        "ticketPricing": "Free",
                                        "timeToTravel": "1 hour"
                                    },
                                    // More places for Day 1...
                                ]
                            },
                            // More days...
                        ]
                    }`,
                },
            ],
        },
    ],
});
