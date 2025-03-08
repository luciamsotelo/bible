import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "../styles/maze.module.css";
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
    <Container className="text-center mt-5">
      {/* Back Button */}
      <Row className="justify-content-center">
        <Col className="container d-flex justify-content-between">
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
        </Col>
      </Row>
  
      {/* Title */}
      <h1 className=" text-warning text-shadow display-4 font-allura">
        Maze Adventure
      </h1>
  
      {/* Instructions */}
      <p className="my-1">
      Use the ⬅️⬆️⬇️➡️ arrows on your keyboard or screen to move the little boy! Don’t let the boulders 🪨 stop you—reach the candle 🕯️ to win!<br /><br/>
        <i>"Your word is a lamp to my feet and a light to my path." (Psalm 119:105)</i>
      </p>
  
      {/* Start Game Button */}
      {!gameStarted && (
        <Button variant="success" onClick={startGame}>
          Start Game
        </Button>
      )}
  
      {/* Maze Grid */}
      <div className={styles.mazeGrid}>
        {Array.from({ length: gridSize }).map((_, row) =>
          Array.from({ length: gridSize }).map((_, col) => {
            const isPlayer = playerPosition.x === col && playerPosition.y === row;
            const isGoal = goalPosition?.x === col && goalPosition?.y === row;
  
            return (
              <div
                key={`${row}-${col}`}
                className={`${styles.mazeCell} ${isPlayer ? styles.player : isGoal ? styles.goal : ""}`}
                style={{
                  gridColumn: col + 1,
                  gridRow: row + 1,
                }}
              ></div>
            );
          })
        )}
  
        {/* Render obstacles with correct movement inside the grid */}
        {obstacles.map((obstacle, index) => (
          <div
          key={index}
          className={styles.obstacle}
          style={{
            width: `calc(100% / ${gridSize})`,
            height: `calc(100% / ${gridSize})`,
            position: "absolute",
            left: `calc(${obstacle.x} * (100% / ${gridSize}))`,
            top: `calc(${obstacle.y} * (100% / ${gridSize}))`,
            transition: "left 0.5s ease-in-out, top 0.5s ease-in-out",
          }}
        ></div>
        ))}
      </div>
  
      {/* Victory Message */}
      {isVictory && (
          <div className={styles.victoryOverlay}>
            <Alert variant="success" className="my-3">
              🎉 You reached the goal! 🎉
              <div>
                <Button onClick={resetGame} className="mt-2">
                  Play Again
                </Button>
              </div>
            </Alert>
          </div>
        )}
  
      {/* Controls Section */}
      <div className="controls mt-4 mb-5">
        <Row className="justify-content-center">
          <Col xs="auto mb-3">
            <Button variant="info" onClick={() => movePlayer("UP")}>
              &uarr;
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-1">
          <Col xs="auto">
            <Button variant="info" onClick={() => movePlayer("LEFT")}>
              &larr;
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="info" onClick={() => movePlayer("DOWN")}>
              &darr;
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="info" onClick={() => movePlayer("RIGHT")}>
              &rarr;
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
  
};

export default Maze;