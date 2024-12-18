import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "../styles/puzzlenoah.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom"; // Ensure react-router-dom is installed and configured

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

      // Hide GIF after 3 seconds
      setTimeout(() => {
      }, 3000);
    }
  };

  const resetPuzzle = () => {
    setPieces(shuffleArray([...Array(4).keys()])); // Reset to 4 shuffled pieces
    setCompleted(false);
  };

  const goToMainPuzzlePage = () => {
    navigate("/games/puzzle"); // Update the path based on your routing setup
  };

  return (
    <Container className="text-center mt-5">
      <h1 style={{ color: "black", textShadow: "2px 2px 2px purple", fontFamily: "Quicksand" }}>Noah and the Great Flood</h1>
      {completed && (
        <h2 className={`${styles.congratulationsMessage} mt-3`} style={{
          color: "purple",
          textShadow: "2px 2px 8px white",
          fontFamily: "Allura",
          fontSize: "2.5rem",
          fontWeight: "bold",
        }}>
          🎉 Congratulations! You solved the puzzle! 🎉
        </h2>
      )}
      <Row className="justify-content-center align-items-center mt-4">
        <Col xs={12} sm={10} md={8} lg={6}>
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
                  const dragIndex = parseInt(
                    e.dataTransfer.getData("text/plain")
                  );
                  handleDrop(dragIndex, index);
                }}
              />
            ))}
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={6} className="d-flex justify-content-between">
          <Button onClick={resetPuzzle} variant="primary">
            Reset Puzzle
          </Button>
          <Button onClick={goToMainPuzzlePage} variant="secondary">
            Back to Main Puzzle Page
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Puzzle;
