import React, { useState, useEffect, useCallback, useRef } from "react";
import "../styles/maze.css";
import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Maze = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [goalPosition, setGoalPosition] = useState(null);
  const [obstacles, setObstacles] = useState([]);
  const [isVictory, setIsVictory] = useState(false);
  const [gridSize] = useState(20);
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);

  /** Generate a random position - MEMOIZED with useCallback */
  const generateRandomPosition = useCallback(() => ({ // ADDED useCallback
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  }), [gridSize]); // ADDED dependency array for useCallback - gridSize

  /** Initialize the game (Goal + Obstacles) */
  useEffect(() => {
    const initializeGame = () => {
      let newGoal;
      do {
        newGoal = generateRandomPosition();
      } while (newGoal.x === 0 && newGoal.y === 0);

      setGoalPosition(newGoal);

      // Initialize obstacles at Medium difficulty - HARDCODED
      const obstacleCount = 80; // Medium difficulty obstacle count

      const newObstacles = [];
      while (newObstacles.length < obstacleCount) {
        const obstacle = generateRandomPosition();
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

    if (gameStarted) {
      initializeGame();
    }
  }, [gameStarted, gridSize, generateRandomPosition]); // ADDED generateRandomPosition to dependency array

  /** Move obstacles every 2 seconds */
  const moveObstaclesIntervalRef = useRef(null);
  const playerRef = useRef(playerPosition);
  const goalRef = useRef(goalPosition);

  useEffect(() => {
    playerRef.current = playerPosition;
    goalRef.current = goalPosition;
  }, [playerPosition, goalPosition]);

  useEffect(() => {
    if (!gameStarted) {
      clearInterval(moveObstaclesIntervalRef.current);
      return;
    }

    if (moveObstaclesIntervalRef.current) {
      clearInterval(moveObstaclesIntervalRef.current);
    }

    moveObstaclesIntervalRef.current = setInterval(() => {
      setObstacles((prevObstacles) =>
        prevObstacles.map((obs) => {
          let newX = obs.x,
            newY = obs.y;
          const originalX = obs.x;
          const originalY = obs.y;

          const moveDirection = Math.floor(Math.random() * 4);
          switch (moveDirection) {
            case 0:
              newY = obs.y > 0 ? obs.y - 1 : obs.y;
              break;
            case 1:
              newY = obs.y < gridSize - 1 ? obs.y + 1 : obs.y;
              break;
            case 2:
              newX = obs.x > 0 ? obs.x - 1 : obs.x;
              break;
            case 3:
              newX = obs.x < gridSize - 1 ? obs.x + 1 : obs.x;
              break;
            default:
              break;
          }

          if (
            (newX === playerRef.current.x && newY === playerRef.current.y) ||
            (newX === goalRef.current?.x && newY === goalRef.current?.y)
          ) {
            return { x: originalX, y: originalY };
          } else {
            return { x: newX, y: newY };
          }
        })
      );
    }, 2000);

    return () => clearInterval(moveObstaclesIntervalRef.current);
  }, [gameStarted, gridSize]);

  /** Move player */
  const movePlayer = useCallback(
    (direction) => {
      if (!gameStarted) return;
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
    },
    [obstacles, gridSize, gameStarted]
  );

  /** Check for victory condition */
  useEffect(() => {
    if (
      goalPosition &&
      playerPosition.x === goalPosition.x &&
      playerPosition.y === goalPosition.y
    ) {
      setIsVictory(true);
      clearInterval(moveObstaclesIntervalRef.current);
      setGameStarted(false);
    }
  }, [playerPosition, goalPosition]);

  /** Keyboard event listener */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!gameStarted) return;
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
  }, [movePlayer, gameStarted]);

  /** Reset game */
  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 0 });
    setIsVictory(false);
    setGameStarted(true);
    let newGoal;
    do {
      newGoal = generateRandomPosition();
    } while (newGoal.x === 0 && newGoal.y === 0);
    setGoalPosition(newGoal);
  };

  const startGame = () => {
    resetGame();
    setGameStarted(true);
    setIsVictory(false);
  };


  return (
    <Container className="maze-container text-center">
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate("/games")}>
            Back to Main Game Page
          </Button>
        </Col>
      </Row>
      <h1
        className="my-1"
        style={{
          color: "goldenrod",
          textShadow: "2px 2px 8px black",
          fontFamily: "allura",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        Maze
      </h1>
      <p
        className="my-1"
        style={{ fontSize: "1.2rem", color: "purple", fontFamily: "Quicksand" }}
      >
        Guide the player through the maze! Use the arrow keys or on-screen
        buttons to find the way to the goal.
      </p>

      {!gameStarted && (
        <Button variant="success" className="mb-3" onClick={startGame}>
          Start Game
        </Button>
      )}

      <div className="maze-grid">
        {Array.from({ length: gridSize }).map((_, row) =>
          Array.from({ length: gridSize }).map((_, col) => {
            const isPlayer =
              playerPosition.x === col && playerPosition.y === row;
            const isGoal = goalPosition?.x === col && goalPosition?.y === row;

            return (
              <div
                key={`${row}-${col}`}
                className={`maze-cell ${
                  isPlayer ? "player" : isGoal ? "goal" : ""
                }`}
                style={{
                  gridColumn: col + 1,
                  gridRow: row + 1,
                }}
              ></div>
            );
          })
        )}

        {obstacles.map((obstacle, index) => (
          <div
            key={index}
            className="maze-cell obstacle"
            style={{
              transform: `translate(${obstacle.x * 30}px, ${
                obstacle.y * 30
              }px)`,
            }}
          ></div>
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