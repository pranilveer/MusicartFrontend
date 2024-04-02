import React, { useState } from "react";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify CSS
import axios from "axios";
import { BACKEND_URL } from "../../constants/baseurl";

const SignupPage = () => {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isSignUpLoading, setIsSignUpLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSignUpLoading(true);

        // Validation
        if (!name.trim()) {
            setNameError("*Name is required");
            setIsSignUpLoading(false);
            return;
        } else {
            setNameError("");
        }

        if (!mobile.trim()) {
            setMobileError("*Mobile number is required");
            setIsSignUpLoading(false);
            return;
        } else {
            setMobileError("");
        }

        if (!email.trim()) {
            setEmailError("*Email is required");
            setIsSignUpLoading(false);
            return;
        } else {
            setEmailError("");
        }

        if (!password.trim()) {
            setPasswordError("*Password is required");
            setIsSignUpLoading(false);
            return;
        } else {
            setPasswordError("");
        }

        // Call validation function for email format
        validateEmail();

        try {
            const response = await axios.post(`${BACKEND_URL}/users/register`, {
                name,
                mobile,
                email,
                password,
            });

            // Handle successful registration response
            console.log("Registration successful:", response.data);
            localStorage.setItem("user", JSON.stringify(response.data));

            toast.success("Registration successful", {
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

            // Redirect or perform further actions based on the response

        } catch (err) {
            // Handle registration error
            console.error("Registration failed:", err);

            // Handle specific error responses
            if (err.response && err.response.status === 400) {
                // Handle specific HTTP status code errors
                // For example, display a message to the user
                console.error("User already exists. Please Login!");
            } else {
                // Handle other types of errors (e.g., network errors)
                console.error("Network error. Please try again later.");
            }
        }

        setIsSignUpLoading(false);
    };

    // Function to validate email format
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid Email Address");
        }
    };

    return (
        <div className={styles.signupForm}>
            <h1 className={styles.signupFormHeader}>Create Account</h1>
            <form className={styles.formContainer} onSubmit={handleRegister}>
                {/* Name Input */}
                <div className={styles.formAttribute}>
                    <label htmlFor="name" className={styles.loginLabel}>Your Name</label>
                    <input
                        type="text"
                        id="name"
                        className={styles.loginInput}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && <span className={styles.error}>{nameError}</span>}
                </div>
                {/* Mobile Input */}
                <div className={styles.formAttribute}>
                    <label htmlFor="mobile" className={styles.loginLabel}>Mobile number</label>
                    <input
                        type="number"
                        id="mobile"
                        className={styles.loginInput}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    {mobileError && <span className={styles.error}>{mobileError}</span>}
                </div>
                {/* Email Input */}
                <div className={styles.formAttribute}>
                    <label htmlFor="email" className={styles.loginLabel}>Email Id</label>
                    <input
                        type="email"
                        id="email"
                        className={styles.loginInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <span className={styles.error}>{emailError}</span>}
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
                {/* Mobile Phone Consent */}
                <p className={styles.signupP}>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.</p>
                {/* Continue Button */}
                <button type="submit" className={styles.signupBtn}>
                    {isSignUpLoading ? "Loading..." : "Continue"}
                </button>
            </form>
            {/* Privacy Notice */}
            <p className={styles.signupP}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
            <ToastContainer />
        </div>
    );
};

export default SignupPage;
