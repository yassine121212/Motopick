import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const TrackOrders = ({ latitude, longitude }) => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  console.log("💌");
  console.log(latitude);
  const [center, setcenter] = useState(null)
  useEffect(() => {
    setcenter({ lat: latitude || 0, lng: longitude || 0 });
  },[]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return "loading............";
  }
  return (
    <div className="drivers">
      <div className="driversContainer h-[7cm]">
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
        >
          <Marker position={center} />
        </GoogleMap>{" "}
      </div>
    </div>
  );
};

export default TrackOrders;
