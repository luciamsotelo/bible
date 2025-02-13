import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "../styles/gardenOfEden.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom"; // Ensure react-router-dom is installed and configured

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
  const navigate = useNavigate();

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

  const goToMainPuzzlePage = () => {
    navigate("/games/puzzle"); // Update the path based on your routing setup
  };

  return (
    <Container className="text-center mt-5">
      <h1 style={{ color: "black", textShadow: "2px 2px 2px purple", fontFamily: "Quicksand" }}>Garden Of Eden</h1>

      <p style={{ color: "black",fontFamily: "Quicksand" }}>Click and drag the pieces to place them where they belong. Solve the puzzle and reveal the story of the Garden of Eden!  
      <em> "The Lord God planted a garden in Eden." – Genesis 2:8</em> </p>

      {completed && (
        <h2
          className={`${styles.congratulationsMessage} mt-3`}
          style={{
            color: "purple",
            textShadow: "2px 2px 8px white",
            fontFamily: "Allura",
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          🎉 Congratulations! You completed the puzzle! 🎉
        </h2>
      )}
      <div className="d-flex justify-content-center align-items-center">
        <div className={styles.gardenPuzzleGrid}>
          {pieces.map((piece, index) => (
            <div
              key={index}
              className={styles.gardenPuzzlePiece}
              style={{
                backgroundImage: "url('/images/gardenOfEdenPuzzle.png')",
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
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <Button onClick={resetPuzzle} variant="warning">
            Reset
          </Button>
          <Button onClick={goToMainPuzzlePage} variant="success">
            Puzzle Page
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Puzzle;
