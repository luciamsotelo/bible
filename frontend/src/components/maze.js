import React, { useState, useEffect } from "react";
import "../styles/maze.css";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Maze = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [goalPosition, setGoalPosition] = useState({ x: 4, y: 4 });
  const [obstacles, setObstacles] = useState([]);
  const [isVictory, setIsVictory] = useState(false);
  const gridSize = 20;

  const navigate = useNavigate();

  useEffect(() => {
    const initializeGame = () => {
      const newGoal = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
      setGoalPosition(newGoal);

      const obstacleCount = 80;
      const newObstacles = [];
      while (newObstacles.length < obstacleCount) {
        const obstacle = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        };
        if (
          !newObstacles.some(
            (obs) => obs.x === obstacle.x && obs.y === obstacle.y
          ) &&
          !(obstacle.x === 0 && obstacle.y === 0) &&
          !(obstacle.x === newGoal.x && obstacle.y === newGoal.y)
        ) {
          newObstacles.push(obstacle);
        }
      }
      setObstacles(newObstacles);
    };

    initializeGame();
  }, [gridSize]);

  const movePlayer = (direction) => {
    setPlayerPosition((prevPosition) => {
      const { x, y } = prevPosition;
      let newPosition = prevPosition;

      switch (direction) {
        case "UP":
          newPosition = y > 0 ? { ...prevPosition, y: y - 1 } : prevPosition;
          break;
        case "DOWN":
          newPosition =
            y < gridSize - 1 ? { ...prevPosition, y: y + 1 } : prevPosition;
          break;
        case "LEFT":
          newPosition = x > 0 ? { ...prevPosition, x: x - 1 } : prevPosition;
          break;
        case "RIGHT":
          newPosition =
            x < gridSize - 1 ? { ...prevPosition, x: x + 1 } : prevPosition;
          break;
        default:
          break;
      }

      if (
        obstacles.some(
          (obs) => obs.x === newPosition.x && obs.y === newPosition.y
        )
      ) {
        return prevPosition;
      }

      return newPosition;
    });
  };

  useEffect(() => {
    if (
      playerPosition.x === goalPosition.x &&
      playerPosition.y === goalPosition.y
    ) {
      setIsVictory(true);
    }
  }, [playerPosition, goalPosition]);

  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 0 });
    setIsVictory(false);
  };

  return (
    <Container className="maze-container text-center">
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate('/games')}>
            Back to Main Game Page
          </Button>
        </Col>
      </Row>
      <h1 className="my-1" style={{ color: "goldenrod", textShadow: "2px 2px 8px black", fontFamily: "allura", fontSize: "3rem", fontWeight: "bold", }}>
        Maze
      </h1>
      <p className="my-1" style ={{ fontSize: "1.2rem",  color: "purple", fontFamily: "Quicksand"}}>Guide the player through the maze! Use the arrow keys or on-screen buttons to find the way to the goal.</p>

      <div className="maze-grid mx-auto">
        {Array.from({ length: gridSize }).map((_, row) => (
          <div key={row} className="maze-row">
            {Array.from({ length: gridSize }).map((_, col) => (
              <div
                key={col}
                className={`maze-cell ${
                  playerPosition.x === col && playerPosition.y === row
                    ? "player"
                    : goalPosition.x === col && goalPosition.y === row
                    ? "goal"
                    : obstacles.some((obs) => obs.x === col && obs.y === row)
                    ? "obstacle"
                    : ""
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>

      {isVictory && (
        <Alert variant="success" className="my-3">
          🎉 You reached the goal! 🎉
          <div>
            <Button onClick={resetGame} className="mt-2">
              Play Again
            </Button>
          </div>
        </Alert>
      )}

      <div className="controls mt-4">
        <Row>
          <Col xs={12}>
            <Button variant="secondary" onClick={() => movePlayer("UP")}>
              &uarr;
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col xs="auto">
            <Button variant="secondary" onClick={() => movePlayer("LEFT")}>
              &larr;
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="secondary" onClick={() => movePlayer("DOWN")}>
              &darr;
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="secondary" onClick={() => movePlayer("RIGHT")}>
              &rarr;
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Maze;
