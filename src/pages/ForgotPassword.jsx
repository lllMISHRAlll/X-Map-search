import { useState } from "react";
import styles from "../styleSheets/auth.module.css";
import { Icon } from "@iconify/react";
import { forgotPassword } from "../services/authServices";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setIsValidEmail(false);
    }

    if (!validateEmail(email)) return;
    try {
      setIsLoading(true);
      const res = await forgotPassword(email);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Something went wrong. Please try again later.");
    }
    setEmail("");
    setEmailSent(true);
    setIsLoading(false);
    toast.info("If this email exists, a reset link has been sent.");
  };

  return (
    <div className={styles.forgotContainer}>
      <div className={styles.left}>
        <img src="X symbol.png" alt="Logo" className={styles.logo} />
        <h1>Forgot Password</h1>
        <p>Enter your registered email to receive a reset link.</p>
      </div>

      <form className={styles.forgotForm} onSubmit={handleSubmit}>
        <div className={styles.forgotInputWrapper}>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={email}
            onChange={handleChange}
          />
          {email && (
            <Icon
              icon="material-symbols:close"
              className={styles.clearIcon}
              onClick={() => setEmail("")}
            />
          )}
          {!isValidEmail && (
            <span className={styles.error}>Enter a valid email address</span>
          )}
        </div>

        <button type="submit" disabled={!isValidEmail || isLoading}>
          {isLoading ? "Loading..." : "Send Reset Link"}
        </button>

        {emailSent && <p className={styles.success}>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
