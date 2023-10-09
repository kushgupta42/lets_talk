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
      <SearchBar />
      <DropDown options={["abc", "def"]} />
    </div>
  );
}

export default App;
