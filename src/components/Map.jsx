import { useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import style from "../styleSheets/map.module.css";
import GoogleMapComponent from "../components/GoogleMap";
import AddressSearch from "./AddressSearch";

const libraries = ["places"]; // ✅ static to prevent reload

export default function Map() {
  const [showUserModal, setShowUserModal] = useState(false);
  const toggleUserModal = () => setShowUserModal((prev) => !prev);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <div className={style.main}>
      <div className={style.topBar}>
        <div className={style.searchWrapper}>
          <AddressSearch
            onSelect={(address, coords) => {
              console.log("Selected:", address, coords);
            }}
          />
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

      <GoogleMapComponent />
    </div>
  );
}
