import React from "react";
import {
  useSharedState,
  useSharedStateSetters,
} from "../SharedStateContext/SharedStateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

import "./DropDown.css";

interface DropDownProps {
  options: string[];
}

function convertIdToYouTubeURL(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

const DropDown: React.FC<DropDownProps> = ({ options }) => {
  const { selectedOption, isOpen } = useSharedState();
  const { setIsOpen, setSelectedOption, setEnteredText, setResponse } =
    useSharedStateSetters();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    const index = selectedOption.indexOf(option);

    if (index === -1) {
      setSelectedOption(option);
      setResponse("");
    } else {
      return;
    }
    setEnteredText(convertIdToYouTubeURL(option));
    toggleDropdown();
  };

  return (
    <div className="dropdown dropdown-container">
      <button
        className="dropdown-toggle dropdown-button"
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon
          icon={faBookmark}
          className="bookmarked"
          style={{ fontSize: "36px" }}
        ></FontAwesomeIcon>
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
