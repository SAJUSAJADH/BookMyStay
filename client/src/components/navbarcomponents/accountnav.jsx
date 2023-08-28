import India from "../images/India.png";
import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { UserContext } from "../../contextprovider/usercontext";
import avatar from "../images/defaultavatar.jpg"
import LanguageDropdown from "./languagedropdown";
import CurrencyDropdown from "./currencydropdown";
import AccountDropdown from "./accountdropdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Accountnav(){

    const {user,setUser} = useContext(UserContext);

    const [isToggle, setIstoggle] = useState(false);

    const navigate = useNavigate();

    
    const menus = [
        {name: 'USD', href: ""},
        {name: 'Language', href: ""},
        {name: 'Help', href: "/account/faq"},
        {name: 'profile', href: '/account/profile'},
        {name: 'booking', href: '/account/booking'},
        {name: 'place', href: '/account/place'}    
    ]

    

    const open =()=>{
        setIstoggle(!isToggle)
    }

    const handleOptionClick = async () => {
        await axios.post('/logout').then(()=>{
          setUser(null);
          navigate('/');
        })
      }
    
    return(
        <nav className="bg-blue relative container-fluid mx-auto p-6 z-50">
            <div className="flex items-center justify-between md:justify-around">
                <div className="font-logo">
                    <h2 className="text-white font-bold text-2xl cursor-pointer">BookMyStay.com</h2>
                </div>
                <div className="hidden md:flex space-x-16 text-white">
                    <CurrencyDropdown/>
                    <LanguageDropdown/>
                    <Link to={'/account/faq'} className="font-bold cursor-pointer pt-2">Help</Link>
                    <div className="flex space-x-6">
                        <AccountDropdown/>
                        <Button href="/account/place/addplace" variant="outlined" style={{color:"white",fontWeight:"bold"}} className="text-white">List your property</Button>
                    </div>
                </div> 
                <button onClick={open} id="menu-btn" className={isToggle ? 'open block hamburger md:hidden focus:outline-none' : 'block hamburger md:hidden focus:outline-none'}>
                        <span className="hamburger-top text-white"></span>
                        <span className="hamburger-middle"></span>
                        <span className="hamburger-bottom"></span>
                </button>     
            </div>
            <div className="md:hidden">
                    <div onClick={open} id="menu" className={isToggle ? "absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white text-[#000] sm:w-auto sm:self-center left-6 right-6 drop-shadow-md" : "absolute hidden flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md" }>
                        {menus.map((menu,index)=>(
                            <a key={index} href={menu.href}>{menu.name}</a>
                        ))}
                        <p onClick={handleOptionClick} >Logout</p>
                     </div>
                </div>
        </nav>
        
    )
}