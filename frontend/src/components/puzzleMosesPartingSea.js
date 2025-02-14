import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
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

  const goToMainPuzzlePage = () => {
    // Redirect to main puzzle page
    window.location.href = "/games/puzzle"; // Adjust the path as needed
  };

  return (
    <Container className="text-center mt-5">
      <h1 style={{ color: "black", textShadow: "2px 2px 2px purple", fontFamily: "Quicksand" }}>Moses Parts the Red Sea</h1>

      <p style={{ color: "black",fontFamily: "Quicksand" }}>  
Click and drag the pieces to place them where they belong. Solve the puzzle and reveal the story of Moses parting the Red Sea!  
<em> "Then Moses stretched out his hand over the sea, and the Lord drove the sea back with a strong east wind and turned it into dry land." – Exodus 14:21</em>  
</p>


      {completed && (
        <h2 className={`${styles.congratulationsMessage} mt-3`} style={{
          color: "purple",
          textShadow: "2px 2px 8px white",
          fontFamily: "Allura",
          fontSize: "2.5rem",
          fontWeight: "bold",
        }}>
          Congratulations! You solved the puzzle!
        </h2>
      )}
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
