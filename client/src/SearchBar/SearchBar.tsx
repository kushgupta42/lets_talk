import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  const [isSearchOpen, setSearchOpen] = useState(false);

  const searchToggle = (
    event: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>
  ): void => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <div className={`search-wrapper ${isSearchOpen ? "active" : ""}`}>
      <div className="input-holder">
        <input
          type="text"
          className="search-input"
          placeholder="Type to search"
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
