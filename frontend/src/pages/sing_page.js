import React, { useEffect, useState } from 'react';
import Sing from '../components/sing';
import { Spinner, Container } from 'react-bootstrap';
import Header from '../components/header'

const SingPage = () => {
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    // Fetch the song data
    fetch('/lyrics/song1.json')
      .then(response => response.json())
      .then(data => setSongData(data))
      .catch(error => console.error('Error loading song data:', error));
  }, []);

  return (
    <div>
    <Header />
      <Container className="sing-page">
        {songData ? (
          <Sing songData={songData} />
        ) : (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </Container>
    </div>
  );
};

export default SingPage;
