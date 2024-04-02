import React, { useState } from "react";
import styles from "./Signup.module.css";
import musiclogo from "../../assets/logos/musiclogo.svg";
import { useNavigate } from "react-router-dom";
import SignupPage from "../../components/SignupPage/Signup";

function LoginSignup() {
    const navigate = useNavigate();

    const showSignin = () => {
        navigate('/login');
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginHeader}>
                <img className={styles.musiclogo} src={musiclogo} alt="Music Logo" />
                <h1 className={styles.loginTitle}>Musicart</h1>
            </div>
            <div className={styles.formDiv}>
                    <div className={styles.signupFormContainer}>
                        <SignupPage />
                        {/* Redirect to Signin */}
                        <div className={styles.signupFooter}>
                            <p className={styles.signupFooterP}>Already have an account? <span className={styles.signInRedirect} onClick={showSignin}>Sign in</span></p>
                        </div>
                    </div>
            </div>
            {/* Footer */}
            <div className={styles.loginFooter}>
                <p className={styles.footerText}>Musicart | All rights reserved</p>
            </div>
        </div>
    );
}

export default LoginSignup;
