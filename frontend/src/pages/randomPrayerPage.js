import React from 'react';
import RandomPrayer from '../components/randomPrayer';
import Header from '../components/header';

const RandomPrayerPage = () => {
  const backgroundStyle = {
    backgroundImage: `url('/images/randomPrayerBgnd.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '30%',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    zIndex: 1,
  };

  return (
    <div
      className="d-flex flex-column min-vh-100 text-white"
      style={backgroundStyle}
    >
      <Header /> {/* Header stays at the top */}
      <div
        className="d-flex flex-grow-1 align-items-center justify-content-center"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <RandomPrayer />
      </div>
      <div style={overlayStyle}></div> {/* Overlay moved below content */}
    </div>
  );
};

export default RandomPrayerPage;