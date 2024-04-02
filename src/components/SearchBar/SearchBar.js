import React, { useState } from "react";
import styles from "./SearchBar.module.css"
import searchIcon from "../../assets/logos/search.svg"

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className={styles.search_container}>
            <input
                type="text"
                value={query}
                className={styles.search_input}
                onChange={handleChange}
                placeholder="Search By Product Name"
            />
            <img className={styles.search_icon} src={searchIcon} alt="searchIcon" />

        </div>
    );
};

export default SearchBar;
