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
    { title: 'Word Search', img: '/path/to/wordsearch-image.jpg', type: 'wordsearch' },
    { title: 'Maze', img: '/path/to/maze-image.jpg', type: 'maze' },
    { title: 'Word Jumble', img: '/path/to/wordjumble-image.jpg', type: 'wordjumble' },
    { title: 'Hangman', img: '/path/to/hangman-image.jpg', type: 'hangman' },
    { title: 'Trivia', img: '/path/to/trivia-image.jpg', type: 'trivia' },
  ];

  return (
    <Container className="mt-5">
      <Row xs={1} md={2} lg={3} className="g-4">
        {games.map((game, index) => (
          <Col key={index}>
            <Card onClick={() => handleCardClick(game.type)} className="h-100">
              <Card.Img variant="top" src={game.img} alt={game.title} />
              <Card.Body>
                <Card.Title>{game.title}</Card.Title>
                <Card.Text>
                  Click here to explore multiple {game.title} games!
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