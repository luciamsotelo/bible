// src/components/Bio.js
import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../styles/bio.css'; // Import your CSS file

const characters = [
  {
    name: 'Jesus',
    image: '/images/jesus.jpg', // Replace with actual image path
    description: "I am Jesus, the Son of God.",
    audio: 'songs/jesusbio.mp3', // Replace with actual audio path
  },
  {
    name: 'Noah',
    image: 'path/to/noah.jpg',
    description: "I am Noah, I built the Ark.",
    audio: 'path/to/noah.mp3',
  },
  {
    name: 'David',
    image: 'path/to/david.jpg',
    description: "I am David, a king and a shepherd.",
    audio: 'path/to/david.mp3',
  },
  {
    name: 'John the Baptist',
    image: 'path/to/john.jpg',
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
  const [isBouncing, setIsBouncing] = useState(false); // New state for bounce effect
  const audioRef = React.createRef();

  const handleWhoAmI = () => {
    setIsBouncing(true); // Trigger bounce animation
    if (audioRef.current) {
      audioRef.current.play();
    }
    
    // Remove bounce class after animation ends
    setTimeout(() => {
      setIsBouncing(false);
    }, 500); // Duration should match the animation duration
  };

  const handleStopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio
    }
  };

  return (
    <Col md={4} className="mb-4">
      <Card className={`character-card ${flipped ? 'flipped' : ''}`}>
        <Card.Body className={`card-body ${isBouncing ? 'bounce-animation' : ''}`}>
          <Card.Img variant="top" src={character.image} alt={character.name} />
          <Card.Title>{character.name}</Card.Title>
          <Button onClick={() => setFlipped(!flipped)}>
            {flipped ? 'Back' : 'Learn About Me'}
          </Button>
          <audio ref={audioRef} src={character.audio} />
        </Card.Body>
        {flipped && (
          <div className="card-body-back">
            <p>{character.description}</p>
            <Button onClick={handleWhoAmI}>Who Am I?</Button>
            <Button onClick={handleStopSpeaking}>Stop Speaking</Button>
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
