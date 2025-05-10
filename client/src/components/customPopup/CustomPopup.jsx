import React from "react";
import "./customPopup.css";
import { Popup } from "react-leaflet";

function CustomPopup({ locationInfos }) {
  return (
    <Popup>
      <strong>{locationInfos?.place_name}</strong>
      <br />
      <b>
        <span>Latitude:</span>
        {locationInfos?.center[1]}
      </b>
      <br />
      <b>
        <span>Longitude:</span>
        {locationInfos?.center[0]}
      </b>
    </Popup>
  );
}

export default CustomPopup;
