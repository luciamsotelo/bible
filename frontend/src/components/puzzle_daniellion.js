import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "../styles/puzzledaniellion.module.css"; // Import the updated CSS module
import { useNavigate } from "react-router-dom";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Puzzle = () => {
  const [pieces, setPieces] = useState(shuffleArray([...Array(9).keys()])); // 9 pieces for 3x3 grid
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
    setPieces(shuffleArray([...Array(9).keys()])); // Reset to 9 shuffled pieces
    setCompleted(false);
  };

  const goToMainPuzzlePage = () => {
    navigate("/games/puzzle");
  };

  return (
    <Container className="text-center mt-5">
      <h1 style={{ color: "black", textShadow: "2px 2px 2px purple", fontFamily: "Quicksand", fontSize: "2rem"  }}>
        Daniel and the Lion's Den
      </h1>

      <p style={{ color: "black", fontFamily: "Quicksand"}}>Click and drag the pieces to place them where they belong. Solve the puzzle and reveal the story of Daniel and the lion’s den! <br/><em>"My God sent his angel, and he shut the mouths of the lions." – Daniel 6:22</em></p>

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
          <div className={styles.danielPuzzleGrid}>
            {pieces.map((piece, index) => (
              <div
                key={index}
                className={styles.danielPuzzlePiece}
                style={{
                  backgroundImage: "url('/images/puzzledanielandlion.jpg')",
                  backgroundPosition: `${(piece % 3) * 50}% ${
                    Math.floor(piece / 3) * 50
                  }%`, // Adjusted for 3x3 grid
                  backgroundSize: "300%", // Adjusted for the entire image
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

export default Puzzle;
