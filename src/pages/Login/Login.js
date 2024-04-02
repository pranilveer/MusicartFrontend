import React, { useState } from "react";
import styles from "./Login.module.css";
import musiclogo from "../../assets/logos/musiclogo.svg";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../components/LoginPage/LoginPage";

function LoginSignup() {
    const navigate = useNavigate();

    const showSignup = () => {
        navigate('/signup');
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginHeader}>
                <img className={styles.musiclogo} src={musiclogo} alt="Music Logo" />
                <h1 className={styles.loginTitle}>Musicart</h1>
            </div>
            <div className={styles.formDiv}>
                    <div className={styles.loginFormContainer}>
                        <LoginPage />
                        {/* Redirect to Signup */}
                        <div className={styles.loginRedirectText}>
                            <div className={styles.line}></div>
                            <div className={styles.loginRedirect}>New to Musicart?</div>
                            <div className={styles.line}></div>
                        </div>
                        <div>
                            <button className={styles.signupRedirectBtn} onClick={showSignup}>Create your Musicart account</button>
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
