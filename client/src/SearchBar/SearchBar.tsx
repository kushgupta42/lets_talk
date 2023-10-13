import React, { useEffect } from "react";
import "./SearchBar.css";
import {
  useSharedState,
  useSharedStateSetters,
} from "../SharedStateContext/SharedStateContext";

const SearchBar: React.FC = () => {
  const { isSearchOpen, searchedValue, selectedOption, textToBeSearched } = useSharedState();
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
    // setResponse(
    //   "Mark said that our generation has a challenge to not only create new jobs but create a renewed sense of purpose. He also said that finding your purpose isnt enough and that we need to create a world where everyone has a sense of purpose. He shared his story of how he met his wife Priscilla and how he almost sold Facebook before he realized that he wanted to create a sense of purpose for others. He also shared his thoughts on taking on big meaningful projects, redefining equality, and building community. He discussed how Millennials are one of the most charitable generations in history and how it only takes an hour or a week to give someone a hand and help them reach their potential. He also discussed how the most popular answer to what defines our identity is not nationality, ethnicity, or religion, but being a citizen of the world. He discussed the struggle of our time between the forces of freedom, openness, and global community against the forces of authoritarianism, isolationism, and nationalism. He discussed how over the past few decades, membership in all kinds of communities has declined by as much as one quarter and how it is up to us to rebuild these communities and start new ones. He discussed how Agnes, Kayla, Neha, and David have all done"
    // );
  };

  const searchToggle = (
    event: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>
  ): void => {
    setSearchedValue("")
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
