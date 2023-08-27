import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import goa from '../images/goa.jpg';
import jaipur from "../images/jaipur.jpg";
import banglore from "../images/banglore.jpg";
import lonavala from "../images/lonavala.jpg";
import mumbai from "../images/mumbai.jpg";
import newdelhi from "../images/newdelhi.jpg";
import northgoa from "../images/northgoa.jpg";
import pondicherry from "../images/pondicherry.jpg";
import tawang from "../images/tawang.jpg";
import udaipur from "../images/udaipur.jpg";
import { useContext } from 'react';
import { UserContext } from '../../contextprovider/usercontext';
import { useNavigate } from 'react-router-dom';




export default function Trend(){

  const {user} = useContext(UserContext);
  const navigate = useNavigate();

    const responsive = {
        superLargeDesktop: {
          
          breakpoint: { max: 4000, min: 1024 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 1024, min: 800 },
          items: 6
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
            <h2 className="font-bold text-2xl font-sans">Explore India</h2>
            <p className="font-semibold text-lg font-sans">These popular destinations have a lot to offer</p>
            <Carousel className="md:p-6" responsive={responsive}>
                <div><img onClick={HandlePlace} name="goa" className='rounded cursor-pointer' src={goa} alt=''/><h5 className="font-bold font-sans text-lg p-2">Goa</h5></div>
                <div><img onClick={HandlePlace} name="lonavala" className='rounded cursor-pointer' src={lonavala} alt=''/><h5 className="font-bold font-sans text-lg p-2">Lonavala</h5></div>
                <div><img onClick={HandlePlace} name="newdelhi" className='rounded cursor-pointer' src={newdelhi} alt=''/><h5 className="font-bold font-sans text-lg p-2">Newdelhi</h5></div>
                <div><img onClick={HandlePlace} name="banglore" className='rounded cursor-pointer' src={banglore} alt=''/><h5 className="font-bold font-sans text-lg p-2">Banglore</h5></div>
                <div><img onClick={HandlePlace} name="mumbai" className='rounded cursor-pointer' src={mumbai} alt=''/><h5 className="font-bold font-sans text-lg p-2">Mumbai</h5></div>
                <div><img onClick={HandlePlace} name="jaipur" className='rounded cursor-pointer' src={jaipur} alt=''/><h5 className="font-bold font-sans text-lg p-2">Jaipur</h5></div>
                <div><img onClick={HandlePlace} name="tawang" className='rounded cursor-pointer' src={tawang} alt=''/><h5 className="font-bold font-sans text-lg p-2">Tawang</h5></div>
                <div><img onClick={HandlePlace} name="northgoa" className='rounded cursor-pointer' src={northgoa} alt=''/><h5 className="font-bold font-sans text-lg p-2">NorthGoa</h5></div>
                <div><img onClick={HandlePlace} name="pondicherry" className='rounded cursor-pointer' src={pondicherry} alt=''/><h5 className="font-bold font-sans text-lg p-2">Pondicherry</h5></div>
                <div><img onClick={HandlePlace} name="udaipur" className='rounded cursor-pointer' src={udaipur} alt=''/><h5 className="font-bold font-sans text-lg p-2">Udaipur</h5></div>
            </Carousel>
        </div>
    )
}