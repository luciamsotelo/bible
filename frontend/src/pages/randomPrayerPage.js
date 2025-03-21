import React from 'react';
import RandomPrayer from '../components/randomPrayer';
import Header from '../components/header';

const RandomPrayerPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-black text-white">
      <Header />
      {/* Ensures RandomPrayer takes up only the remaining space */}
      <div className="d-flex flex-grow-1 align-items-center justify-content-center">
        <RandomPrayer />
      </div>
    </div>
  );
};

export default RandomPrayerPage;

