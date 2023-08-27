import React, { useState,useEffect,useRef } from 'react';

function CurrencyDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['USD', 'INR', 'EUR'];
  const [selectedOption, setSelectedOption] = useState(options[0]);
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

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md  px-4 py-2 text-sm text-white font-bold"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {selectedOption}
        </button>
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
                onClick={() => handleOptionSelect(option)}
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

export default CurrencyDropdown;
