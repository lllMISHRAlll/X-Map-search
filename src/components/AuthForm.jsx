import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "../styleSheets/auth.module.css";
import { toast } from "react-toastify";

export default function AuthForm({ type, onSubmit }) {
  const isSignup = type === "signup";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    agreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isValidPassword = formData.password.length >= 6;

  const formValid =
    isValidEmail &&
    isValidPassword &&
    (!isSignup || formData.username) &&
    formData.agreed;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;
    await onSubmit(formData);
    navigate("/dashboard");
    toast.success(
      isSignup ? "Signed up successfully" : "Logged in successfully"
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src="X symbol.png" alt="Logo" className={styles.logo} />
        <h1>{isSignup ? "Sign Up" : "Login"}</h1>
        <p>
          {isSignup ? (
            "Create your account to get started."
          ) : (
            <>
              Please log in using your authorized credentials to access the{" "}
              platform.
            </>
          )}
        </p>
      </div>

      <form
        className={`${styles.form} ${!isSignup ? styles.loginForm : ""}`}
        onSubmit={handleSubmit}
      >
        <div
          className={`${
            !isSignup ? styles.inputWrapper : styles.inputWrapperSignUp
          } ${styles.emailWrapper}`}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formData.email && (
            <Icon
              icon="material-symbols:close"
              className={styles.clearIcon}
              onClick={() => setFormData((prev) => ({ ...prev, email: "" }))}
            />
          )}
          {formData.email && !isValidEmail && (
            <span className={styles.error}>Enter a valid email address</span>
          )}
        </div>

        <div className={`${styles.passwordWrapper}`}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Icon
            icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
            className={styles.eyeIcon}
            onClick={() => setShowPassword((prev) => !prev)}
          />
          {formData.password && !isValidPassword && (
            <span className={styles.error}>
              Password must be at least 6 characters
            </span>
          )}
        </div>

        {isSignup && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </>
        )}

        <a href="#" className={styles.forgot}>
          FORGOT PASSWORD?
        </a>

        <div className={styles.options}>
          <label>
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />
            I agree to the <span>terms & policy.</span>
          </label>
        </div>

        <button type="submit" disabled={!formValid}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <div className={styles.divider}></div>

        <div className={styles.oauth}>
          <button type="button">
            <img src="google icon.png" alt="Google" />
            Sign in with Google
          </button>
          <button type="button">
            <img src="apple icon.png" alt="Apple" />
            Sign in with Apple
          </button>
        </div>

        <p className={styles.toggle}>
          {isSignup ? (
            <>
              Already have an account? <Link to="/login">Sign In</Link>
            </>
          ) : (
            <>
              New here? <Link to="/signup">Sign Up</Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
