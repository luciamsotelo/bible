import React, { useState, useRef } from "react";
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

const BioCard = ({ character, isSelected, onSelect, flipped, onFlip }) => {
  const [audio, setAudio] = useState(null);
  const [audioPosition, setAudioPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const handlePlayAudio = () => {
    if (!audio) {
      const newAudio = new Audio(character.audioFile);
      newAudio.currentTime = audioPosition;
      newAudio.play();
      setAudio(newAudio);
      setIsPaused(false);
      newAudio.addEventListener("ended", () => {
        setAudio(null);
        setAudioPosition(0);
        setIsPaused(true);
      });
    } else {
      audio.currentTime = audioPosition;
      audio.play();
      setIsPaused(false);
    }
  };

  const handlePauseAudio = () => {
    if (audio) {
      setAudioPosition(audio.currentTime);
      audio.pause();
      setIsPaused(true);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} className="bio-m1-">
      <Card
        className={`bio-character-card mt-1 ${flipped ? "bio-flipped" : ""} ${isSelected ? "centered-card" : ""}`}
        onClick={() => onSelect(character.name)}
        data-name={character.name} // Added for scroll targeting
      >
        <Card.Img variant="top" src={character.image} alt={character.name} />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          {!flipped ? (
            <Button variant="primary" onClick={() => onFlip(character.name)}>
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
                className={audio && !isPaused ? "playing" : ""}
              >
                {isPaused ? "Keep Listening!" : "Pause the Story"}
              </Button>{" "}
              <Button variant="secondary" onClick={() => onFlip(null)}>
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
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const containerRef = useRef(null);

  const handleSelectCharacter = (name) => {
    setSelectedCharacter(name);
    const card = containerRef.current.querySelector(`.bio-character-card[data-name='${name}']`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleFlipCard = (name) => {
    setFlippedCard(name === flippedCard ? null : name);
  };

  return (
    <div className="bio-container-wrapper">
      <Container className="bio-container" ref={containerRef}>
        <h1
          className="text-center animate__animated animate__bounceIn"
          style={{
            color: "#FF4500",
            textShadow: "2px 2px 5px #FFD700",
            fontFamily: "'Bubblegum Sans', cursive",
            fontSize: "3rem",
            marginBottom: "20px",
          }}
        >
          Meet Your Bible Buddies!
        </h1>
        <p className="text-center" style={{ fontSize: "1rem", fontFamily: "quicksand" }}>Welcome to your Bible Buddy adventure! Click on any character card to learn more about their story and hear their message. Each card can be flipped to reveal fun facts and inspiring words. Tap the buttons to listen to their stories, and discover how they trusted God in amazing ways! <br/><i>"I am the way, the truth, and the life." – John 14:6</i></p>
        <Row className="bio-justify-content-center">
          {characters.map((character, index) => (
            <BioCard
              key={index}
              character={character}
              isSelected={selectedCharacter === character.name}
              onSelect={handleSelectCharacter}
              flipped={flippedCard === character.name}
              onFlip={handleFlipCard}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Bio;