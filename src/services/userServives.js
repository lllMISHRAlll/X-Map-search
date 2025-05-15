import axiosInstance from "./axiosInstance";

export const saveUserSearch = async (address, coordinates) => {
  try {
    const res = await axiosInstance.post("/api/search/save", {
      address,
      coordinates,
    });
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
    const res = await axiosInstance.get("/api/search/get");
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
  try {
    const res = await axiosInstance.delete(`/api/search/delete/${id}`);
    return res.data;
  } catch (err) {
    console.error(
      "Failed to delete search item:",
      err.response?.data || err.message
    );
    throw err;
  }
};
