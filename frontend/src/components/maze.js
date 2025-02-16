import React, { useState, useEffect, useCallback } from "react";
import "../styles/maze.css";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";


const Maze = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [goalPosition, setGoalPosition] = useState(null); // Set to null initially
  const [obstacles, setObstacles] = useState([]);
  const [isVictory, setIsVictory] = useState(false);
  const gridSize = 20;
  const navigate = useNavigate();

  /** Generate a random position */
  const generateRandomPosition = () => ({
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  });

  /** Initialize the game (Goal + Obstacles) */
  useEffect(() => {
    const initializeGame = () => {
      let newGoal;
      do {
        newGoal = generateRandomPosition();
      } while (newGoal.x === 0 && newGoal.y === 0); // Ensure goal doesn't spawn at player start

      setGoalPosition(newGoal);

      // Initialize obstacles
      const obstacleCount = 80;
      const newObstacles = [];

      while (newObstacles.length < obstacleCount) {
        const obstacle = generateRandomPosition();
        if (
          !newObstacles.some((obs) => obs.x === obstacle.x && obs.y === obstacle.y) &&
          !(obstacle.x === 0 && obstacle.y === 0) &&
          !(obstacle.x === newGoal.x && obstacle.y === newGoal.y) // Ensure goal is not blocked
        ) {
          newObstacles.push(obstacle);
        }
      }
      setObstacles(newObstacles);
    };

    initializeGame();
  }, [gridSize]); // Only runs once when the component mounts

  /** Move obstacles every 2 seconds */
  const moveObstaclesIntervalRef = useRef(null);
  const playerRef = useRef(playerPosition);
  const goalRef = useRef(goalPosition);
  
  useEffect(() => {
    playerRef.current = playerPosition; // Keep latest player position
    goalRef.current = goalPosition; // Keep latest goal position
  }, [playerPosition, goalPosition]);
  
  useEffect(() => {
    if (moveObstaclesIntervalRef.current) {
      clearInterval(moveObstaclesIntervalRef.current); // Ensure only one interval runs
    }
  
    moveObstaclesIntervalRef.current = setInterval(() => {
      setObstacles((prevObstacles) =>
        prevObstacles.map((obs) => {
          let newX, newY;
          do {
            newX = Math.max(0, Math.min(gridSize - 1, obs.x + (Math.random() > 0.5 ? 1 : -1)));
            newY = Math.max(0, Math.min(gridSize - 1, obs.y + (Math.random() > 0.5 ? 1 : -1)));
          } while (
            (newX === playerRef.current.x && newY === playerRef.current.y) || 
            (newX === goalRef.current?.x && newY === goalRef.current?.y)
          );
          return { x: newX, y: newY };
        })
      );
    }, 2000); // ✅ Ensures obstacles move every 2 seconds
  
    return () => clearInterval(moveObstaclesIntervalRef.current); // Cleanup interval on unmount
  }, []);


  /** Move player */
  const movePlayer = useCallback((direction) => {
    setPlayerPosition((prevPosition) => {
      const { x, y } = prevPosition;
      let newPosition = prevPosition;

      switch (direction) {
        case "UP":
          newPosition = y > 0 ? { ...prevPosition, y: y - 1 } : prevPosition;
          break;
        case "DOWN":
          newPosition = y < gridSize - 1 ? { ...prevPosition, y: y + 1 } : prevPosition;
          break;
        case "LEFT":
          newPosition = x > 0 ? { ...prevPosition, x: x - 1 } : prevPosition;
          break;
        case "RIGHT":
          newPosition = x < gridSize - 1 ? { ...prevPosition, x: x + 1 } : prevPosition;
          break;
        default:
          break;
      }

      if (obstacles.some((obs) => obs.x === newPosition.x && obs.y === newPosition.y)) {
        return prevPosition;
      }

      return newPosition;
    });
  }, [obstacles, gridSize]);

  /** Check for victory condition */
  useEffect(() => {
    if (goalPosition && playerPosition.x === goalPosition.x && playerPosition.y === goalPosition.y) {
      setIsVictory(true);
    }
  }, [playerPosition, goalPosition]);

  /** Keyboard event listener */
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          movePlayer("UP");
          break;
        case "ArrowDown":
          movePlayer("DOWN");
          break;
        case "ArrowLeft":
          movePlayer("LEFT");
          break;
        case "ArrowRight":
          movePlayer("RIGHT");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePlayer]);

  /** Reset game */
  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 0 });
    setIsVictory(false);
    let newGoal;
    do {
      newGoal = generateRandomPosition();
    } while (newGoal.x === 0 && newGoal.y === 0);
    setGoalPosition(newGoal);
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
      <p className="my-1" style={{ fontSize: "1.2rem", color: "purple", fontFamily: "Quicksand" }}>
        Guide the player through the maze! Use the arrow keys or on-screen buttons to find the way to the goal.
      </p>
  
      <div className="maze-grid mx-auto">
        {Array.from({ length: gridSize }).map((_, row) => (
          <div key={row} className="maze-row">
            {Array.from({ length: gridSize }).map((_, col) => (
              <div
                key={col}
                className={`maze-cell ${
                  playerPosition.x === col && playerPosition.y === row
                    ? "player"
                    : goalPosition?.x === col && goalPosition?.y === row
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
  
      {/* 🔽🔽🔽 RE-ADDED ON-SCREEN CONTROLS 🔽🔽🔽 */}
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
      {/* 🔼🔼🔼 RE-ADDED ON-SCREEN CONTROLS 🔼🔼🔼 */}
  
    </Container>
  );
};

export default Maze;
