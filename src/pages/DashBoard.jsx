import { useState, useEffect } from "react";
import styles from "../styleSheets/dashboard.module.css";
import Map from "../components/Map";
import { Icon } from "@iconify/react";
import { getUserHistory, deleteUserSearch } from "../services/userServives";
import { getUser } from "../services/authServices";
import { toast } from "react-toastify";

export default function DashBoard() {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const toggleHistory = () => setShowHistory((prev) => !prev);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getUserHistory();
      setHistory(data);
    } catch (err) {
      console.error("Error fetching history", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserSearch(id);
      setHistory((prev) => prev.filter((item) => item._id !== id));
      toast.success("History deleted successfully");
    } catch (err) {
      toast.error("Error deleting search entry", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (showHistory) {
      fetchHistory();
    }
  }, [showHistory]);

  console.log("user :", user);

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
            <Icon
              icon={
                showHistory
                  ? "material-symbols:bookmark"
                  : "material-symbols:history"
              }
            />
            <span>History</span>
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
            {loading ? (
              <p style={{ padding: "1rem", color: "#888" }}>
                Loading history...
              </p>
            ) : history.length === 0 ? (
              <p style={{ padding: "1rem", color: "#888" }}>
                No search history yet.
              </p>
            ) : (
              history.map((item, idx) => (
                <div key={idx} className={styles.historyItem}>
                  <div>
                    <Icon icon="humbleicons:location" width="24" />
                    <div>
                      <h4>{item.label || item.address.split(",")[0]}</h4>
                      <p>{item.address}</p>
                    </div>
                  </div>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(item._id)}
                  >
                    <Icon icon="material-symbols:delete" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className={styles.body}>
        <Map onSearchComplete={fetchHistory} user={user} />
      </div>
    </div>
  );
}
