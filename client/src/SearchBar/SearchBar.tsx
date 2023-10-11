import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  const [isSearchOpen, setSearchOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [enteredText, setEnteredText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setEnteredText(inputValue);
      setInputValue("");
    }
  };

  const searchToggle = (
    event: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>
  ): void => {
    setSearchOpen(!isSearchOpen);
  };

  console.log("Yashika- Search String:", enteredText);

  return (
    <div className={`search-wrapper ${isSearchOpen ? "active" : ""}`}>
      <div className="input-holder">
        <input
          type="text"
          className="search-input"
          placeholder="Type to search"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
        />
        <button className="search-icon" onClick={searchToggle}>
          <span></span>
        </button>
      </div>
      <span className="close" onClick={searchToggle}></span>
    </div>
  );
};

export default SearchBar;
