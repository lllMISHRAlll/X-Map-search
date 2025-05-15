import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem("token");

export const saveUserSearch = async (address, coordinates) => {
  try {
    const res = await axios.post(
      `${API}/api/search/save`,
      { address, coordinates },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error(
      "Failed to save search history:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const getUserHistory = async () => {
  try {
    const res = await axios.get(`${API}/api/search/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error(
      "Failed to fetch user history:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const deleteUserSearch = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API}/api/search/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
