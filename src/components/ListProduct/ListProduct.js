import React from "react";
import styles from "./ListProduct.module.css";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/logos/cart1.svg";
import axios from "axios";
import { BACKEND_URL } from "../../constants/baseurl";

const ListProduct = ({ product }) => { // Receive updateCartCount prop
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleAddToCart = async () => {
    try {
      await axios.post(`${BACKEND_URL}/cart`, { productId: product._id });
      updateCartCount();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
      // Fetch cart items count from the backend
      const updateCartCount = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/cart`);
            const { cartItems } = response.data;
            console.log(response.data);
            let count = 0;
            cartItems.forEach((item) => {
                count += item.count;
                console.log(count);
                localStorage.setItem("count", count);
            });
            // setCartCount(count);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

  return (
    <div className={styles.productList_container}>
      <div className={styles.product_image_div}>
        <img
          src={product?.images[0]}
          alt={product?.name}
          className={styles.productImage}
        />
        {user && (
          <img
            onClick={handleAddToCart}
            className={styles.cartIcon}
            src={cartIcon}
            alt="cartIcon"
          />
        )}
      </div>
      <div className={styles.product_desc}>
        <h2 className={styles.productTitle}>{product.title}</h2>
        <p className={styles.productPrice}> Price : ₹ {product.price}</p>
        <p className={styles.product_details}>{product.description}</p>
        <span>{product?.color}</span>
        <span> | </span>
        <span>{product?.type}</span>

        <button
          onClick={() => navigate(`/${product._id}`)}
          className={styles.detail_btn}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ListProduct;
