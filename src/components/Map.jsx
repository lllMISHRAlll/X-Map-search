import { useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import style from "../styleSheets/map.module.css";
import GoogleMapComponent from "../components/GoogleMap";
import AddressSearch from "./AddressSearch";

const libraries = ["places"];

export default function Map() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  const toggleUserModal = () => setShowUserModal((prev) => !prev);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  const handleSelect = (address, coords) => {
    setSelectedAddress(address);
    setSelectedLocation(coords);
  };

  return (
    <div className={style.main}>
      <div className={style.topBar}>
        <div className={style.searchWrapper}>
          <AddressSearch onSelect={handleSelect} />
        </div>

        <div className={style.userCircle} onClick={toggleUserModal}>
          U
          {showUserModal && (
            <div className={style.userModal}>
              <p>
                <strong>Username:</strong> johndoe
              </p>
              <p>
                <strong>Email:</strong> john@example.com
              </p>
              <button className={style.logoutButton}>Logout</button>
            </div>
          )}
        </div>
      </div>

      <GoogleMapComponent center={selectedLocation} marker={selectedLocation} />
    </div>
  );
}
