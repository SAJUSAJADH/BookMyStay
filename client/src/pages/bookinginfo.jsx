import Footer from "../components/bodycomponents/footer";
import Accountnav from "../components/navbarcomponents/accountnav";
import Switches from "../components/navbarcomponents/switches";
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Middleware from "../Middleware/privateroutes";




export default function BookingInfo(){

    Middleware();

    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [showAllphotos, setShowAllphotos]= useState(false);

    useEffect(()=>{
        axios.get('/bookinghistory').then(response =>
            {
                const FoundBooking = response.data.find(({_id})=>_id === id);
                if(FoundBooking){
                    setBookings(FoundBooking)
                    console.log(FoundBooking)
                }else{
                    console.log('no data found')
                }
            })
    },[id])

    const showPhotos = ()=>{
        setShowAllphotos(!showAllphotos)
    }

    const Cancel = async ()=>{
        await axios.delete(`/cancel/${id}`).then(response=>{
            console.log(response.data)
            navigate('/account/booking');
        })
    }

    const formatDate = dateString => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
      }

    if(showAllphotos){
        return(
            <div className="bg-black">
            <div className="container mx-auto">
            <button onClick={showPhotos} className="absolute top-4 right-11 font-bold bg-slate-400 px-4 py-2 rounded-full text-white z-40"><CloseIcon/>Close</button>
            <div className="relative z-10">
                {bookings?.place?.photos?.length > 0 && bookings?.place?.photos?.map(photo=>{
                    return(
                            <div key={photo} className="w-full flex justify-center items-center py-2">
                                <img src={photo} alt="photos" className="w-full"/>
                            </div>)
                })}
                </div>
                </div>
            </div>
        )
    }


    return(
        <>
            <Accountnav/>
            <Switches/>
            <div className="container mx-auto p-6">
                <div className="flex justify-start mt-4 italic">
                    <h2 className="text-4xl font-semibold font-sans">{bookings?.place?.title}</h2>
                </div>
                <div className="flex justify-start my-2">
                    <p className="text-base font-semibold font-sans cursor-pointer"><StarIcon style={{fontSize:"large"}}/> 4.96 - <span className="underline">207 reviews - </span> <LocationOnIcon style={{fontSize:"large"}}/> <a target="_blank" href={'https://maps.google.com/?q='+bookings?.place?.address} className="underline"> {bookings?.place?.address}</a></p>
                </div>
                <div className="flex justify-start gap-3 my-2">
                    <div className="px-14 py-2 bg-slate-300 rounded">
                        <h2 className="text-2xl font-semibold italic">Booking Informations:</h2>
                        <p style={{fontSize:"medium"}} className="text-sm font-bold my-2"><CalendarMonthIcon/>{formatDate(bookings?.checkin)} --- <CalendarMonthIcon/>{formatDate(bookings?.checkout)} </p>
                        <p className="italic text-base font-semibold">Mobile No: {bookings?.phone}</p>
                        <p className="font-semibold text-base italic">Total amount paid: {bookings?.price+"$"}</p>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3">
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        <div className="relative  w-full h-full">
                            <img className="w-full h-full rounded-l" src={bookings?.place?.photos[0] && bookings?.place?.photos[0]} alt=''/>
                            <button onClick={showPhotos} className="absolute bottom-2 right-0 bg-slate-400 rounded-full px-2 py-2 font-semibold"><InsertPhotoIcon/> All photos</button>
                        </div>
                        <div className="grid grid-rows-2 gap-1">
                            <div className="w-full">
                                <img className="w-3/4 h-full rounded-r" src={bookings?.place?.photos[1] && bookings?.place?.photos[1]}/>
                            </div>
                            <div className="w-full">
                                <img className="w-3/4 h-full rounded-r" src={bookings?.place?.photos[2] && bookings?.place?.photos[2]}/>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="grid lg:grid-cols-3 mt-4">
                    <div className="col-span-2">
                        <h2 className="text-2xl italic font-semibold">Description</h2>
                        <p className="text-base italic">{bookings?.place?.description}</p>
                        <p className="text-base font-bold italic mt-2">Checkin: {bookings?.place?.checkin}</p>
                        <p className="text-base font-bold italic my-2">Checkout: {bookings?.place?.checkout}</p>
                        <p className="text-base font-bold italic mb-2">Maxguest: {bookings?.place?.maxguest}</p>
                        <p className="text-base font-bold italic mb-2">Price per Day: {bookings?.place?.price}$</p>
                        <p className="italic text-base">Important Notes: The information provided on our hotel booking website is intended for general informational purposes only. While we strive to ensure the accuracy and reliability of the information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics displayed on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>
                        <h2 className="text-2xl italic mt-4 font-semibold">Extra Info</h2>
                        <p className="text-base italic mt-2">{bookings?.place?.extrainfo}</p>
                        <h2 className="text-2xl italic mt-4 font-semibold">Features</h2>
                        {bookings?.place?.features?.length > 0 && bookings?.place?.features.map((feature,index) => (
                                <div key={index} className="py-2  px-2" style={{display:"inline"}}>
                                    <label htmlFor='featured' className="font-bold px-1">{feature.toUpperCase()}</label>
                                    <input type="checkbox" id="featured" checked readOnly/>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="mt-4">
                    <button onClick={Cancel} className="bg-lightblue w-full text-white font-bold rounded py-2 hover:bg-red-600 ">Cancel Booking</button>
                </div>
            </div>
            
        </>
    )
}