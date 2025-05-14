import axios from "axios";

export const loginUser = async (data) => {
  try {
    const res = await axios.post("/api/auth/login", data);
    return res.data;
  } catch (err) {
    console.error("Login error", err);
  }
};

export const signupUser = async (data) => {
  try {
    const res = await axios.post("/api/auth/signup", data);
    return res.data;
  } catch (err) {
    console.error("Signup error", err);
  }
};
