import React, { useState,useEffect,useRef, useContext } from 'react';
import avatar from "../images/defaultavatar.jpg"
import { UserContext } from '../../contextprovider/usercontext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function AccountDropdown() {

  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const options = [{name: 'Profile',href:"/account/profile/accountmanager"}, {name: 'Bookings',href:"/account/booking"}, {name: 'Places',href:"/account/place"}];
  const dropdownRef = useRef(null);
  const [profilepic, setProfilepic] = useState(null);
  const [isImage,setisImage] = useState(false);
    
    useEffect(()=>{
        const grabPhoto = async()=>{
          const res = await axios.get('/upload');
          try{
            if(res.data.image){
              const {image} = res.data;
              setProfilepic(image)
              setisImage(true);
            }
          }catch(error){
            console.log('login please')
          }
          
        }
        grabPhoto();
      },[profilepic])


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

  
    document.addEventListener('mousedown', handleClickOutside);

    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleOptionClick = async () => {
    await axios.post('/logout').then(()=>{
      setUser(null);
      navigate('/');
    })
  }
  

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <img
          src={isImage ? profilepic : avatar}
          alt=""
          onClick={toggleDropdown}
          className="inline-flex rounded-full justify-center w-7 h-7 mt-2 cursor-pointer"
          aria-expanded={isOpen}
          aria-haspopup="true"
        />
      </div>

      {isOpen && (
        <div
          className="origin-top absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
        >
          <div className="py-1 text-center" role="none">
            {options.map((option, index) => (
              <a
                key={index}
                href={option.href}
                className="block px-4 py-2 text-base font-semibold text-gray-700 hover:bg-cyan-200 hover:text-gray-900 cursor-pointer"
                role="menuitem"
              >
                {option.name}
              </a>
            ))}
            <p onClick={handleOptionClick} className="block px-4 py-2 text-base font-semibold text-gray-700 hover:bg-cyan-200 hover:text-gray-900 cursor-pointer"
                role="menuitem">
                  Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;

