import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {useSharedStateSetters } from "../SharedStateContext/SharedStateContext";
  

const SpeechRecognitionComponent = () => {
  const {  setResponse, setSearchedValue } =
    useSharedStateSetters();

    
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  setSearchedValue(transcript);

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening();
  };
  
  return (
    <div>
      {browserSupportsSpeechRecognition ? (
        <div>
          <button onClick={handleStartListening} disabled={listening}>
            <img
              src="https://www.freeiconspng.com/uploads/microphone-png-17.png"
              width="30"
              height="40"
              alt="Clipart Microphone PNG"
            />
          </button>
        </div>
      ) : (
        <p>Your browser doesn't support speech recognition.</p>
      )}
    </div>
  );
};
const VoiceInput: React.FC = () => {
  return (
    <div>
      <SpeechRecognitionComponent />{" "}
      {/* Include the SpeechRecognitionComponent here */}
    </div>
  );
};

export default VoiceInput;
