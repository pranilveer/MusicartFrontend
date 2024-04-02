import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AllProduct.module.css";
import { BACKEND_URL } from "../../constants/baseurl";
import ListProduct from "../ListProduct/ListProduct";
import ProductCard from "../ProductCard/ProductCard";
import SearchBar from "../SearchBar/SearchBar";

import gridIcon from "../../assets/images/grid1.png"
import gridIcon2 from "../../assets/images/grid2.png"
import listIcon from "../../assets/images/list1.png"
import listIcon2 from "../../assets/images/list2.png"

const AllProduct = ({ updateCartCount }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isListView, setIsListView] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    brand: "",
    color: "",
    priceRange: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/product`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  useEffect(() => {
    filterProducts();
  }, [filters]); // Run filterProducts whenever filters change

  const filterProducts = () => {
    let filtered = products;

    if (filters.type !== "") {
      filtered = filtered.filter(product => product.type === filters.type);
    }

    if (filters.brand !== "") {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    if (filters.color !== "") {
      filtered = filtered.filter(product => product.color === filters.color);
    }

    if (filters.priceRange !== "") {
      const [minPrice, maxPrice] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter(product => {
        const price = Number(product.price);
        return price >= minPrice && price <= maxPrice;
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.feature_container}>
        <div className={styles.view_options}>
          <img
            onClick={() => setIsListView(false)}
            src={isListView ? gridIcon : gridIcon2}
            alt="gridIcon"
          />
          <img
            src={isListView ? listIcon2 : listIcon}
            alt="listIcon"
            onClick={() => setIsListView(true)}
          />
        </div>
        <div className={styles.filters_options}>
          <div className={styles.select_type}>
            <select
              className={styles.select_filter}
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Headphone Type</option>
              <option value="In-Ear headphone">In-Ear headphone</option>
              <option value="On-Ear headphone">On-Ear headphone</option>
              <option value="Over-Ear headphone">Over-Ear headphone</option>
            </select>
          </div>
          <div className={styles.select_brand}>
            <select
              className={styles.select_filter}
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
            >
              <option value="">Brand</option>
              <option value="JBL">JBL</option>
              <option value="SONY">SONY</option>
              <option value="ZEBRONICS">ZEBRONICS</option>
              <option value="Marshall">Marshall</option>
              <option value="PTron">PTron</option>
            </select>
          </div>
          <div className={styles.select_color}>
            <select
              className={styles.select_filter}
              name="color"
              value={filters.color}
              onChange={handleFilterChange}
            >
              <option value="">Color</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option>
            </select>
          </div>
          <div className={styles.select_price}>
            <select
              className={styles.select_filter}
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">Price</option>
              <option value="0-1000">₹0 - ₹1000</option>
              <option value="1000-10000">₹1000 - ₹10000</option>
              <option value="10000-20000">₹10000 - ₹20000</option>
              <option value="20000-100000">Above ₹20000</option>
            </select>
          </div>
        </div>
        <div className={styles.sort_options}>
          <select
            className={styles.select_sort}
            // value={sort}
            // onChange={handleFilterChange}
          >
            <option value="">Sort by : Featured</option>
            <option value="price-lowest">Price : Lowest</option>
            <option value="price-highest">Price : Highest</option>
            <option value="title-a-z">Name : A-Z</option>
            <option value="title-z-a">Name : Z-A</option>
          </select>
        </div>
      </div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) =>
          isListView ? (
            <ListProduct
              key={product._id}
              product={product}
              updateCartCount={updateCartCount}
            />
          ) : (
            <ProductCard key={product._id} product={product} />
          )
        )
      ) : (
        <h3>No Results Found...</h3>
      )}
    </div>
  );
};

export default AllProduct;
