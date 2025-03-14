import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RandomPrayer = () => {
  const [prayer, setPrayer] = useState('');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    fetch('/prayer.json')
      .then(res => res.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setPrayer(data[randomIndex].prayer);
      })
      .catch(err => console.error('Error loading prayers:', err));

    const timer = setTimeout(() => setShowButton(true), 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-black text-white">
      <div className="col-lg-8 col-md-10 col-sm-12 text-center px-4">
        <h3>
          {prayer.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index !== prayer.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h3>
        <div className="mt-4" style={{ minHeight: '50px' }}>
          {showButton && (
            <a href="/" className="btn btn-outline-light">
              Home
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomPrayer;
