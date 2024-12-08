import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "../styles/maryWithJesus.module.css"; // Import the CSS module

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Puzzle = () => {
  const [pieces, setPieces] = useState(shuffleArray([...Array(16).keys()])); // 16 pieces for 4x4 grid
  const [completed, setCompleted] = useState(false);

  const handleDrop = (dragIndex, dropIndex) => {
    const newPieces = [...pieces];
    [newPieces[dragIndex], newPieces[dropIndex]] = [
      newPieces[dropIndex],
      newPieces[dragIndex],
    ];
    setPieces(newPieces);

    if (newPieces.every((piece, index) => piece === index)) {
      setCompleted(true);
    }
  };

  const resetPuzzle = () => {
    setPieces(shuffleArray([...Array(16).keys()])); // Reset to 16 shuffled pieces
    setCompleted(false);
  };

  return (
    <Container className="text-center mt-5">
      <h1>Mary and Baby Jesus Puzzle</h1>
      {completed && <h2>Congratulations! You completed the puzzle!</h2>}
      <div className="d-flex justify-content-center align-items-center">
        <div className={styles.maryPuzzleGrid}>
          {pieces.map((piece, index) => (
            <div
              key={index}
              className={styles.maryPuzzlePiece}
              style={{
                backgroundImage: "url('/images/MaryWithBaby.webp')",
                backgroundPosition: `${(piece % 4) * 25}% ${
                  Math.floor(piece / 4) * 25
                }%`, // Adjusted for 4x4 grid
                backgroundSize: "510%", // Fit for 4x4 grid
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
