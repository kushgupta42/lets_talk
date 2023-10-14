import React from "react";
import { useSharedState } from "../SharedStateContext/SharedStateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareUpRight } from "@fortawesome/free-solid-svg-icons";

import "./ButtonToNewTab.css";

function ButtonToNewTab() {
  const { embedUrl } = useSharedState();

  const urlToOpen = { embedUrl };

  const handleOpenNewTab = () => {
    window.open(urlToOpen.embedUrl, "_blank");
  };

  return (
    <div className="container-new-tab">
      <button className="button-to-new-tab" onClick={handleOpenNewTab}>
        <FontAwesomeIcon icon={faSquareUpRight} style={{ fontSize: "36px" }} />
      </button>
    </div>
  );
}

export default ButtonToNewTab;
