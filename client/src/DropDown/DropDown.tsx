import React, { useState } from "react";
import "./DropDown.css";

interface DropDownProps {
  options: string[];
}

const DropDown: React.FC<DropDownProps> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    const index = selectedOptions.indexOf(option);
    if (index === -1) {
      // Add the option to selectedOptions
      setSelectedOptions([...selectedOptions, option]);
    } else {
      // Remove the option from selectedOptions
      const updatedOptions = [...selectedOptions];
      updatedOptions.splice(index, 1);
      setSelectedOptions(updatedOptions);
    }
  };

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
            <li key={option} onClick={() => handleOptionClick(option)}>
              <label>
                <input
                  className="dropdown-option"
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  readOnly
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
