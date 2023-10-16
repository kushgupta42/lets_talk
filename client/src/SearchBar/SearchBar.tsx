import React, { useEffect } from "react";
import "./SearchBar.css";
import {
  useSharedState,
  useSharedStateSetters,
} from "../SharedStateContext/SharedStateContext";

const SearchBar: React.FC = () => {
  const { isSearchOpen, searchedValue, selectedOption, textToBeSearched } =
    useSharedState();
  const { setSearchOpen, setSearchedValue, setTextToBeSearched, setResponse } =
    useSharedStateSetters();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Search bar selectedOption:", selectedOption);
    if (event.key === "Enter") {
      setTextToBeSearched(searchedValue);
      fetchData();
      setSearchedValue(searchedValue);
    }
  };

  function encodeURLString(inputString: string): string {
    return encodeURIComponent(inputString);
  }

  const formatUrl = () => {
    const formattedQuestion = encodeURLString(searchedValue);
    const baseURL = `http://localhost:8000/getAns/${selectedOption}?question=${formattedQuestion}`;
    return baseURL;
  };
  const fetchData = async () => {
    fetch(formatUrl())
      .then((data) => data.json())
      .then((data) => {
        console.log("yashika-answer:", data.response);
        setResponse(data);
      });
  };

  const searchToggle = (
    event: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>
  ): void => {
    setSearchedValue("");
    setSearchOpen(!isSearchOpen);
  };

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
