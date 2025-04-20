import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const RandomPrayer = () => {
  const [prayer, setPrayer] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    fetch('/prayer.json')
      .then(res => res.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setPrayer(data[randomIndex].prayer);
        setIsPageLoaded(true);
      })
      .catch(err => console.error('Error loading prayers:', err));

    const timer = setTimeout(() => setShowButton(true), 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isPageLoaded) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center px-4" style={{ maxWidth: '800px' }}>
      <h3>
        {prayer.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index !== prayer.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </h3>
      <div className="mt-4" style={{ minHeight: '60px' }}>
  <Link
    to="/"
    className="btn btn-light mt-3"
    style={{ visibility: showButton ? 'visible' : 'hidden' }}
  >
    Home
  </Link>
</div>
    </div>
  );
};

export default RandomPrayer;

