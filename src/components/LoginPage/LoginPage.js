import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify CSS
import styles from "./LoginPage.module.css";
import axios from "axios";
import { BACKEND_URL } from "../../constants/baseurl";

const LoginPage = () => {
    const [emailOrMobile, setEmailOrMobile] = useState('');
    const [password, setPassword] = useState("");
    const [emailOrMobileError, setEmailOrMobileError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);

        // Validation
        if (!emailOrMobile.trim()) {
            setEmailOrMobileError("*Email or mobile number is required");
            setIsLoginLoading(false);
            return;
        } else {
            setEmailOrMobileError("");
        }

        if (!password.trim()) {
            setPasswordError("*Password is required");
            setIsLoginLoading(false);
            return;
        } else {
            setPasswordError("");
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/users/login`, {
                emailOrMobile,
                password,
            });

            // Handle successful login response
            console.log("Login successful:", response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            
            // Display toast message
            toast.success("Login successful", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate("/"); // Navigate to dashboard
            }, 2000);

        } catch (err) {
            // Handle login error
            console.error("Login failed:", err);

            // Handle specific error responses
            if (err.response && err.response.status === 400) {
                // Handle specific HTTP status code errors
                // For example, display a message to the user
                console.error("Invalid credentials. Please try again.");
            } else {
                // Handle other types of errors (e.g., network errors)
                console.error("Network error. Please try again later.");
            }
        }

        setIsLoginLoading(false);
    };

    return (
        <div className={styles.loginFormContainer}>
            <div className={styles.loginForm}>
                <h1 className={styles.loginFormHeader}>Sign in</h1>
                <form className={styles.formContainer} onSubmit={handleLogin}>
                    {/* Email/Mobile Input */}
                    <div className={styles.formAttribute}>
                        <label htmlFor="emailOrMobile" className={styles.loginLabel}>Enter your email or mobile number</label>
                        <input
                            type="text"
                            id="emailOrMobile"
                            className={styles.loginInput}
                            value={emailOrMobile}
                            onChange={(e) => setEmailOrMobile(e.target.value)}
                        />
                        {emailOrMobileError && <span className={styles.error}>{emailOrMobileError}</span>}
                    </div>
                    {/* Password Input */}
                    <div className={styles.formAttribute}>
                        <label htmlFor="password" className={styles.loginLabel}>Password</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.loginInput}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <span className={styles.error}>{passwordError}</span>}
                    </div>
                    {/* Continue Button */}
                    <button type="submit" className={styles.loginBtn}>
                        {isLoginLoading ? "Loading..." : "Continue"}
                    </button>
                </form>
                {/* Privacy Notice */}
                <p className={styles.loginP}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
            </div>
            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
