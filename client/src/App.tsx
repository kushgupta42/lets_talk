import React, { useEffect, useState } from "react";
import Header from "./Header/Header";

import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import VideoElement from "./VideoElement/VideoElement";
import DropDown from "./DropDown/DropDown";
import { SharedStateProvider } from "./SharedStateContext/SharedStateContext";

function App() {
  const [listOptions, setListOptions] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/list")
      .then((data) => data.json())
      .then((data) => {
        console.log("yashika:list: ", data.video_ids);
        setListOptions(data.video_ids);
      });
  }, []);

  return (
    <SharedStateProvider>
      <div className="app">
        <Header />
        <VideoElement />
        <div className="activities">
          <SearchBar />
          <DropDown options={listOptions} />
        </div>
      </div>
    </SharedStateProvider>
  );
}

export default App;
