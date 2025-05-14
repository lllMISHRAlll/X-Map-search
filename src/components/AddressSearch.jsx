import { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import styles from "../styleSheets/addressSearch.module.css";
import { Icon } from "@iconify/react";

export default function AddressSearch({ onSelect }) {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      const address = place.formatted_address;
      onSelect(address, location);
    }
  };

  const handleClear = () => {
    setInputValue("");
    inputRef.current?.focus();
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
          onClick={handlePlaceChanged}
          className={styles.searchButton}
        >
          Search
        </button>
      </div>
    </div>
  );
}
