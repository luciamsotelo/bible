import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "../styles/josephWithCoat.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom"; // For navigation

const GRID_SIZE = 3; // Configurable grid size (3x3)

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Puzzle = () => {
  const initialPieces = [...Array(GRID_SIZE * GRID_SIZE).keys()]; // Create array of grid pieces
  const [pieces, setPieces] = useState(shuffleArray([...initialPieces]));
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate(); // React Router navigation hook

  const handleDrop = (dragIndex, dropIndex) => {
    const newPieces = [...pieces];
    [newPieces[dragIndex], newPieces[dropIndex]] = [
      newPieces[dropIndex],
      newPieces[dragIndex],
    ];
    setPieces(newPieces);

    // Check if the puzzle is solved
    if (newPieces.every((piece, index) => piece === index)) {
      setCompleted(true);
    }
  };

  const resetPuzzle = () => {
    setPieces(shuffleArray([...initialPieces]));
    setCompleted(false);
  };

  const goToMainPuzzlePage = () => {
    navigate("/games/puzzle"); // Navigate back to main puzzle page
  };

  return (
    <Container className="text-center mt-5">
      <h1 style={{ color: "black", textShadow: "2px 2px 2px purple", fontFamily: "Quicksand" }}>
        Joseph and His Coat Puzzle
      </h1>
      <p style={{ color: "black",fontFamily: "Quicksand" }}>Click and drag the pieces to place them where they belong. Solve the puzzle and reveal the story of Joseph and his coat of many colors!    
      <em> "So when Joseph came to his brothers, they stripped him of his robe—the ornate robe he was wearing." – Genesis 37:23</em></p>


  
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
          Congratulations! You solved the puzzle! 
        </h2>
      )}
      <Row className="justify-content-center align-items-center mt-4">
        <Col xs={12} sm={10} md={8} lg={6}>
          <div className={styles.josephPuzzleGrid}>
            {pieces.map((piece, index) => (
              <div
                key={index}
                className={styles.josephPuzzlePiece}
                style={{
                  backgroundImage: "url('/images/jospephCoatColors.png')",
                  backgroundPosition: `${(piece % GRID_SIZE) * (100 / (GRID_SIZE - 1))}% ${
                    Math.floor(piece / GRID_SIZE) * (100 / (GRID_SIZE - 1))
                  }%`,
                  backgroundSize: `${GRID_SIZE * 100}%`,
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
        </Col>
      </Row>

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
