import { useState, useEffect } from "react";
import styles from "../styleSheets/dashboard.module.css";
import Map from "../components/Map";
import { Icon } from "@iconify/react";
import { getUserHistory } from "../services/userServives";

export default function DashBoard() {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  const toggleHistory = () => setShowHistory((prev) => !prev);

  useEffect(() => {
    if (showHistory) {
      getUserHistory().then(setHistory);
    }
  }, [showHistory]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarWrapper}>
          <img src="X symbol.png" alt="Logo" />
          <button
            type="button"
            onClick={toggleHistory}
            className={showHistory ? styles.activeButton : styles.historyButton}
          >
            {showHistory ? (
              <Icon icon="material-symbols:bookmark" />
            ) : (
              <Icon icon="material-symbols:history" />
            )}
            History
          </button>
        </div>
      </div>

      {showHistory && (
        <div className={styles.historyPanel}>
          <div className={styles.searchBarWrapper}>
            <div className={styles.inputWithIcon}>
              <Icon
                icon="material-symbols:search"
                className={styles.searchIcon}
              />
              <input
                type="text"
                placeholder="Search Map"
                className={styles.searchBar}
              />
            </div>

            <Icon icon="mdi:filter-outline" className={styles.filterIcon} />
            <Icon icon="mdi:filter-variant" className={styles.filterIcon} />
          </div>

          <div className={styles.historyList}>
            {history.map((item, idx) => (
              <div key={idx} className={styles.historyItem}>
                <div>
                  <Icon icon="humbleicons:location" width="24" />
                  <div>
                    <h4>{item.label}</h4>
                    <p>{item.address}</p>
                  </div>
                </div>
                <button className={styles.deleteButton}>
                  <Icon icon="material-symbols:delete" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.body}>
        <Map />
      </div>
    </div>
  );
}
