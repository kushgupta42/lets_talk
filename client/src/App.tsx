import React from "react";
import Header from "./Header/Header";

import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import VideoElement from "./VideoElement/VideoElement";
import DropDown from "./DropDown/DropDown";

function App() {
  return (
    <div className="app">
      <Header />
      <VideoElement />
      <div className="activities">
        <SearchBar />
        <DropDown options={["abc", "def"]} />
      </div>
    </div>
  );
}

export default App;
