import React, { useEffect, useState, } from "react";
import axios from "axios";
import styles from "./ProductDetail.module.css";
import Header from "../Header/Header2/Header2";
import Banner from "../Banner/Banner2/Banner2";
import { BACKEND_URL } from "../../constants/baseurl";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import backIcon from "../../assets/images/back.png";

function ProductDetails() {
    const [product, setProduct] = useState([]);
    const [displayImageIndex, setDisplayImageIndex] = useState(0);
    const { productId } = useParams();
    const navigate = useNavigate();

    // Function to fetch product data from the backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/product/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    // Fetch product data when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const handleAddToCart = async () => {
        try {
          await axios.post(`${BACKEND_URL}/cart`, { productId: productId });
        // Update cart count in localStorage
        const currentCount = localStorage.getItem("count") || 0;
        const newCount = parseInt(currentCount, 10) + 1;
        localStorage.setItem("count", newCount);
        // Navigate to cart page if needed
        // navigate("/cart");
        } catch (error) {
          console.error("Error adding product to cart:", error);
        }
      };
        //   // Fetch cart items count from the backend
        //   const updateCartCount = async () => {
        //     try {
        //         const response = await axios.get(`${BACKEND_URL}/cart`);
        //         const { cartItems } = response.data;
        //         console.log(response.data);
        //         let count = 0;
        //         cartItems.forEach((item) => {
        //             count += item.count;
        //             console.log(count);
        //             localStorage.setItem("count", count);
        //         });
        //         // setCartCount(count);
        //     } catch (error) {
        //         console.error("Error fetching cart items:", error);
        //     }
        // };

    return (
        <>
            <Header />
            {<Banner pageContent={product?.title} />}
            <div div className={styles.container}>

                <button onClick={() => navigate(-1)} className={styles.back_btn}>
                    Back to products
                </button>
                {product ? (
                    <>
                        <div className={styles.product_container}>
                            <p className={styles.about_product}>
                                {product.title} {product.description}
                            </p>
                            <div className={styles.product_details}>
                                {/* {isMobile && (
                                    <button onClick={handleAddToCart} className={styles.buy_btn}>
                                        Buy Now
                                    </button>
                                )}
                                {isMobile && (
                                    <Slider {...slideSettings}>
                                        {product.images.map((image, index) => (
                                            <div className={styles.product_img} key={index}>
                                                <img src={image} alt={product.title} />
                                            </div>
                                        ))}
                                    </Slider>
                                )} */}
                                {product.images && product.images.length > 0 && (
                                    <div className={styles.product_img}>
                                        <img
                                            src={product.images[displayImageIndex]}
                                            alt={product.title}
                                        />
                                    </div>
                                )}
                                <div className={styles.product_desc}>
                                    <h2 className={styles.productTitle}>{product.title}</h2>
                                    <div className={styles.reviews}>
                                        <span>⭐</span>
                                        <span>⭐</span>
                                        <span>⭐</span>
                                        <span>⭐</span>
                                        <span>⭐</span>
                                        <span> (50 Customer reviews)</span>
                                    </div>
                                    {/* {isMobile && (
                                        <p className={styles.about_product}>
                                            {product.title} is {product.description}
                                        </p>
                                    )} */}
                                    <h2 className={styles.productPrice}>
                                        Price - ₹ {product.price}
                                    </h2>
                                    <div>
                                        <span>{product?.color}</span>
                                        <span> | </span>
                                        <span>{product?.type} </span>
                                    </div>
                                    <p className={styles.product_info}>About this Item</p>
                                    <ul>
                                        {product?.details?.map((info, index) => (
                                            <li key={index} className={styles.product_info_list}>
                                                {info}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className={styles.product_available}>
                                        <h3>Available - </h3> <span> In Stock</span>
                                    </div>
                                    <div className={styles.product_available}>
                                        <h3>Brand - </h3> <span> {product.brand}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.product_footer}>
                            {/* {!isMobile && ( */}
                            <div className={styles.product_other_images}>
                                {product?.images?.map((image, index) => (
                                    <div key={index} className={styles.other_images_container}>
                                        <img
                                            key={index}
                                            onMouseEnter={() => setDisplayImageIndex(index)}
                                            src={image}
                                            alt={product.title}
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* )} */}
                            <div className={styles.product_btns}>
                                <button onClick={handleAddToCart} className={styles.cart_btn}>
                                    Add to Cart
                                </button>

                                <button onClick={handleAddToCart} className={styles.buy_btn}>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    // <DetailPageSkeletan />
                    <div>Loading...</div>
                )}
            </div>
            {/* Footer */}
            <div className={styles.loginFooter}>
                <p className={styles.footerText}>Musicart | All rights reserved</p>
            </div>
            {/* {isMobile && <MobileFooter />} */}
        </>
    );
}

export default ProductDetails;