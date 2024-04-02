import React from "react";
import styles from "./Card.module.css";
import modellogo from "../../assets/logos/modellogo.svg";

const Card = () => {
    return (
        <div className={styles.bannerContainer}>
            <div className={styles.bannerDiv}>
                <div className={styles.bannerleft}>
                    <p className={styles.bannerHeading}>Grab upto 50% off on Selected headphones</p>
                </div>
                <div className={styles.bannerright}>
                    <img src={modellogo} alt="logo" />
                </div>
            </div>
        </div>
    )
}

export default Card;