import React, { useEffect, useState } from "react";
import "./searchPlace.css";

const maptilerkey = import.meta.env.VITE_MAPTILER_API_KEY;

function SearchPlace({ setPosition }) {
  const [place, setPlace] = useState("");

  const handleOnchange = (e) => {
    setPlace(e.target.value);
  };

  const fetchLocation = async (place) => {
    try {
      const res = await fetch(
        `https://api.maptiler.com/geocoding/${place}.json?key=${maptilerkey}`
      );

      if (!res.ok) {
        throw new Error(`Error Status Code: ${res.status}`);
      }
      const data = await res.json();
      if (data.features[0]) {
        setPosition({
          lat: data?.features[0]?.center[1],
          lng: data?.features[0]?.center[0],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="searchPlaceContainer">
      <h1>Enter a city name:</h1>
      <input
        type="text"
        placeholder="Enter a city name"
        value={place}
        onChange={(e) => handleOnchange(e)}
      />
      <button onClick={() => fetchLocation(place.trim())}>Go</button>
    </div>
  );
}

export default SearchPlace;
