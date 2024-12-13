import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "../styles/puzzlenoah.module.css"; // Import the CSS module

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Puzzle = () => {
  const [pieces, setPieces] = useState(shuffleArray([...Array(4).keys()])); // 4 pieces for 2x2 grid
  const [completed, setCompleted] = useState(false);
  const [showGif, setShowGif] = useState(false);

  const handleDrop = (dragIndex, dropIndex) => {
    const newPieces = [...pieces];
    [newPieces[dragIndex], newPieces[dropIndex]] = [
      newPieces[dropIndex],
      newPieces[dragIndex],
    ];
    setPieces(newPieces);

    if (newPieces.every((piece, index) => piece === index)) {
      setCompleted(true);
      setShowGif(true);

      // Hide GIF after 3 seconds
      setTimeout(() => {
        setShowGif(false);
      }, 3000);
    }
  };

  const resetPuzzle = () => {
    setPieces(shuffleArray([...Array(4).keys()])); // Reset to 4 shuffled pieces
    setCompleted(false);
  };

  return (
    <Container className="text-center mt-5">
      <h1>Noah and the Great Flood</h1>
      {completed && (
        <h2 className={`${styles.congratulationsMessage} mt-3`}>
          🎉 Congratulations! You solved the puzzle! 🎉
        </h2>
      )}
      {showGif && (
        <div className={styles.gifOverlay}>
          <img src="/images/goodjob.gif" alt="Good Job!" />
        </div>
      )}
      <div className="d-flex justify-content-center align-items-center">
        <div className={styles.noahPuzzleGrid}>
          {pieces.map((piece, index) => (
            <div
              key={index}
              className={styles.noahPuzzlePiece}
              style={{
                backgroundImage: "url('/images/puzzleark.jpg')",
                backgroundPosition: `${(piece % 2) * 100}% ${
                  Math.floor(piece / 2) * 100
                }%`, // Adjusted for 2x2 grid
                backgroundSize: "200%", // Match for 2x2 grid
              }}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
                handleDrop(dragIndex, index);
              }}
            />
          ))}
        </div>
      </div>
      <Button onClick={resetPuzzle} className="mt-3" variant="primary">
        Reset Puzzle
      </Button>
    </Container>
  );
};

export default Puzzle;
