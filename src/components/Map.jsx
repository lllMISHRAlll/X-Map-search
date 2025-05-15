import { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import style from "../styleSheets/map.module.css";
import GoogleMapComponent from "../components/GoogleMap";
import AddressSearch from "./AddressSearch";
import { logoutUser } from "../services/authServices";
import { saveUserSearch } from "../services/userServives";

const libraries = ["places"];

export default function Map({ user }) {
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    const name = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";
    setUserInfo({ name, email });
  }, []);

  const toggleUserModal = () => setShowUserModal((prev) => !prev);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  const handleSelect = async (address, coords) => {
    setSelectedAddress(address);
    setSelectedLocation(coords);

    try {
      await saveUserSearch(address, coords);
      console.log("Search saved:", address);
    } catch (err) {
      console.error("Failed to save search:", err);
    }
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
              <p>{user.username}</p>
              <p>{user.email}</p>
              <button className={style.logoutButton} onClick={logoutUser}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <GoogleMapComponent center={selectedLocation} marker={selectedLocation} />
    </div>
  );
}
