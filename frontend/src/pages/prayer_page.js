import React from 'react';
import Header from '../components/header';
import Prayer from '../components/prayer';
import Footer from '../components/footer';
import "../styles/prayer.css";

const prayer_page = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="content">
        <Prayer />
      </div>
      <Footer />
    </div>
  );
};

export default prayer_page;
