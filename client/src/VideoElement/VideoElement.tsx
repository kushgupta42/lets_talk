import React, { useState } from "react";
import "./VideoElement.css";

function VideoElement() {
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

  function convertToEmbedURL(videoURL: string): string {
    const youtubeVideoRegex =
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/;

    const match = videoURL.match(youtubeVideoRegex);

    if (match) {
      const videoId = match[1];
      const embedURL = `https://www.youtube.com/embed/${videoId}`;
      return embedURL;
    } else {
      return videoURL;
    }
  }

  console.log("yashika: Video Link", convertToEmbedURL(enteredText));

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
          src={convertToEmbedURL(enteredText)}
        />
      ) : null}
    </div>
  );
}

export default VideoElement;
