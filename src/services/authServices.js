import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${API}/api/auth/login`, data);
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);

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
    localStorage.setItem("username", user.username);
    localStorage.setItem("email", user.email);

    return res.data;
  } catch (err) {
    console.error("Signup error", err.response?.data || err.message);
    throw err;
  }
};

export const logoutUser = () => {
  localStorage.clear();
  window.location.href = "/";
};
