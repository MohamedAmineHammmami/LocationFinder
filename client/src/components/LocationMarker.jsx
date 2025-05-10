import React, { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import marker from "../assets/marker.png";
import CustomPopup from "./customPopup/CustomPopup";

const maptilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY;

function LocationMarker({ position, setPosition }) {
  const [locationInfos, setLocationInfos] = useState(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e?.latlng);
    },
    //redirect the mapView to the returned location
    locationfound(e) {
      setPosition(e?.latlng);
    },
  });
  // Create a custom icon
  const customIcon = new L.Icon({
    iconUrl: marker, // Path to your icon
    iconSize: [40, 40], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon (where to place it on the map)
    popupAnchor: [0, -32], // Popup offset
  });

  const getLocationInfos = async () => {
    try {
      const res = await fetch(
        `https://api.maptiler.com/geocoding/${position?.lng},${position?.lat}.json?key=${maptilerApiKey}`
      );
      if (!res.ok) {
        throw new Error(`Error status:${res.status}`);
      }
      const data = await res.json();
      setLocationInfos(data?.features[0]);
      console.log(data?.features[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //ask the browser user current location
    //browser provide location by browswergeolocation
    map.locate();
  }, [map]);

  useEffect(() => {
    if (position) {
      getLocationInfos();
      map.flyTo(position, map.getZoom(), { duration: 1 });
    }
  }, [position]);

  return !position ? null : (
    <Marker position={position} icon={customIcon}>
      <CustomPopup {...{ locationInfos }} />
    </Marker>
  );
}

export default LocationMarker;
