import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useNavigate } from 'react-router-dom'





export default function Allplaces(){
    
    const navigate = useNavigate();
    const [places,setPlaces] = useState([]);
    
    


    const responsive = {
        superLargeDesktop: {
          
          breakpoint: { max: 4000, min: 1024 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1024, min: 800 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };

    useEffect(()=>{
           axios.get('/allplaces').then(response => {
            setPlaces(response.data);            
           })
    },[])

    return(
        <div className="container mx-auto p-2 md:p-6">
            <h2 className="font-bold font-sans text-2xl">Stay at our top unique properties</h2>
            <p className="font-semibold text-lg font-sans">From castles and villas to boats and igloos, we have it all</p>
            <Carousel className="md:p-6" responsive={responsive}>
                {places.map((place,index)=>(
                    <div onClick={()=>{navigate(`/account/book/${place._id}`)}} className="mx-2" key={index}>
                        <img className='rounded cursor-pointer' src={place.photos[0]} alt=''/>
                        <h2 className="font-bold font-sans text-lg p-2">{place.title}</h2>
                        <p className="font-semibold text-base font-sans text-gray-500">{place.address}</p>
                        <p className="font-semibold text-base font-sans">Price: {place.price}$</p>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}