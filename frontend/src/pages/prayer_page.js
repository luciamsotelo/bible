import React from 'react';
import Header from '../components/header';
import Prayer from '../components/prayer';
import "../styles/prayer.module.css";

const prayer_page = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="content">
        <Prayer />
      </div>
    </div>
  );
};

export default prayer_page;
