import axios from "axios";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${API}/api/auth/login`, data);
    const { token, user } = res.data;

    localStorage.setItem("token", token);

    return res.data;
  } catch (err) {
    console.error("Login error", err.response?.data || err.message);
    throw err;
  }
};

export const signupUser = async (data) => {
  try {
    const res = await axios.post(`${API}/api/auth/register`, data);
    const { token, user } = res.data;

    localStorage.setItem("token", token);

    return res.data;
  } catch (err) {
    console.error("Signup error", err.response?.data || err.message);
    throw err;
  }
};

export const getUser = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/user/get");
    return res.data.user;
  } catch (err) {
    console.error("Failed to fetch user:", err.response?.data || err.message);
    throw err;
  }
};

export const logoutUser = () => {
  localStorage.clear();
  window.location.href = "/";
  toast.success("Logout Successfully");
};
