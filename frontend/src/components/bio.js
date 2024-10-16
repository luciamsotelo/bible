// src/components/Bio.js
import React, { useState, useRef } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../styles/bio.css'; // Import your CSS file

const characters = [
  {
    name: 'Jesus',
    image: '/images/jesus.jpg',
    description: "I am Jesus, the Son of God.",
    audio: 'songs/jesusbio.mp3',
  },
  {
    name: 'Noah',
    image: 'images/noah.jpg',
    description: "I am Noah, I built the Ark.",
    audio: 'path/to/noah.mp3',
  },
  {
    name: 'David',
    image: 'images/david.jpg',
    description: "I am David, a king and a shepherd.",
    audio: 'path/to/david.mp3',
  },
  {
    name: 'John the Baptist',
    image: 'images/john.jpg',
    description: "I am John, the one who baptized Jesus.",
    audio: 'path/to/john.mp3',
  },
  {
    name: 'Daniel',
    image: 'path/to/daniel.jpg',
    description: "I am Daniel, a prophet in Babylon.",
    audio: 'path/to/daniel.mp3',
  },
  {
    name: 'Moses',
    image: 'path/to/moses.jpg',
    description: "I am Moses, I led the Israelites out of Egypt.",
    audio: 'path/to/moses.mp3',
  },
  {
    name: 'Joseph',
    image: 'path/to/joseph.jpg',
    description: "I am Joseph, the dreamer sold into slavery.",
    audio: 'path/to/joseph.mp3',
  },
  {
    name: 'Mary',
    image: 'path/to/mary.jpg',
    description: "I am Mary, the mother of Jesus.",
    audio: 'path/to/mary.mp3',
  },
];

const BioCard = ({ character }) => {
  const [flipped, setFlipped] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const audioRef = useRef(null); // using useRef for better performance

  const handleWhoAmI = () => {
    setIsBouncing(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
    
    setTimeout(() => {
      setIsBouncing(false);
    }, 500);
  };

  const handleStopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setFlipped(false); // Flip the card back to the front
  };

  return (
    <Col md={6} lg={4} className="mb-4"> {/* Responsive columns */}
      <Card className={`character-card ${flipped ? 'flipped' : ''}`}>
        <Card.Body className={`card-body ${isBouncing ? 'bounce-animation' : ''}`}>
          <Card.Img variant="top" src={character.image} alt={character.name} />
          <Card.Title>{character.name}</Card.Title>
          <Button className="info-button" onClick={() => setFlipped(!flipped)}>
            {flipped ? 'Back' : 'Learn About Me'}
          </Button>
          <audio ref={audioRef} src={character.audio} />
        </Card.Body>
        {flipped && (
          <div className="card-body-back">
            <p>{character.description}</p>
            <Button className="action-button" onClick={handleWhoAmI}>Who Am I?</Button>
            <Button className="action-button" onClick={handleStopSpeaking}>Stop Speaking</Button>
          </div>
        )}
      </Card>
    </Col>
  );
};

const Bio = () => {
  return (
    <Row>
      {characters.map((character, index) => (
        <BioCard key={index} character={character} />
      ))}
    </Row>
  );
};

export default Bio;
