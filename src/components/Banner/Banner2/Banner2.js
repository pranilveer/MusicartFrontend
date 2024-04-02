import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Banner2.module.css";
import logo from "../../../assets/logos/musiclogo.svg";
import cartIcon from "../../../assets/logos/cartIcon.svg";
import axios from "axios";
import { BACKEND_URL } from "../../../constants/baseurl";

const Banner2 = ({pageContent}) => {
    const [cartCount, setCartCount] = useState(0); // State to store cart count
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedData = JSON.parse(userData);
            setUser(parsedData.user); // Access the user object using the key "user"
        }

        // Fetch cart count from the backend when the component mounts
        updateCartCount();
    }, []);

    // Function to fetch cart count from the backend
    const updateCartCount = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/cart`);
            const { cartItems } = response.data;
            let count = 0;
            cartItems.forEach((item) => {
                count += item.count;
            });
            setCartCount(count); // Update cart count state
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.headSection}>
                <div className={styles.logo_container}>
                    <img src={logo} alt="logo" />
                    <h2>Musicart</h2>
                    <p className={styles.route}>
                        <Link to="/">Home</Link> /{pageContent}
                    </p>
                </div>
                <div>
                    {user && (
                        <>
                            <div className={styles.cartDiv}>
                                <div>
                                    <Link to="/cart">
                                        <div className={styles.viewCart_btn}>
                                            <img src={cartIcon} alt="cartIcon" />
                                            <p>View Cart</p>
                                            <p>{cartCount}</p> {/* Display cart count */}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Banner2;
