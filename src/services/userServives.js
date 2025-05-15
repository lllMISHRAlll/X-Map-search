import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "./constant";

export const saveUserSearch = async (address, coordinates) => {
  try {
    const res = await axiosInstance.post(API_ENDPOINTS.SAVE_LOCATION, {
      address,
      coordinates,
    });
    return res.data;
  } catch (err) {
    toast.error(
      "Failed to save search history:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const getUserHistory = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.GET_LOCATIONS);
    return res.data;
  } catch (err) {
    toast.error(
      "Failed to fetch user history:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const deleteUserSearch = async (id) => {
  try {
    const res = await axiosInstance.delete(
      `${API_ENDPOINTS.DELETE_LOCATION}/${id}`
    );
    return res.data;
  } catch (err) {
    toast.error(
      "Failed to delete search item:",
      err.response?.data || err.message
    );
    throw err;
  }
};
