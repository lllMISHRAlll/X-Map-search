import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../styleSheets/auth.module.css";
import { Icon } from "@iconify/react";
import { resetPassword } from "../services/authServices";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setFormError("Invalid or expired password reset link.");
    }
  }, [token]);

  const handleChange = (e) => {
    setFormError("");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await resetPassword({
        token,
        newPassword: formData.password,
      });

      toast.success("Password reset successful. You can now log in.");
      setFormData({ password: "", confirmPassword: "" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong.";
      setFormError(msg);
    }
  };

  return (
    <div className={styles.forgotContainer}>
      <div className={styles.left}>
        <img src="X symbol.png" alt="Logo" className={styles.logo} />
        <h1>Reset Password</h1>
        <p>Set a new password for your account.</p>
      </div>

      <form className={styles.forgotForm} onSubmit={handleSubmit}>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="New password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Icon
            icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
            className={styles.fEyeIcon}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {formError && <span className={styles.error}>{formError}</span>}
        {successMessage && (
          <span className={styles.success}>{successMessage}</span>
        )}

        <button type="submit" disabled={!token}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
