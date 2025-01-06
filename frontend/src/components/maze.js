import React, { useState, useEffect } from "react";
import "../styles/maze.css";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Maze = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [goalPosition, setGoalPosition] = useState({ x: 4, y: 4 });
  const [obstacles, setObstacles] = useState([]);
  const [isVictory, setIsVictory] = useState(false);
  const gridSize = 20;

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

  const navigate = useNavigate();

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

  const handleKeyDown = (e) => {
    if (isVictory) return;

    switch (e.key) {
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

  return (
    <Container
      className="maze-container mt-5 mb-5"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div style={{ display: "flex", justifyContent: "space-between"}}>
      
      <h1
        className="text-center mb-4"
        style={{
          color: "goldenrod",
          textShadow: "2px 2px 8px black",
          fontFamily: "Allura",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        Bible Maze
      </h1>
      <Button
        variant="primary"
        className="mb-5"
        fontFamily="quicksand"
        onClick={() => navigate("/games")}
      >
        Back To Main Game Page
      </Button>
      </div>
      <p
        className="text-center"
        style={{ fontSize: "2rem", color: "purple", fontFamily: "Quicksand" }}
      >
        Help the player reach the goal! Use arrow keys to move.
      </p>
      <div className="maze-grid">
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
        <div className="victory-message">
          <p>🎉 You reached the goal! 🎉</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </Container>
  );
};

export default Maze;
