import React from "react";
import CarvePathComp from "../components/carvePath";

import styles from "../styles/carvePath.module.css"; // Import CSS Module

const CarvePathPage = () => {
  return (
    <div className={`d-flex flex-column ${styles.fullScreen}`}>
      <div className={`flex-grow-1 d-flex align-items-center justify-content-center ${styles.pageContainer}`}>
        <CarvePathComp />
      </div>
  
    </div>
  );
};

export default CarvePathPage;
