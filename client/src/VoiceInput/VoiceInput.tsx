import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSharedStateSetters } from "../SharedStateContext/SharedStateContext";

import "./VoiceInput.css";

const SpeechRecognitionComponent = () => {
  const { setSearchedValue } = useSharedStateSetters();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (listening) setSearchedValue(transcript);

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening();
  };

  return (
    <div className="mic-icon">
      {browserSupportsSpeechRecognition ? (
        <button
          className="voice-inout-button"
          onClick={handleStartListening}
          disabled={listening}
        >
          <i className="fa fa-microphone" style={{ fontSize: "36px" }}></i>
        </button>
      ) : (
        <p>Your browser doesn't support speech recognition.</p>
      )}
    </div>
  );
};
const VoiceInput: React.FC = () => {
  return <SpeechRecognitionComponent />;
};

export default VoiceInput;
