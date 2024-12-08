import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "../styles/mosesPartingSea.module.css"; // Import the CSS module

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Puzzle = () => {
  const [pieces, setPieces] = useState(shuffleArray([...Array(25).keys()])); // 25 pieces for 5x5 grid
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
    setPieces(shuffleArray([...Array(25).keys()])); // Reset to 25 shuffled pieces
    setCompleted(false);
  };

  return (
    <Container className="text-center mt-5">
      <h1>Moses Parting the Red Sea</h1>
      {completed && <h2>Congratulations! You completed the puzzle!</h2>}
      <div className="d-flex justify-content-center align-items-center">
        <div className={styles.mosesPuzzleGrid}>
          {pieces.map((piece, index) => (
            <div
              key={index}
              className={styles.mosesPuzzlePiece}
              style={{
                backgroundImage: "url('/images/mosesPartingSea.webp')",
                backgroundPosition: `${(piece % 5) * 20}% ${
                  Math.floor(piece / 5) * 20
                }%`, // Adjusted for 5x5 grid
                backgroundSize: "600%", // Fit for 5x5 grid
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
