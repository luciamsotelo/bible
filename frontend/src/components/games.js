import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/gameCards.css'; // Import the CSS file

const GameCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (gameType) => {
    navigate(`/games/${gameType}`);
  };

  const games = [
    { title: 'Puzzle', img: '/images/puzzle.jpg', type: 'puzzle' },
    { title: 'Word Search', img: '/images/wordSearch.png', type: 'wordsearch' },
    { title: 'Maze', img: '/images/maze.jpg', type: 'maze' },
    { title: 'Word Shuffle', img: '/images/wordJumble.jpg', type: 'wordjumble' },
    { title: 'Biblical Challenge', img: '/images/hangman.jpg', type: 'hangman' },
    { title: 'Trivia', img: '/images/trivia.png', type: 'trivia' },
  ];

  return (
    <Container className="game-cards-container">
      <h1 className="game-title">Games</h1>
      <p className="game-description" style={{ fontSize: "1rem", color: "black", fontFamily: "Quicksand", textAlign: "center"}}>Welcome to our Bible adventure! Choose a game to play and have fun while learning from God’s Word. Each game will help you grow in faith and knowledge. <br/><i>“A joyful heart is good medicine.”</i> – Proverbs 17:22</p>
      <Row xs={1} md={2} lg={3} className="g-4">
        {games.map((game, index) => (
          <Col key={index}>
            <Card onClick={() => handleCardClick(game.type)} className="game-card">
              <Card.Img variant="bottom" src={game.img} alt={game.title} />
              <Card.Body>
                <Card.Title className="game-card-title">{game.title}</Card.Title>
                <Card.Text className="game-card-text">
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
