import India from "../images/India.png";
import { useState } from "react";
import { Button } from "@mui/material";
import LanguageDropdown from "./languagedropdown";
import CurrencyDropdown from "./currencydropdown";
import { Link } from "react-router-dom";


export default function Nav(){

    const [isToggle, setIstoggle] = useState(false);

    
    const menus = [
        {name: 'USD', href: ""},
        {name: 'Language', href: ""},
        {name: 'Help', href: "/faq"},
        {name: 'Signup', href:"/register"},
        {name: 'Signin', href: '/signin'}
    ]

    

    const open =()=>{
        setIstoggle(!isToggle)
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
                    <Link to={'/faq'} className="font-bold cursor-pointer pt-2">Help</Link>
                    <div className="flex space-x-6">
                        <Button href="/register" style={{backgroundColor:"white", fontWeight:"bold"}} variant="outlined" size="medium" className=" hover:bg-white">SIGN UP</Button>
                        <Button href="/signin" style={{backgroundColor:"white", fontWeight:"bold"}} variant="outlined" size="medium" className=" hover:bg-white">SIGN IN</Button>
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
                     </div>
                </div>
        </nav>
        
    )
}