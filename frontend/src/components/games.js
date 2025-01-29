import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Correct import for react-router-dom v6

const GameCards = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Function to handle card clicks
  const handleCardClick = (gameType) => {
    navigate(`/games/${gameType}`); // Use navigate instead of history.push
  };

  const games = [
    { title: 'Puzzle', img: '/images/puzzle.jpg', type: 'puzzle' },
    { title: 'Word Search', img: '/images/wordSearch.png', type: 'wordsearch' },
    { title: 'Maze', img: '/images/maze.jpg', type: 'maze' },
    { title: 'Word Jumble', img: '/images/wordJumble.jpg', type: 'wordjumble' },
    { title: 'Biblical Challenge', img: '/images/hangman.jpg', type: 'hangman' },
    { title: 'Trivia', img: '/images/trivia.png', type: 'trivia' },
  ];

  return (
    <Container className="mt-2">
      <h1 className="text-center mb-2" style={{ color: "purple", textShadow: "2px 2px 8px white", fontFamily: "allura", fontSize: "2.7rem", fontWeight: "bold", }}> Games</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {games.map((game, index) => (
          <Col key={index}>
            <Card onClick={() => handleCardClick(game.type)} className="h-100" style={{ border: "20px inset goldenrod" }}>
              <Card.Img variant="bottom" src={game.img} alt={game.title} />
              <Card.Body>
                <Card.Title className="text-center" style={{ color: "purple", textShadow: "2px 2px 2px goldenrod", fontFamily: "rye", fontSize: "2rem", fontWeight: "", }}>{game.title}</Card.Title>
                <Card.Text className="text-center" style={{ color: "purple", fontFamily: "quicksand", fontSize: "1rem", }}>
                  Click here for a fun {game.title}!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GameCards;
