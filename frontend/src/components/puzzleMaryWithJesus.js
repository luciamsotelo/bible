import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "../styles/maryWithJesus.module.css"; // Updated CSS Module import
import { useNavigate } from "react-router-dom"; // Ensure react-router-dom is configured

// Shuffle the puzzle pieces array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MaryWithJesusPuzzle = () => {
  const gridSize = 4; // 4x4 Grid
  const totalPieces = gridSize * gridSize;

  const [pieces, setPieces] = useState(shuffleArray([...Array(totalPieces).keys()]));
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  // Handle drag-and-drop events
  const handleDrop = (dragIndex, dropIndex) => {
    const newPieces = [...pieces];
    [newPieces[dragIndex], newPieces[dropIndex]] = [
      newPieces[dropIndex],
      newPieces[dragIndex],
    ];
    setPieces(newPieces);

    // Check for completion
    if (newPieces.every((piece, index) => piece === index)) {
      setCompleted(true);
    }
  };

  // Reset the puzzle
  const resetPuzzle = () => {
    setPieces(shuffleArray([...Array(totalPieces).keys()]));
    setCompleted(false);
  };

  // Navigate back to main puzzle page
  const goToMainPuzzlePage = () => {
    navigate("/games/puzzle"); // Update the path based on your routing setup
  };

  return (
    <Container className="text-center mt-5">
      <h1 style={{ color: "black", textShadow: "2px 2px 2px purple", fontFamily: "Quicksand", fontSize: "2rem"  }}>
        Mary and Baby Jesus
      </h1>

      <p style={{ color: "black", fontFamily: "Quicksand" }}>  
Click and drag the pieces to place them where they belong. Solve the puzzle and reveal the story of Mary and baby Jesus!  <br/>
<em> "She gave birth to her firstborn, a son. She wrapped him in cloths and placed him in a manger." – Luke 2:7</em>  
</p>


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
          <div className={styles.maryPuzzleGrid}>
            {pieces.map((piece, index) => (
              <div
                key={index}
                className={styles.maryPuzzlePiece}
                style={{
                  backgroundImage: "url('/images/MaryWithBaby.webp')",
                  backgroundPosition: `${(piece % gridSize) * 100 / (gridSize - 1)}% ${
                    Math.floor(piece / gridSize) * 100 / (gridSize - 1)
                  }%`,
                  backgroundSize: "400%",
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
          <Button onClick={resetPuzzle} variant="warning me-5">
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

export default MaryWithJesusPuzzle;
