import React, { useEffect, useState } from "react";
import "./App.css";
import LocationMarker from "./components/LocationMarker";

import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import SearchPlace from "./components/searchDiv/SearchPlace";
//import.meta.env
//VITE_ : prefix is necessary at vite to access to env variable
const maptilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY;
const thunderApiKey = import.meta.env.VITE_THUNDER_API_KEY;

function App() {
  const [position, setPosition] = useState(null);

  return (
    <div className="container">
      <SearchPlace {...{ position, setPosition }} />
      <MapContainer
        center={[41.0052, 16.5077]}
        zoom={9}
        scrollWheelZoom={true}
        className="mapContainer"
      >
        <LayersControl>
          <LayersControl.Overlay name="Street" checked>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution="© OpenStreetMap & Carto"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Topographic">
            <TileLayer
              attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
              url={`https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=${maptilerApiKey}`}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Satellite">
            <TileLayer
              attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
              url={`https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${maptilerApiKey}`}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Transport">
            <TileLayer
              url={`https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=${thunderApiKey}`}
              attribution="© Thunderforest, OpenStreetMap contributors"
            />
          </LayersControl.Overlay>
        </LayersControl>

        <LocationMarker {...{ position, setPosition }} />
      </MapContainer>
    </div>
  );
}

export default App;
