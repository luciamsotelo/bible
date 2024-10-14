// src/components/Bio.js
import React, { useState } from "react";
import { Card, Col, Row, Container, Button } from "react-bootstrap";
import '../styles/bio.css'; // Add your custom styles here

const Bio = () => {
  // Data for 9 biblical figures
  const characters = [
    {
      name: "Jesus",
      bio: "I am Jesus, the Son of God. I teach love, kindness, and forgiveness.",
      image: "/images/jesus.jpg",
      description: "Jesus is the Son of God and the Messiah. He teaches us to love, be kind, and forgive others.",
      audio: "/songs/jesusbio.mp3",
    },
    {
      name: "Noah",
      bio: "I am Noah. I built an ark to save my family and animals from the flood.",
      image: "/images/noah.jpg",
      description: "Noah built a big boat called an ark to save his family and two of every kind of animal from a huge flood.",
      audio: "/songs/noah.mp3",
    },
    {
      name: "David",
      bio: "I am David. I defeated a giant with a slingshot.",
      image: "/images/david.jpg",
      description: "David was the second king of Israel and is famous for defeating a giant named Goliath.",
      audio: "/songs/david.mp3",
    },
    {
      name: "John the Baptist",
      bio: "I am John the Baptist. I prepared the way for Jesus.",
      image: "/images/john.jpg",
      description: "John the Baptist was a prophet who baptized Jesus and told everyone to turn from their wrongdoings.",
      audio: "/songs/john.mp3",
    },
    {
      name: "Daniel",
      bio: "I am Daniel. I trusted God in the lion's den.",
      image: "/images/daniel.jpg",
      description: "Daniel was a brave prophet who trusted God completely, even when he was thrown into a lion's den.",
      audio: "/songs/daniel.mp3",
    },
    {
      name: "Jonah",
      bio: "I am Jonah. I learned to obey God after my adventure in a fish.",
      image: "/images/jonah.jpg",
      description: "Jonah was a man who tried to run away from God but learned to listen to God after being saved from a fish.",
      audio: "/songs/jonah.mp3",
    },
    {
      name: "Moses",
      bio: "I am Moses. I led my people out of Egypt.",
      image: "/images/moses.jpg",
      description: "Moses was chosen by God to lead the Israelites out of Egypt and received the Ten Commandments.",
      audio: "/songs/moses.mp3",
    },
    {
      name: "Joseph",
      bio: "I am Joseph. I overcame betrayal and became a leader.",
      image: "/images/joseph.jpg",
      description: "Joseph was sold into slavery by his brothers but later became a powerful leader in Egypt.",
      audio: "/songs/joseph.mp3",
    },
    {
      name: "Mary",
      bio: "I am Mary, the mother of Jesus.",
      image: "/images/mary.jpg",
      description: "Mary is the mother of Jesus, admired for her faith and obedience to God.",
      audio: "/songs/mary.mp3",
    },
  ];

  return (
    <Container fluid>
      <Row className="g-4">
        {characters.map((character, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <FlipCard character={character} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// Card component that flips
const FlipCard = ({ character }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [audio, setAudio] = useState(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = () => {
    const newAudio = new Audio(character.audio);
    newAudio.play();
    setAudio(newAudio);
  };

  const handleStop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset audio to the start
      setAudio(null); // Clear the audio reference
    }
  };

  return (
    <div className="flip-card" onClick={handleFlip}>
      <Card className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* Front of the card */}
        <div className="flip-card-front">
          <Card.Img variant="top" src={character.image} alt={character.name} />
          <Card.Body>
            <Card.Title className="text-center">{character.name}</Card.Title>
          </Card.Body>
        </div>

        {/* Back of the card */}
        <div className="flip-card-back">
          <Card.Body>
            <Card.Text>{character.description}</Card.Text>
            <Button variant="primary" onClick={handleSpeak} className="me-2">
              Who Am I?
            </Button>
            <Button variant="secondary" onClick={handleStop}>
              Stop
            </Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default Bio;
