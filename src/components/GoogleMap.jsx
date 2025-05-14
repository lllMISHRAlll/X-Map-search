import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 12.9716,
  lng: 77.5946,
};

const libraries = ["places"];

export default function GoogleMapComponent() {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [marker, setMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={13}
      onClick={(e) =>
        setMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        })
      }
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  ) : (
    <div style={{ width: "100%", height: "100%", background: "#e6e6e6" }}>
      Loading map...
    </div>
  );
}
