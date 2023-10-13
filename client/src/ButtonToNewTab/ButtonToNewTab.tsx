import React from "react";
import { useSharedState } from "../SharedStateContext/SharedStateContext";

function ButtonToNewTab() {
  const { embedUrl } = useSharedState();

  const urlToOpen = { embedUrl };

  const handleOpenNewTab = () => {
    window.open(urlToOpen.embedUrl, "_blank");
  };

  return (
    <div>
      <button onClick={handleOpenNewTab}>Open URL in New Tab</button>
    </div>
  );
}

export default ButtonToNewTab;
