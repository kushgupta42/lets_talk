import React, { useState } from "react";
import "./SearchBar.css";
import {
  useSharedState,
  useSharedStateSetters,
} from "../SharedStateContext/SharedStateContext";

const SearchBar: React.FC = () => {
  const { isSearchOpen, searchedValue, textToBeSearched } = useSharedState();
  const { setSearchOpen, setSearchedValue, setTextToBeSearched } =
    useSharedStateSetters();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setTextToBeSearched(searchedValue);
      setSearchedValue("");
    }
  };

  const searchToggle = (
    event: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>
  ): void => {
    setSearchOpen(!isSearchOpen);
  };

  console.log("Yashika- Search String:", textToBeSearched);

  return (
    <div className={`search-wrapper ${isSearchOpen ? "active" : ""}`}>
      <div className="input-holder">
        <input
          type="text"
          className="search-input"
          placeholder="Type to search"
          value={searchedValue}
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
