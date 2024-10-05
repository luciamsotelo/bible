// src/components/Bio.js
import React, { useState } from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';


const Bio = () => {
    // Data for 9 biblical figures
    const characters = [
        { name: 'Jesus', bio: 'Jesus is the central figure of Christianity, believed to be the Son of God and the awaited Messiah.', image: '/images/jesus.jpg' },
        { name: 'Noah', bio: 'Noah built an ark to save his family and two of every kind of animal from the Great Flood.', image: '/images/noah.jpg' },
        { name: 'David', bio: 'David was the second king of Israel and is known for defeating Goliath with a slingshot.', image: '/images/david.jpg' },
        { name: 'Goliath', bio: 'Goliath was a giant Philistine warrior defeated by young David with a stone and a sling.', image: '/images/goliath.jpg' },
        { name: 'Daniel', bio: 'Daniel was a prophet known for his unwavering faith, even in the lion\'s den.', image: '/images/daniel.jpg' },
        { name: 'Jonah', bio: 'Jonah was swallowed by a large fish for refusing God’s call, later repenting and delivering God’s message.', image: '/images/jonah.jpg' },
        { name: 'Moses', bio: 'Moses led the Israelites out of Egypt and received the Ten Commandments from God.', image: '/images/moses.jpg' },
        { name: 'Joseph', bio: 'Joseph, sold into slavery by his brothers, rose to power in Egypt and saved his family from famine.', image: '/images/joseph.jpg' },
        { name: 'Mary', bio: 'Mary is the mother of Jesus, venerated for her obedience and faith.', image: '/images/mary.jpg' }
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
            <Card className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
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
                        <Card.Title>{character.name}</Card.Title>
                        <Card.Text>{character.bio}</Card.Text>
                    </Card.Body>
                </div>
            </Card>
        </div>
    );
};

export default Bio;
