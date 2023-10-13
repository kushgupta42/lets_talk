import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechRecognitionComponent = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

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
          <p>{transcript}</p>
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
