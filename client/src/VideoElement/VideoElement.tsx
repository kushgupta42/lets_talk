import React, { useEffect } from "react";
import {
  useSharedState,
  useSharedStateSetters,
} from "../SharedStateContext/SharedStateContext";

import "./VideoElement.css";

function VideoElement() {
  const { inputValue, embedUrl, enteredText, response, selectedOption } =
    useSharedState();
  const {
    setEnteredText,
    setInputValue,
    setSelectedOption,
    setResponse,
    setEmbedUrl,
  } = useSharedStateSetters();

  useEffect(() => {
    if (response.sources) {
      setEnteredText(
        addTimestampsToYouTubeURL(embedUrl, getStartTime(response.sources))
      );
      setInputValue("");
      setSelectedOption(
        extractVideoId(convertToEmbedURLfromYoutubeURl(inputValue))
      );
    }
  }, [response]);

  function getStartTime(input: any): string {
    // const regex = /(\d+\.\d+)/;
    // const match = input.match(regex);
    // return match ? Math.floor(match[0]).toString() : "";

    const times = input.split("-");
    return Math.floor(times[0]).toString();
  }

  function getEndTime(input: any): string {
    const regex = /- (\d+\.\d+)/;
    const match = input.match(regex);
    return match ? Math.floor(match[1]).toString() : "";
  }

  function addTimestampsToYouTubeURL(
    baseURL: string,
    startTime: string
  ): string {
    // Ensure that the base URL ends with '/embed/' to make it a valid YouTube embed URL
    if (!baseURL.endsWith("/embed/")) {
      baseURL = baseURL.replace(/(\/embed\/[^?&]+).*$/, "$1");
    }

    // Construct the complete URL with start and end time parameters
    const timestampedURL = `${baseURL}?start=${startTime}`;

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
    }
  };

  function convertToEmbedURLfromYoutubeURl(videoURL: string): string {
    const youtubeVideoRegex =
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/;

    const match = videoURL.match(youtubeVideoRegex);

    if (match) {
      const videoId = match[1];
      const embedURL = `https://www.youtube.com/embed/${videoId}`;
      setEmbedUrl(embedURL);
      return embedURL;
    } else {
      setEmbedUrl(videoURL);
      return videoURL;
    }
  }

  console.log("yashika: Response", response);

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
      {response ? (
        <textarea
          id="responceTextArea"
          value={response.response + " \nVideo Segment: " + response.sources}
          className="response-block"
        ></textarea>
      ) : null}
    </div>
  );
}

export default VideoElement;
