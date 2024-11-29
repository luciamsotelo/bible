import React, { useState, useEffect } from 'react';
import '../styles/maze.css';

const Maze = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [goalPosition, setGoalPosition] = useState({ x: 4, y: 4 });
  const [obstacles, setObstacles] = useState([]);
  const [isVictory, setIsVictory] = useState(false);
  const gridSize = 20;

  useEffect(() => {
    // Initialize goal and obstacles
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
        !(obstacle.x === 0 && obstacle.y === 0) && // Not player start
        !(obstacle.x === newGoal.x && obstacle.y === newGoal.y) // Not goal
      ) {
        newObstacles.push(obstacle);
      }
    }
    setObstacles(newObstacles);
  }, [gridSize]);

  const movePlayer = (direction) => {
    setPlayerPosition((prevPosition) => {
      const { x, y } = prevPosition;
      let newPosition = prevPosition;

      switch (direction) {
        case 'UP':
          newPosition = y > 0 ? { ...prevPosition, y: y - 1 } : prevPosition;
          break;
        case 'DOWN':
          newPosition = y < gridSize - 1 ? { ...prevPosition, y: y + 1 } : prevPosition;
          break;
        case 'LEFT':
          newPosition = x > 0 ? { ...prevPosition, x: x - 1 } : prevPosition;
          break;
        case 'RIGHT':
          newPosition = x < gridSize - 1 ? { ...prevPosition, x: x + 1 } : prevPosition;
          break;
        default:
          break;
      }

      // Check for obstacles
      if (obstacles.some((obs) => obs.x === newPosition.x && obs.y === newPosition.y)) {
        return prevPosition;
      }

      return newPosition;
    });
  };

  const handleKeyDown = (e) => {
    if (isVictory) return;

    switch (e.key) {
      case 'ArrowUp':
        movePlayer('UP');
        break;
      case 'ArrowDown':
        movePlayer('DOWN');
        break;
      case 'ArrowLeft':
        movePlayer('LEFT');
        break;
      case 'ArrowRight':
        movePlayer('RIGHT');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Check for victory
    if (playerPosition.x === goalPosition.x && playerPosition.y === goalPosition.y) {
      setIsVictory(true);
    }
  }, [playerPosition, goalPosition]);

  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 0 });
    setIsVictory(false);

    // Randomize goal and obstacles
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
        !(obstacle.x === 0 && obstacle.y === 0) && // Not player start
        !(obstacle.x === newGoal.x && obstacle.y === newGoal.y) // Not goal
      ) {
        newObstacles.push(obstacle);
      }
    }
    setObstacles(newObstacles);
  };

  return (
    <div className="maze-container" tabIndex={0} onKeyDown={handleKeyDown}>
      {Array.from({ length: gridSize }).map((_, row) => (
        <div key={row} className="maze-row">
          {Array.from({ length: gridSize }).map((_, col) => (
            <div
              key={col}
              className={`maze-cell ${
                playerPosition.x === col && playerPosition.y === row
                  ? 'player'
                  : goalPosition.x === col && goalPosition.y === row
                  ? 'goal'
                  : obstacles.some((obs) => obs.x === col && obs.y === row)
                  ? 'obstacle'
                  : ''
              }`}
            ></div>
          ))}
        </div>
      ))}
      {isVictory && (
        <div className="victory-message">
          <p>🎉 You reached the goal! 🎉</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Maze;
