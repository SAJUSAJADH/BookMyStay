import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/bodycomponents/footer";
import Accountnav from "../components/navbarcomponents/accountnav";
import Switches from "../components/navbarcomponents/switches";
import React, {useState,useEffect, useContext} from 'react';
import axios from 'axios'
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from "../contextprovider/usercontext";
import Nav from "../components/navbarcomponents/nav";


export default function Bookplace(){

    const {id} = useParams();
    const [place, setPlace] = useState(null);
    const [checkin,setCheckin] = useState('');
    const [checkout,setCheckout] = useState('');
    const [maxguest,setMaxguest] = useState('1');
    const [name,setName] = useState('');
    const [mobile,setMobile] = useState('');
    const [Days,setDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showAllphotos, setShowAllphotos]= useState(false);
    const [Favourite, setFavourite] = useState(false);
    const [paymentMode, setPaymentmode] = useState(false);
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

   const makeFavourite = ()=>{
    setFavourite(!Favourite);
   }

   

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`/book/${id}`).then(response=>{
            setPlace(response.data);
        })
    },[id])

    useEffect(() => {
        const calculateTotalPrice = () => {
          if (place && place.price && Days > 0) {
            return Days * place.price;
          }
          return 0;
        };
    
        setTotalPrice(calculateTotalPrice());
      }, [place, Days]);

    if(!place) return'';

    const checkins = (ev) => {
        setCheckin(ev.target.value);
        calculateDateDifference(ev.target.value, checkout);
      };
      
      const checkouts = (ev) => {
       if(checkin){setCheckout(ev.target.value);
        calculateDateDifference(checkin, ev.target.value);
    }if(Days> 0 && place){
        setTotalPrice(Days*place.price);
        
      }
      };
      
      const calculateDateDifference = (checkinDate, checkoutDate) => {
        const startDate = new Date(checkinDate);
        const endDate = new Date(checkoutDate);
        const differenceInMilliseconds = endDate - startDate;
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        if(checkoutDate){
            setDays(differenceInDays+1);
        }   
      };

      const showPhotos = ()=>{
        setShowAllphotos(!showAllphotos)
    }

    const DoPayment = ()=>{
        setPaymentmode(!paymentMode)
    }

    


    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-0${month}-${day}`;

    if(showAllphotos){
        return(
            <div className="bg-black">
            <div className="container mx-auto">
            <button onClick={showPhotos} className="absolute top-4 right-11 font-bold bg-slate-400 px-4 py-2 rounded-full text-white z-40"><CloseIcon/>Close</button>
            <div className="relative z-10">
                {place.photos?.length > 0 && place.photos?.map(photo=>{
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

    if(paymentMode){
        const BookNow = async()=>{
           try{
            const data = {checkin,checkout,maxguest,name,mobile,price:Math.floor(totalPrice+(25*totalPrice)/100),place:place._id}
            if(checkin.trim()==='' || checkout.trim()==='' || name.trim()==='' || mobile.trim() === ''){
                alert('Please fill in all fields.');
            return;
            }else{
                if(!user){
                    navigate('/signin');
                }else{
                    const res = await axios.post('/booknow', data);
                    //console.log(res.data)
                    const bookingId = res.data._id;
                    navigate(`/account/booking`);
                }
            }
                
            }catch(e){
                //console.log(e)
            }
        }
        return(
            <>
                <div className="w-full px-4 text-2xl bg-blue py-2 text-white font-bold">Powered By <br/>SECURE PAY</div>
                <div className="container mx-auto justify-center items-center flex">
                <div className="flex items-center justify-center mt-12 flex-col w-2/4">
                <div className="mb-4 w-3/4 inline-block justify-center">
                    <label htmlFor="checkin" className="block text-gray-600">Check-In Date:</label>
                    <input  value={checkin} onChange={checkins} type="date" id="checkin date" name="checkin" required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" min={currentDate} max={checkout} />
                </div>
                <div className="mb-4 w-3/4 inline-block justify-center">
                    <label htmlFor="checkout" className="block text-gray-600">Check-Out Date:</label>
                    <input  disabled={!checkin} value={checkout} onChange={checkouts} type="date" id="checkout date" name="checkout" required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" min={checkin}  />
                </div>
                <div className="mb-4 w-3/4 inline-block justify-center">
                    <label htmlFor="numDays" className="block text-gray-600">Number of Days:</label>
                    <input value={Days} type="number" id="numDays" name="numDays" required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" readOnly/>
                </div>
                <div className="mb-4 w-3/4 inline-block justify-center">
                    <label htmlFor="name" className="block text-gray-600">Name:</label>
                    <input id="name" autoComplete="off" value={name} onChange={ev=> setName(ev.target.value)} type="text"  name="name" required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" />
                </div>
                <div className="mb-4 w-3/4 inline-block justify-center">
                    <label htmlFor="mobile" className="block text-gray-600">Mobile:</label>
                    <input id="phone mobile" value={mobile} onChange={ev=> setMobile(ev.target.value)} type="tel"  name="mobile" required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" autoComplete="off"/>
                </div>
                <div className="mb-4 w-3/4 inline-block justify-center">
                    <label htmlFor="mobile" className="block text-gray-600">Total:</label>
                    <input value={totalPrice+"$ (including all taxes)"} onChange={ev=> setTotalPrice(ev.target.value)} type="tel" id="mobile" name="mobile" required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" autoComplete="off"/>
                </div>
                <button onClick={BookNow} type="submit" className="w-2/4 py-2 px-4 bg-blue-500 text-white bg-lightblue font-semibold rounded hover:bg-blue-600 transition duration-300">Pay Now</button>
                </div>
                </div>
                <Footer/>
            </>
        )}
   


    return(
        <>
            {!user ? <Nav/> : <Accountnav/>}
            <Switches/>
            <div className="container mx-auto p-6">
                <div className="flex justify-start mt-4 italic">
                    <h2 className="text-4xl font-semibold font-sans">{(place.title).toUpperCase()}</h2>
                </div>
                <div className="flex justify-start my-2">
                    <p className="text-base font-semibold font-sans cursor-pointer"><StarIcon style={{fontSize:"large"}}/> 4.96 - <span className="underline">207 reviews - </span> <LocationOnIcon style={{fontSize:"large"}}/> <a target="_blank" href={'https://maps.google.com/?q='+place.address} className="underline"> {place.address}</a></p>
                </div>
                <div className="flex justify-end gap-3 my-2">
                    <p onClick={makeFavourite} className={Favourite ? 'text-sm cursor-pointer text-red-500' : "text-sm cursor-pointer"}>{Favourite ? <FavoriteIcon style={{fontSize:"large"}} /> :<FavoriteBorderIcon style={{fontSize:"large"}}/>}</p>
                    <p className="text-sm cursor-pointer"><IosShareIcon style={{fontSize:"large"}}/></p>
                </div>
                <div className="grid lg:grid-cols-3">
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        <div className="relative  w-full h-full">
                            <img className="w-full h-full rounded-l" src={place.photos[0] && place.photos[0]} alt=''/>
                            <button onClick={showPhotos} className="absolute bottom-2 right-0 bg-slate-400 rounded-full px-2 py-2 font-semibold"><InsertPhotoIcon/> All photos</button>
                        </div>
                        <div className="grid grid-rows-2 gap-1">
                            <div className="w-full">
                                <img className="w-3/4 h-full rounded-r" src={place.photos[1] && place.photos[1]}/>
                            </div>
                            <div className="w-full">
                                <img className="w-3/4 h-full rounded-r" src={place.photos[2] && place.photos[2]}/>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="grid lg:grid-cols-3 mt-4">
                    <div className="col-span-2">
                        <h2 className="text-2xl italic font-semibold">Description</h2>
                        <p className="text-base italic">{place.description}</p>
                        <p className="text-base font-bold italic mt-2">Checkin: {place.checkin}</p>
                        <p className="text-base font-bold italic my-2">Checkout: {place.checkout}</p>
                        <p className="text-base font-bold italic mb-2">Maxguest: {place.maxguest}</p>
                        <p className="text-base font-bold italic mb-2">Price per Day: {place.price}$</p>
                        <p className="italic text-base">Important Notes: The information provided on our hotel booking website is intended for general informational purposes only. While we strive to ensure the accuracy and reliability of the information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics displayed on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>
                        <h2 className="text-2xl italic mt-4 font-semibold">Extra Info</h2>
                        <p className="text-base italic mt-2">{place.extrainfo}</p>
                        <h2 className="text-2xl italic mt-4 font-semibold">Features</h2>
                        {place.features?.length > 0 && place.features.map((feature,index) => (
                                <div key={index} className="py-2  px-2" style={{display:"inline"}}>
                                    <label htmlFor='featured' className="font-bold px-1">{feature.toUpperCase()}</label>
                                    <input type="checkbox" id="featured" checked readOnly/>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="mt-4">
                    <button onClick={DoPayment} className="bg-lightblue w-full text-white font-bold rounded py-2 hover:bg-slate-400 ">Book this place</button>
                </div>
            </div>
            <Footer/>
        </>
    )
}