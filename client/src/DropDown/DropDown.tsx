import React, { useState } from "react";
import "./DropDown.css";

interface DropDownProps {
  options: string[];
}

const DropDown: React.FC<DropDownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(String);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    const index = selectedOption.indexOf(option);
    if (index === -1) {
      setSelectedOption(option);
    } else {
      // Remove the option from selectedOption
      const updatedOptions = selectedOption;
      setSelectedOption(updatedOptions);
    }
    toggleDropdown();
  };

  console.log("yashika- Selected Option:", selectedOption);

  return (
    <div className="dropdown dropdown-container">
      <button
        className="dropdown-toggle dropdown-button"
        onClick={toggleDropdown}
      >
        Saved Videos
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              className="dropdown-option"
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
