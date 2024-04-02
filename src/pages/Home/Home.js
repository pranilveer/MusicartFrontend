import React, {useState} from "react";
import styles from "./Home.module.css"
import Header from "../../components/Header/Header1/Header"
import Banner from "../../components/Banner/Banner1/Banner"
import Card from "../../components/Card/Card"
import AllProduct from "../../components/AllProduct/AllProduct"

const Home = () => {

    return (
        <div className={styles.home_container}>
            <Header />
            <Banner />
            <Card />
            <AllProduct />
        </div>
    )
}

export default Home;