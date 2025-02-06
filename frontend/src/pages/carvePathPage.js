import React from "react";
import CarvePathComp from "../components/carvePath";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/carvePath.module.css"; // Import CSS Module

const CarvePathPage = () => {
  return (
    <div className={`d-flex flex-column ${styles.fullScreen}`}>
      <Header />
      <div className={`flex-grow-1 d-flex align-items-center justify-content-center ${styles.pageContainer}`}>
        <CarvePathComp />
      </div>
      <Footer /> {/* Moved footer outside flex-grow container */}
    </div>
  );
};

export default CarvePathPage;
