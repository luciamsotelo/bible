// src/components/Bio.js
import React, { useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import "../styles/bio.css"; // Ensure you have responsive styles

const characters = [
  {
    name: "Jesus",
    image: "/images/jesus.jpg",
    description:
      "I am Jesus, the Son of God, and I came to show everyone how much God loves them. I teach people about kindness, love, and helping others. I performed miracles, like healing the sick and feeding the hungry, to help those in need. My greatest gift is sharing the good news of God’s love with everyone!",
    audioFile: "/songs/jesusBio.mp3",
  },
  {
    name: "Noah",
    image: "/images/noah.jpg",
    description:
      "I am Noah, a man chosen by God to build a big boat called the Ark. I listened to God when He told me to save the animals and my family from the great flood. With faith and hard work, I helped to keep all the creatures safe. God promised me a rainbow to show His love and that He would never flood the earth again.",
    audioFile: "/songs/noahBio.mp3",
  },
  {
    name: "David",
    image: "/images/david.jpg",
    description:
      "I am David, a shepherd boy who became a king because I trusted God. I defeated a giant named Goliath with just a sling and a stone, showing that God gives us courage to face our fears. I love to sing and play music to praise God. I try to be a good leader and care for my people.",
    audioFile: "/songs/davidBio.mp3",
  },
  {
    name: "John the Baptist",
    image: "/images/john.jpg",
    description:
      "I am John the Baptist, a messenger sent to prepare the way for Jesus. I tell everyone to turn back to God and be kind to one another. I baptized people in the river to show they wanted to change their hearts. I am excited to tell everyone about the coming Savior!",
    audioFile: "/songs/johnbaptistBio.mp3",
  },
  {
    name: "Daniel",
    image: "/images/daniel.jpg",
    description:
      "I am Daniel, a faithful servant of God who loved to pray and trust in Him. Even when others tried to make me stop praying, I stayed strong in my faith. Because of my love for God, I was thrown into a den of lions, but God sent an angel to protect me! I am here to show everyone that God is always with us, and when we trust Him, He keeps us safe.",
    audioFile: "/songs/danielBio.mp3",
  },
  {
    name: "Moses",
    image: "/images/moses.jpg",
    description:
      "I am Moses, chosen by God to lead His people out of Egypt. I listened to God’s voice from a burning bush and trusted Him to help me. With God’s miracles, I helped my people escape from slavery and crossed the Red Sea. I teach them to follow God’s laws and love one another.",
    audioFile: "/songs/mosesBio.mp3",
  },
  {
    name: "Joseph",
    image: "/images/joseph.jpg",
    description:
      "I am Joseph, the earthly father of Jesus. I listened to God when He told me to take care of Mary and raise Jesus as my son. I work hard to provide for my family and teach Jesus about love and kindness. God trusted me to guide Him as He grew up.",
    audioFile: "/songs/josephBio.mp3",
  },
  {
    name: "Mary",
    image: "/images/mary.jpg",
    description:
      "I am Mary, the mother of Jesus. God chose me to bring His Son into the world, and I said 'yes' to His plan. I love and care for Jesus, teaching Him about God’s love and sharing stories of His goodness. I watched Him grow, filled with kindness and wisdom, and I marveled at the miracles He performed. I am grateful to be part of God’s amazing story and share His love with others, reminding everyone that with faith, anything is possible!",
    audioFile: "/songs/maryBio.mp3",
  },
];

const BioCard = ({ character }) => {
  const [flipped, setFlipped] = useState(false);
  const [audio, setAudio] = useState(null); // Store the audio instance
  const [audioPosition, setAudioPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const handlePlayAudio = () => {
    if (!audio) {
      // Create a new audio instance if one doesn't exist
      const newAudio = new Audio(character.audioFile);
      newAudio.currentTime = audioPosition; // Start from the saved position
      newAudio.play();
      setAudio(newAudio);
      setIsPaused(false); // Audio is now playing

      newAudio.addEventListener("ended", () => {
        setAudio(null); // Reset audio when it ends
        setAudioPosition(0); // Reset position
        setIsPaused(true); // Set to paused when the audio ends
      });
    } else {
      // Resume playback from the saved position
      audio.currentTime = audioPosition;
      audio.play();
      setIsPaused(false); // Audio is now playing
    }
  };

  const handlePauseAudio = () => {
    if (audio) {
      setAudioPosition(audio.currentTime); // Save the current playback position
      audio.pause();
      setIsPaused(true); // Audio is now paused
    }
  };

  const handleStopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset audio to the start
      setAudioPosition(0); // Reset playback position
      setAudio(null);
      setIsPaused(true); // Set to paused when audio is stopped
    }
  };

  return (
    <Col xs={12} sm={6} md={4} className="bio-mb-4">
      <Card
        className={`bio-character-card mt-5 ${flipped ? "bio-flipped" : ""}`}
      >
        <Card.Img variant="top" src={character.image} alt={character.name} />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          {!flipped ? (
            <Button variant="primary" onClick={() => setFlipped(true)}>
              Learn About Me
            </Button>
          ) : (
            <div>
              <p>{character.description}</p>
              <Button variant="success" onClick={handlePlayAudio}>
                Who Am I?
              </Button>{" "}
              <Button
                variant="info"
                onClick={isPaused ? handlePlayAudio : handlePauseAudio}
              >
                {isPaused ? "Continue Playing" : "Pause the Speaker"}
              </Button>{" "}
              <Button variant="danger" onClick={handleStopAudio}>
                Stop Audio
              </Button>{" "}
              <Button variant="secondary" onClick={() => setFlipped(false)}>
                Back
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

const Bio = () => {
  return (
    <Container className="bio-container">
      <Row className="bio-justify-content-center">
        {characters.map((character, index) => (
          <BioCard key={index} character={character} />
        ))}
      </Row>
    </Container>
  );
};

export default Bio;
