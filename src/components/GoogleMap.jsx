import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 12.9716,
  lng: 77.5946,
};

export default function GoogleMapComponent({ center, marker }) {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || defaultCenter}
      zoom={center ? 14 : 10}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  );
}
