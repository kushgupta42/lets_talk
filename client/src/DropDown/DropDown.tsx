import React from "react";
import "./DropDown.css";
import {
  useSharedState,
  useSharedStateSetters,
} from "../SharedStateContext/SharedStateContext";

interface DropDownProps {
  options: string[];
}

const DropDown: React.FC<DropDownProps> = ({ options }) => {
  const { selectedOption, isOpen } = useSharedState();
  const { setIsOpen, setSelectedOption, setEnteredText } =
    useSharedStateSetters();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    const index = selectedOption.indexOf(option);
    if (index === -1) {
      setSelectedOption(option);
    } else {
      const updatedOption = selectedOption;
      setSelectedOption(updatedOption);
      setEnteredText(convertIdToYouTubeURL(selectedOption));
    }
    toggleDropdown();
  };

  function convertIdToYouTubeURL(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

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
