import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // To handle navigation

const BiblePuzzleCards = () => {
  const navigate = useNavigate();

  // Function to handle card clicks and navigate to the puzzle page
  const handleCardClick = (puzzleType) => {
    navigate(`/puzzles/${puzzleType}`);
  };

  const puzzles = [
    { title: "Noah's Ark", img: '/images/puzzleark.jpg', type: 'noah-ark' },
    { title: 'Daniel and the Lion', img: '/images/puzzledanielandlion.jpg', type: 'daniel-lion' },
    { title: 'Joseph and His Coat of Many Colors', img: '/images/jospephCoatColors.png', type: 'joseph-coat' },
    { title: 'Mary with Baby Jesus', img: '/images/MaryWithBaby.webp', type: 'mary-jesus' },
    { title: 'Moses Parting the Red Sea', img: '/images/mosesPartingSea.webp', type: 'moses-sea' },
    { title: 'Garden of Eden', img: '/images/gardenOfEdenPuzzle.png', type: 'garden-eden' },
  ];

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center mb-4" style={{  color: "purple",
          textShadow: "2px 2px 8px white",
          fontFamily: "Allura",
          fontSize: "5rem",
          fontWeight: "bold",}}>Bible Story Puzzles</h1>
          <p className="text-center" style ={{ fontSize: "2rem",  color: "purple", fontFamily: "Quicksand"}}>Select The Puzzle You Want To solve</p>
      <Row xs={1} sm={2} md={3} className="g-4">
        {puzzles.map((puzzle, index) => (
          <Col key={index}>
            <Card onClick={() => handleCardClick(puzzle.type)} className="h-100">
              <Card.Img variant="top" src={puzzle.img} alt={puzzle.title} />
              <Card.Body>
                <Card.Title style={{fontFamily:"quicksand", color: "coral", fontWeight: "bold"}}>{puzzle.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BiblePuzzleCards;
