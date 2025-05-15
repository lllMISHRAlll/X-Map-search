import { useRef, useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import styles from "../styleSheets/addressSearch.module.css";
import { Icon } from "@iconify/react";
import { getUserHistory } from "../services/userServives";

export default function AddressSearch({ onSelect }) {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [pendingLocation, setPendingLocation] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getUserHistory()
      .then(setHistory)
      .catch((err) => console.error("Failed to load history", err));
  }, []);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      const address = place.formatted_address;

      setInputValue(address);
      setPendingLocation({ address, location });
    }
  };

  const handleClear = () => {
    setInputValue("");
    setPendingLocation(null);
    inputRef.current?.focus();
  };

  const handleSearchClick = () => {
    if (pendingLocation) {
      onSelect(pendingLocation.address, pendingLocation.location);
      setShowHistoryModal(false);
    }
  };

  const handleFocus = () => setShowHistoryModal(true);
  const handleBlur = () => setTimeout(() => setShowHistoryModal(false), 150);

  const handleHistoryClick = (item) => {
    setInputValue(item.address);
    onSelect(item.address, item.coordinates);
    setShowHistoryModal(false);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <Icon icon="material-symbols:search" className={styles.searchIcon} />

        <Autocomplete
          onLoad={(ref) => (autocompleteRef.current = ref)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search for a location"
            className={styles.input}
          />
        </Autocomplete>

        {inputValue && (
          <Icon
            icon="mdi:close"
            className={styles.clearIcon}
            onClick={handleClear}
          />
        )}

        <button
          type="button"
          onClick={handleSearchClick}
          className={styles.searchButton}
        >
          Search
        </button>
      </div>

      {showHistoryModal && history.length > 0 && (
        <div className={styles.historyModal}>
          {history.map((item) => (
            <div
              key={item._id}
              className={styles.historyItem}
              onMouseDown={() => handleHistoryClick(item)}
            >
              <Icon icon="mdi:clock-outline" className={styles.historyIcon} />
              <div className={styles.historyText}>
                <h4>{item.label || item.address.split(",")[0]}</h4>
                <p>{item.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
