import React, { useState,useEffect,useRef } from 'react';
import IND from "../images/India.png";
import USA from "../images/usa.png";
import FRF from "../images/frf.jpg";

function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['ENG-India', 'ENG-USA', 'FRE-France'];
  const [selectedOption, setSelectedOption] = useState(IND);
  const dropdownRef = useRef(null);


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


  const handleOptionClick = (option) => {
    if(option === 'ENG-India'){
        setSelectedOption(IND)
    }else if(option === 'ENG-USA'){
        setSelectedOption(USA)
    }else{
        setSelectedOption(FRF)
    }
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <img
          src={selectedOption}
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
              <p
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-base font-semibold text-gray-700 hover:bg-cyan-200 hover:text-gray-900 cursor-pointer"
                role="menuitem"
              >
                {option}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;

