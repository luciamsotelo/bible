// src/components/Bio.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../styles/bio.css'; // Import your CSS file

const characters = [
  {
    name: 'Jesus',
    image: '/images/jesus.jpg',
    description: "I am Jesus, the Son of God, and I came to show everyone how much God loves them. I teach people about kindness, love, and helping others. I performed miracles, like healing the sick and feeding the hungry, to help those in need. My greatest gift is sharing the good news of God’s love with everyone!",
  },
  {
    name: 'Noah',
    image: 'images/noah.jpg',
    description: "I am Noah, a man chosen by God to build a big boat called the Ark. I listened to God when He told me to save the animals and my family from the great flood. With faith and hard work, I helped to keep all the creatures safe. God promised me a rainbow to show His love and that He would never flood the earth again.",
  },
  {
    name: 'David',
    image: 'images/david.jpg',
    description: "I am David, a shepherd boy who became a king because I trusted God. I defeated a giant named Goliath with just a sling and a stone, showing that God gives us courage to face our fears. I love to sing and play music to praise God. I try to be a good leader and care for my people.",
  },
  {
    name: 'John the Baptist',
    image: 'images/john.jpg',
    description: "I am John the Baptist, a messenger sent to prepare the way for Jesus. I tell everyone to turn back to God and be kind to one another. I baptized people in the river to show they wanted to change their hearts. I am excited to tell everyone about the coming Savior!",
  },
  {
    name: 'Daniel',
    image: 'images/daniel.jpg',
    description: "I am Daniel, a faithful servant of God who loved to pray and trust in Him. Even when others tried to make me stop praying, I stayed strong in my faith. Because of my love for God, I was thrown into a den of lions, but God sent an angel to protect me! I am here to show everyone that God is always with us, and when we trust Him, He keeps us safe.",
  },
  {
    name: 'Moses',
    image: 'images/moses.jpg',
    description: "I am Moses, chosen by God to lead His people out of Egypt. I listened to God’s voice from a burning bush and trusted Him to help me. With God’s miracles, I helped my people escape from slavery and crossed the Red Sea. I teach them to follow God’s laws and love one another.",
  },
  {
    name: 'Joseph',
    image: 'images/joseph.jpg',
    description: "I am Joseph, the earthly father of Jesus. I listened to God when He told me to take care of Mary and raise Jesus as my son. I work hard to provide for my family and teach Jesus about love and kindness. God trusted me to guide Him as He grew up.",
  },
  {
    name: 'Mary',
    image: 'images/mary.jpg',
    description: "I am Mary, the mother of Jesus. God chose me to bring His Son into the world, and I said 'yes' to His plan. I love and care for Jesus, teaching Him about God’s love and sharing stories of His goodness. I watched Him grow, filled with kindness and wisdom, and I marveled at the miracles He performed. I am grateful to be part of God’s amazing story and share His love with others, reminding everyone that with faith, anything is possible!",
  },
];

const voiceMapping = {
  Jesus: 'Google UK English Male', 
  Noah: 'Google UK English Male',
  David: 'Google UK English Female',
  'John the Baptist': 'Google US English Male',
  Daniel: 'Google UK English Female',
  Moses: 'Google UK English Male',
  Joseph: 'Google UK English Male',
  Mary: 'Google UK English Female',
};

const BioCard = ({ character }) => {
  const [flipped, setFlipped] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const getVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    speechSynthesis.onvoiceschanged = getVoices;
    getVoices();
  }, []);

  const handleWhoAmI = () => {
    setIsBouncing(true);
    
    // Use speech synthesis to read the description aloud with the specified voice
    const utterance = new SpeechSynthesisUtterance(character.description);
    const selectedVoice = voices.find(voice => voice.name === voiceMapping[character.name]);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    speechSynthesis.speak(utterance);
    
    setTimeout(() => {
      setIsBouncing(false);
    }, 500);
  };

  const handleStopSpeaking = () => {
    speechSynthesis.cancel(); // Stop speaking
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
