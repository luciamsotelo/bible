import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
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
    { title: 'Joseph and His Coat of Many Colors', img: '/images/JospephCoatColors.png', type: 'joseph-coat' },
    { title: 'Mary with Baby Jesus', img: '/images/MaryWithBaby.webp', type: 'mary-jesus' },
    { title: 'Moses Parting the Red Sea', img: '/images/mosesPartingSea.webp', type: 'moses-sea' },
    { title: 'Garden of Eden', img: '/images/gardenOfEdenPuzzle.png', type: 'garden-eden' },
  ];

  return (
    <Container className="mt-2">
      {/* Centering title and button */}
      <div className="d-flex flex-column align-items-center mb-4">
        <h1 
          className="text-center mb-1" 
          style={{  
            color: "goldenrod",
            textShadow: "2px 2px 1px black",
            fontFamily: "Allura",
            fontSize: "2.8rem",
            fontWeight: "bold",
          }}
        >
          Puzzles
        </h1>
         {/* Home Button */}
    <nav className="container d-flex justify-content-between ">
  <div className="container d-flex justify-content-between ">
    <Button 
      variant="warning" 
      className="custom-nav-button"
      onClick={() => navigate('/')}
    >
      🏠 Home
    </Button>

    <Button 
      variant="info" 
      className="custom-nav-button"
      onClick={() => navigate('/games')}
    >
      🎮 Games Menu
    </Button>
  </div>
</nav>
      </div>
  
      <p 
        className="text-center" 
        style={{ fontSize: "1.3rem", color: "purple", fontFamily: "Quicksand" }}
      >
      Select a puzzle and uncover God’s story piece by piece!
      </p>
  
      <Row xs={1} sm={2} md={3} className="g-4">
        {puzzles.map((puzzle, index) => (
          <Col key={index}>
            <Card onClick={() => handleCardClick(puzzle.type)} className="h-100">
              <Card.Img variant="top" src={puzzle.img} alt={puzzle.title} />
              <Card.Body>
                <Card.Title style={{ fontFamily: "Quicksand", color: "coral", fontWeight: "bold", textAlign: "center", fontSize: "1rem" }}>
                  {puzzle.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
  
};

export default BiblePuzzleCards;
