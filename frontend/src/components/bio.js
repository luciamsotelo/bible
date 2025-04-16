import React, { useState } from "react";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import styles from "../styles/Bio.module.css"; // Ensure correct case

const characters = [
  {
    name: "Jesus",
    image: "/images/jesus.jpg",
    description:
      "I am Jesus, the Son of God, and I came to show everyone how much God loves them. I teach people about kindness, love, and helping others. I performed miracles, like healing the sick and feeding the hungry, to help those in need. My greatest gift is sharing the good news of God’s love with everyone!",
    audioFile: "/songs/JesusBio.mp3",
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

const BioCard = ({ character, isSelected, onSelect, onDeselect }) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePlayPauseAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      const newAudio = new Audio(character.audioFile);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
      newAudio.addEventListener("ended", () => setIsPlaying(false));
    }
  };

  return (
    <Col xs={12} sm={6} md={4} className={styles.bioCardCol}>
      <Card
        className={`${styles.bioCharacterCard} mt-1 mb-4 ${isSelected ? styles.selectedCard : ""} ${isFlipped ? styles.flipped : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!isSelected) {
            onSelect(character.name);
          }
          setIsFlipped(true);
        }}
      >
        <Card.Img variant="top" src={character.image} alt={character.name} />
        <Card.Body>
          <Card.Title className={`${styles.bioCardTitle} text-center`}>{character.name}</Card.Title>

          {isFlipped ? (
            <div>
              <p>{character.description}</p>
              <Button
                variant={isPlaying ? "danger" : "success"}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPauseAudio();
                }}
              >
                <BsFillVolumeUpFill style={{ fontSize: "25px", marginRight: "5px" }} />
                {isPlaying ? "Pause Audio" : "Who Am I?"}
              </Button>{" "}
              <Button
  variant="secondary"
  onClick={(e) => {
    e.stopPropagation();
    if (audio) {
      audio.pause(); // Stop audio
      audio.currentTime = 0; // Reset audio to the beginning
      setAudio(null); // Remove reference
      setIsPlaying(false); // Update state
    }
    setIsFlipped(false);
    onDeselect();
  }}
>
  Back
</Button>

            </div>
          ) : (
            <p className="text-muted"></p>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

const Bio = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <div className={`${styles.bioContainerWrapper} ${selectedCharacter ? styles.overlayActive : ""}`}>
      <Container className={styles.bioContainer}>
        <h1 className={`text-center ${styles.bioTitle} mt-3`}>Meet Your Bible Buddies!</h1>
        <p className="text-center">Tap a card to discover amazing Bible heroes and their stories. Each friend has something special to share! <br/> <br/><i>"Let the wise listen and add to their learning." — Proverbs 1:5</i></p>
        <Row className={styles.bioJustifyContentCenter}>
          {characters.map((character, index) => (
            <BioCard
              key={index}
              character={character}
              isSelected={selectedCharacter === character.name}
              onSelect={setSelectedCharacter}
              onDeselect={() => setSelectedCharacter(null)}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Bio;
