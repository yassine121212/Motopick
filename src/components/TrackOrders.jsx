import React, { useState, useEffect } from "react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const TrackOrders = ({ fromadd, toadd }) => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  // useEffect(() => {
  //   setlatitude(parseFloat(props?.latitude));
  //   setlongitude(parseFloat(props?.longitude));
  // });
  console.log("💌");
  console.log(fromadd);
  console.log(toadd);

  console.log("🦊");
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [from, setfrom] = useState(null);
  const [to, setto] = useState(null);
  const dest = { lat: 73.88868115846448, lng: 5.575568564236164 };
  const desxt = { lat: 13.88868115846448, lng: 5.575568564236164 };

  console.log("🤯");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const coordinatesFromString = async () => {
    const api = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${fromadd?.lat},${fromadd?.lon}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    ).then((response) => response.json());
    console.log("🥶");
    console.log(api);
    setfrom(api);
  };
  const coordinatesToStirng = async () => {
    const api = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${toadd?.lat},${toadd?.lon}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    ).then((response) => response.json());
    console.log("🥶");
    console.log(api);
    setto(api);
  };
  // useEffect(() => {
  //   console.log("🍴");
  //   console.log(from);
  //   console.log(to);
  // }, [from, to]);
  const calculeRoute = async () => {
    console.log(from?.plus_code?.global_code);
    console.log(to?.plus_code?.global_code);
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: from?.plus_code?.global_code,
      destination: to?.plus_code?.global_code,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log("hhhhhhhh");
    console.log(results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };
  // function getReverseGeocodingData(lat, lng) {
  //   // eslint-disable-next-line no-undef
  //   var latlng = new google.maps.LatLng(lat, lng);
  //   // This is making the Geocode request
  //   // eslint-disable-next-line no-undef
  //   var geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ latLng: latlng }, (results, status) => {
  //     // eslint-disable-next-line no-undef
  //     if (status !== google.maps.GeocoderStatus.OK) {
  //       alert(status);
  //     }
  //     // This is checking to see if the Geoeode Status is OK before proceeding
  //     // eslint-disable-next-line no-undef
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       console.log(results);
  //       var address = results[0].formatted_address;
  //     }
  //   });
  // }
  useEffect(() => {
    coordinatesFromString();
    coordinatesToStirng();
    calculeRoute();
    // getReverseGeocodingData(latitude, longitude);
  }, [fromadd, toadd]);
  if (!isLoaded) {
    return "loading............";
  }
  return (
    <div className="drivers ">
      <div className="driversContainer h-[7cm]">
        <GoogleMap
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>{" "}
      </div>
    </div>
  );
};

export default TrackOrders;
