import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import cartIcon from "../../assets/logos/cart1.svg"

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    const handleProduct = () => {
        navigate(`/${product._id}`);
      };

      const handleAddToCart = (e) => {
        alert("Done2");
      };

    return (
        <div onClick={handleProduct} className={styles.productCard}>
            <div className={styles.product_image_div}>
                <img
                    loading="lazy"
                    src={product.images[0]}
                    alt={product.name}
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
                <span>{product?.color}</span>
                <span> | </span>
                <span>{product?.type}</span>
            </div>
        </div>)
}

export default ProductCard;