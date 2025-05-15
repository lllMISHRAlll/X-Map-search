import axios from "axios";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "./constant";

export const loginUser = async (data) => {
  try {
    const res = await axios.post(API_ENDPOINTS.LOGIN, data);
    const { token, user } = res.data;

    localStorage.setItem("token", token);

    return res.data;
  } catch (err) {
    console.log("err.response :", err.response);
    toast.error(err.response?.data.message || err.message || "Login Error");
    throw err;
  }
};

export const signupUser = async (data) => {
  try {
    const res = await axios.post(API_ENDPOINTS.REGISTER, data);
    const { token, user } = res.data;

    localStorage.setItem("token", token);

    return res.data;
  } catch (err) {
    toast.error("Signup error", err.response?.data.message || err.message);
    throw err;
  }
};

export const getUser = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.GET_USER);
    return res.data.user;
  } catch (err) {
    toast.error("Failed to fetch user:", err.response?.data || err.message);
    throw err;
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
    return res;
  } catch (err) {
    toast.error("Failed", err.response?.data.message || err.message);
    throw err;
  }
};
export const resetPassword = async (payload) => {
  try {
    const res = await axios.post(API_ENDPOINTS.RESET_PASSWORD, { ...payload });
    return res;
  } catch (err) {
    toast.error("Failed", err.response?.data.message || err.message);
    throw err;
  }
};

export const logoutUser = () => {
  localStorage.clear();
  toast.success("Logout Successfully");
  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
};
