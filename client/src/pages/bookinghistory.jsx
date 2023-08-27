import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Middleware from "../Middleware/privateroutes";





export default function Bookinghistory(){

    Middleware();


    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    
    

    useEffect(()=>{
        axios.get('/bookinghistory').then(response => {
            setBookings(response.data)
            
        })
    },[])

    const formatDate = dateString => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
      }

    return(
        <>
            <div className="container mx-auto">
            <div className="my-4 flex justify-center">
                <h2 className="font-bold italic text-4xl">Booking Histoy</h2>
            </div>
            {bookings.length === 0 ? 
            <>
                <div className="flex justify-center pt-8">
                    <h1 className="text-3xl font-bold italic text-gray-500 py-8">You Have No Bookings!</h1>
                </div> 
                <div className="flex justify-center text-center text-sm italic my-4 pt-16">
                    Desclaimer: We strongly recommend conducting regular inspections, addressing any necessary repairs or maintenance promptly, and ensuring that your property meets all necessary legal and safety standards.When guests make a reservation for your property through our website, a binding agreement is formed between you, as the property owner, and the guest.
                </div>
                </>:
                <div className="container mx-auto py-4">
                <div className="grid lg:grid-cols-3 justify-center ">
                    {bookings.map((booking,index)=>(
                        <div onClick={()=>{navigate(`/account/booking/${booking._id}`)}} key={index} className="cursor-pointer max-w-sm rounded overflow-hidden shadow-lg my-2">
                            <img className="w-full" src={booking.place.photos[0]} alt="Sunset in the mountains"/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{booking.place.title}</div>
                                <p className="text-gray-700 text-base font-bold">
                                Check-in Date: {formatDate(booking.checkin)}
                                </p>
                                <p className="text-gray-700 text-base font-bold">
                                Check-out Date: {formatDate(booking.checkout)}
                                </p>
                                <p className="text-gray-700 text-base font-bold">
                                Payment: {booking.price+"$"}
                                </p>
                            </div>
                            
                        </div>
                    ))}
                </div>
                </div>
            }
            </div>
        </>
    )
}