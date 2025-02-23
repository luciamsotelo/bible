import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import biblePicture from "../images/bible.jpg";
import MemoryVerse from "../components/memory_verse";
import { Image } from "react-bootstrap";
import styles from "../styles/home_page.module.css";

const HomePage = () => {
  return (
    <div>
      <Header />
      <MemoryVerse />
      <div className="text-center">
        <Image
          className={`rounded ${styles.responsiveImage}`}
          src={biblePicture}
          alt="Bible"
        />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
