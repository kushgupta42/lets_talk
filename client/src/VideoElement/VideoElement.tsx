import React, { useEffect, useState } from "react";
import "./VideoElement.css";
import {
  useSharedState,
  useSharedStateSetters,
} from "../SharedStateContext/SharedStateContext";

function VideoElement() {
  const { inputValue, enteredText, response } =
    useSharedState();
  const { setEnteredText, setInputValue, setSelectedOption, setResponse } =
    useSharedStateSetters();
    
 
  // useEffect(() => {
  //   const youtubeVideoRegex =
  //     /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/;

  //   const match = enteredText.match(youtubeVideoRegex);

  //   if (match) {
  //     const videoId = match[1];
  //     fetch(`http://localhost:8000/getAns/${videoId}?question=${inputValue}`)
  //       .then((data) => data.json())
  //       .then((data) => console.log(data))
  //       .catch((error) => {
  //         console.error("yashika- error while asking question", error);
  //       });
  //   } else {
  //     console.error("yashika- question not in correct format");
  //   }
  // }, [enteredText, selectedOption, response]);

  function getStartTime(input: any): string {
    const regex = /(\d+\.\d+)/;
    const match = input.match(regex);
    return match ? match[0] : "";
  }

  function getEndTime(input: any): string {
    const regex = /- (\d+\.\d+)/;
    const match = input.match(regex);
    return match ? match[1] : "";
  }

  useEffect(() => {
   
   
    console.log("YASHIKA: RESPONSE-", response);
    if (response.sources) {
      // setEnteredText(
      //   addTimestampsToYouTubeURL(
      //     inputValue,
      //     getStartTime(response.sources),
      //     getEndTime(response.sources)
      //   )
      // );
      // setInputValue("");
      // setSelectedOption(
      //   extractVideoId(convertToEmbedURLfromYoutubeURl(inputValue))
      // );
      // setResponse("");
    }
  }, [response]);

  function addTimestampsToYouTubeURL(
    baseURL: string,
    startTime: string,
    endTime: string
  ): string {
    // Ensure that the base URL ends with '/embed/' to make it a valid YouTube embed URL
    if (!baseURL.endsWith("/embed/")) {
      baseURL = baseURL.replace(/(\/embed\/[^?&]+).*$/, "$1");
    }

    // Construct the complete URL with start and end time parameters
    const timestampedURL = `${baseURL}?start=${startTime}&end=${endTime}`;

    return timestampedURL;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  function extractVideoId(embedUrl: string): string {
    const match = embedUrl.match(/\/embed\/([A-Za-z0-9_-]+)/);

    if (match) {
      return match[1];
    } else {
      return "";
    }
  }

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(" video inputValue:", inputValue);
    if (event.key === "Enter") {
      setEnteredText(inputValue);
      setInputValue("");
      setSelectedOption(
        extractVideoId(convertToEmbedURLfromYoutubeURl(inputValue))
      );
      setResponse("");
    }
  };

  function convertToEmbedURLfromYoutubeURl(videoURL: string): string {
    const youtubeVideoRegex =
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/;

    const match = videoURL.match(youtubeVideoRegex);

    if (match) {
      const videoId = match[1];
      const embedURL = `https://www.youtube.com/embed/${videoId}`;
      console.log("Yashika- VideoURL:", embedURL);
      return embedURL;
    } else {
      return videoURL;
    }
  }

  return (
    <div className="video-element-wrapper">
      <input
        className="input"
        type="url"
        placeholder="Unlock the magic with a youtube link"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
      />
      {enteredText ? (
        <iframe
          title="Your chosen youtube video"
          width="640"
          height="360"
          className="video-element"
          src={convertToEmbedURLfromYoutubeURl(enteredText)}
        />
      ) : null}
       {response.response ? (
        <textarea id="responceTextArea" value={response.response} className="response-block"></textarea>
        ) : null}
    </div>
  );
}

export default VideoElement;
