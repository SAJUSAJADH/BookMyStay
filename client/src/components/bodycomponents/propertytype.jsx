import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import hotel from "../images/hotel.jpeg";
import apartments from "../images/apartments.jpeg";
import cabin from "../images/cabin.jpeg";
import cottages from "../images/cottages.jpeg";
import glambing from "../images/glamping.jpeg";
import guesthouses from "../images/guesthouses.jpeg";
import servicedapartments from "../images/servicedapartments.jpeg";
import resorts from "../images/resorts.jpeg"
import villas from "../images/villas.jpeg";                  
import vecationhomes from "../images/vecationhomes.jpeg"; 
import { useContext } from 'react';
import { UserContext } from '../../contextprovider/usercontext';
import { useNavigate } from 'react-router-dom';

export default function PropertyType(){

  const {user} = useContext(UserContext);
  const navigate = useNavigate();

    const responsive = {
        superLargeDesktop: {
          
          breakpoint: { max: 4000, min: 1024 },
          items: 4
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

      const HandlePlace = (ev) => {
        if(user){
            navigate(`/account/search/${ev.target.name.trim()}`);
        }else{
            navigate(`/search/${ev.target.name.trim()}`);
        }
    }

    return(
        <div className="container mx-auto p-2 md:p-6">
            <h2 className="font-bold font-sans text-2xl">Browse by property type</h2>
            <Carousel className="pt-2 md:p-6" responsive={responsive}>
                <div className="mx-1"><img onClick={HandlePlace} name="hotels" className='rounded cursor-pointer' src={hotel} alt=''/><h5 className="font-bold font-sans text-lg p-2">Hotels</h5></div>
                <div className="mx-1"><img onClick={HandlePlace} name="apartments" className='rounded cursor-pointer' src={apartments} alt=''/><h5 className="font-bold font-sans text-lg p-2">Apartments</h5></div>
                <div className="mx-1"><img onClick={HandlePlace} name="resorts" className='rounded cursor-pointer' src={resorts} alt=''/><h5 className="font-bold font-sans text-lg p-2">Resorts</h5></div>
                <div className="mx-1"><img onClick={HandlePlace} name="guesthouses" className='rounded cursor-pointer' src={guesthouses} alt=''/><h5 className="font-bold font-sans text-lg p-2">Guest Houses</h5></div>
                <div className="mx-1"><img onClick={HandlePlace} name="villas" className='rounded cursor-pointer' src={villas} alt=''/><h5 className="font-bold font-sans text-lg p-2">Villas</h5></div>
                <div className="mx-1"><img onClick={HandlePlace} name="cottagess" className='rounded cursor-pointer' src={cottages} alt=''/><h5 className="font-bold font-sans text-lg p-2">Cottages</h5></div>
                <div className="mx-1"><img onClick={HandlePlace} name="cabins" className='rounded cursor-pointer' src={cabin} alt=''/><h5 className="font-bold font-sans text-lg p-2">Cabins</h5></div>
                <div className="mx-1"><img onClick={HandlePlace} name="vecationhomes" className='rounded cursor-pointer' src={vecationhomes} alt=''/><h5 className="font-bold font-sans text-lg p-2">Serviced Rooms</h5></div>
                <div className="mx-1"><img onClick={HandlePlace} name="servicedapartments" className='rounded cursor-pointer' src={servicedapartments} alt=''/><h5 className="font-bold font-sans text-lg p-2">Vecation Homes</h5></div>
                <div className="mx-1"><img onClick={HandlePlace} name="glambings" className='rounded cursor-pointer' src={glambing} alt=''/><h5 className="font-bold font-sans text-lg p-2">Glambing</h5></div>
            </Carousel>
        </div>
    )
  }