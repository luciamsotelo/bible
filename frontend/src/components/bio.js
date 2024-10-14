// src/components/Bio.js
import React, { useState } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";

const Bio = () => {
  // Data for 9 biblical figures
  const characters = [
    {
      name: "Jesus",
      bio: "Jesus is the Son of God and the Messiah. He teaches us to love, be kind, and forgive others. He performed amazing miracles and gave his life to save everyone from their mistakes.",
      image: "/images/jesus.jpg",
    },
    {
      name: "Noah",
      bio: "Noah built a big boat called an ark to save his family and two of every kind of animal from a huge flood that God sent to cleanse the earth.",
      image: "/images/noah.jpg",
    },
    {
      name: "David",
      bio: "David was the second king of Israel and is famous for defeating a giant named Goliath with just a slingshot and a stone.",
      image: "/images/david.jpg",
    },
    {
      name: "John the Baptist",
      bio: "John the Baptist was a prophet who baptized Jesus in the river. He told everyone to turn away from their wrongdoings and get ready for Jesus, the Messiah.",
      image: "/images/john.jpg",
    },
    {
      name: "Daniel",
      bio: "Daniel was a brave prophet who trusted God completely, even when he was thrown into a lion's den for praying to God.",
      image: "/images/daniel.jpg",
    },
    {
      name: "Jonah",
      bio: "Jonah was a man who tried to run away from God but ended up in the belly of a large fish. He learned to listen to God and shared God’s message after he was saved.",
      image: "/images/jonah.jpg",
    },
    {
      name: "Moses",
      bio: "Moses was chosen by God to lead the Israelites out of Egypt. He received the Ten Commandments, which are rules for how to live a good life.",
      image: "/images/moses.jpg",
    },
    {
      name: "Joseph",
      bio: "Joseph was sold into slavery by his jealous brothers but later became a powerful leader in Egypt. He helped save his family from hunger during a great famine.",
      image: "/images/joseph.jpg",
    },
    {
      name: "Mary",
      bio: "Mary is the mother of Jesus. She is admired for her great faith and obedience to God, showing us the importance of trusting Him.",
      image: "/images/mary.jpg",
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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
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
            <Card.Text>{character.bio}</Card.Text>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default Bio;
