import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "../styles/wordSearch.module.css";
import { useNavigate } from "react-router-dom"; // To handle navigation

const WordSearch = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gridSize] = useState(10);
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [highlightedCells, setHighlightedCells] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  const navigate = useNavigate();
  const timerRef = useRef(null);
  const maxLevel = 9;

  const words = useMemo(() => {
    const levelWords = [
      ["JESUS", "NOAH"],
      ["MOSES", "DAVID"],
      ["PETER", "ELIJAH", "JUDAS"],
      ["BETHLEHEM", "CAPERNAUM", "JERUSALEM", "GALILEE"],
      ["JACOB", "ISAAC", "ABRAHAM", "DANIEL", "JOHN"],
      ["MATHEW", "MARK", "LUKE", "JOHN", "ACTS", "ROMANS"],
      ["GENESIS", "EXODUS", "LEVITICUS", "NUMBERS"],
      ["FAITH", "LOVE", "HOPE", "JOY", "PEACE", "GRACE"],
      [
        "RUTH",
        "SARAH",
        "ESTHER",
        "MARY",
        "EVE",
        "REBEKAH",
        "LEAH",
        "HANNAH",
        "JUDITH",
      ],
    ];
    return levelWords[level - 1] || [];
  }, [level]);

  const initializeGrid = useCallback(() => {
    const directions = [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: -1, col: 1 },
    ];

    let newGrid = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill("")
    );

    const placeWord = (word) => {
      let placed = false;
      while (!placed) {
        const direction =
          directions[Math.floor(Math.random() * directions.length)];
        const startRow = Math.floor(Math.random() * gridSize);
        const startCol = Math.floor(Math.random() * gridSize);

        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          const row = startRow + i * direction.row;
          const col = startCol + i * direction.col;
          if (
            row < 0 ||
            row >= gridSize ||
            col < 0 ||
            col >= gridSize ||
            (newGrid[row][col] !== "" && newGrid[row][col] !== word[i])
          ) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            const row = startRow + i * direction.row;
            const col = startCol + i * direction.col;
            newGrid[row][col] = word[i];
          }
          placed = true;
        }
      }
    };

    words.forEach((word) => placeWord(word));

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (newGrid[row][col] === "") {
          newGrid[row][col] = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          );
        }
      }
    }

    setGrid(newGrid);
  }, [words, gridSize]);

  const startTimer = useCallback(() => {
    const initialTime = level <= 5 ? 60 : 120;
    setTimeLeft(initialTime);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timerRef.current);
          setGameOverMessage("Time's up.");
          setShowPlayAgain(true);
          return 0;
        }
      });
    }, 1000);
  }, [level]);

  const restartGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setFoundWords([]);
    setHighlightedCells({});
    setSelectedCells([]);
    setGameOverMessage("");
    setShowPlayAgain(false);
    initializeGrid();
    startTimer();
  }, [initializeGrid, startTimer]);

  useEffect(() => {
    initializeGrid();
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initializeGrid, startTimer]);

  const handleCellClick = (row, col) => {
    const cell = { row, col };
    const alreadySelected = selectedCells.some(
      (selected) => selected.row === row && selected.col === col
    );

    const newSelection = alreadySelected
      ? selectedCells.filter(
          (selected) => !(selected.row === row && selected.col === col)
        )
      : [...selectedCells, cell];

    setSelectedCells(newSelection);

    if (newSelection.length > 1) {
      const direction = calculateDirection(newSelection);
      if (!direction) {
        setSelectedCells([]);
        return;
      }

      const selectedLetters = newSelection.map(
        ({ row, col }) => grid[row][col]
      );
      const selectedWord = selectedLetters.join("");
      const reversedWord = [...selectedLetters].reverse().join("");

      if (
        (words.includes(selectedWord) || words.includes(reversedWord)) &&
        !foundWords.includes(selectedWord) &&
        !foundWords.includes(reversedWord)
      ) {
        const finalWord = words.includes(selectedWord)
          ? selectedWord
          : reversedWord;
        setFoundWords([...foundWords, finalWord]);

        const newHighlights = { ...highlightedCells };
        newHighlights[finalWord] = [...newSelection];
        setHighlightedCells(newHighlights);

        setSelectedCells([]);
        setScore((prev) => prev + finalWord.length * 10);
      }
    }
  };

  const calculateDirection = (cells) => {
    if (cells.length < 2) return null;

    const rowDiff = cells[1].row - cells[0].row;
    const colDiff = cells[1].col - cells[0].col;

    if (rowDiff === 0 && colDiff === 0) return null;

    for (let i = 1; i < cells.length; i++) {
      const currentRowDiff = cells[i].row - cells[0].row;
      const currentColDiff = cells[i].col - cells[0].col;

      if (
        (rowDiff !== 0 && currentRowDiff / rowDiff !== i) ||
        (colDiff !== 0 && currentColDiff / colDiff !== i)
      ) {
        return null;
      }
    }

    return { row: rowDiff, col: colDiff };
  };

  const nextLevel = () => {
    if (level < maxLevel) {
      setLevel((prev) => prev + 1);
      setFoundWords([]);
      setHighlightedCells({});
      setSelectedCells([]);
    }
  };

  const isCellHighlighted = (row, col) => {
    return Object.values(highlightedCells).some((cells) =>
      cells.some((cell) => cell.row === row && cell.col === col)
    );
  };

  return (
    <Container className="mt-2 mb-2">
      <div className="d-flex flex-row justify-content-center align-items-center"></div>
      <div>
        <h1
          className="text-center mb-1"
          style={{
            color: "goldenrod",
            textShadow: "2px 2px 8px black",
            fontFamily: "Allura",
            fontSize: "2.2rem",
            fontWeight: "bold",
          }}
        >
          Word Search
        </h1>
        <div className="container d-flex justify-content-between">
          <Button
            variant="warning"
            className="custom-nav-button"
            onClick={() => navigate("/")}
          >
            🏠 Home
          </Button>

          <Button
            variant="info"
            className="custom-nav-button"
            onClick={() => navigate("/games")}
          >
            🎮 Games Menu
          </Button>
          {showPlayAgain && (
            <Button variant="primary" onClick={restartGame}>
              Play Again
            </Button>
          )}
        </div>
        <p className={`${styles.paragraph} d-none d-md-block`}>
          Welcome to Bible Word Search! Find all the hidden words before time
          runs out. Each level gets harder, so keep searching! Click letters to
          highlight words, level up, and score points. Can you complete them
          all? Have fun! <br />
          <br />
          <i>
            "Call to me and I will answer you and tell you great and
            unsearchable things you do not know." – Jeremiah 33:3
          </i>
        </p>
        <p className={`${styles.paragraphSmall} d-md-none`}>
          Find the hidden words before time runs out! Tap letters to highlight
          words.
          <br />
          <br />
          <i>
            "Call to me and I will answer you and tell you great and
            unsearchable things you do not know." – Jeremiah 33:3
          </i>
        </p>
        <br />
        <Card className={styles.score}>
          Level: {level} | Score: {score} | Time Left: {timeLeft}s
          {gameOverMessage && <div>{gameOverMessage}</div>}
        </Card>

        {/* Words List Section */}
        <div className="word-list mt-1">
          <h3
            className="text-center"
            style={{
              fontFamily: "Quicksand",
              fontSize: "1.2rem",
              color: "purple",
              textShadow: "2px 2px 1px yellow",
            }}
          >
            Words to Find:
          </h3>
          <ul className="words-list d-flex flex-wrap justify-content-center list-unstyled">
            {words.map((word, index) => (
              <li
                key={index}
                className={foundWords.includes(word) ? styles.foundWord : ""}
                style={{ margin: "0.5rem" }} // Adding spacing between words
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Row className="justify-content-center mt-3">
        <Col
          xs={12}
          md={6}
          lg={4}
          className="d-flex justify-content-center position-relative"
        >
          {/* Grid Container */}
          <div className={styles.gridContainer}>
            <div className={styles.grid}>
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                  {row.map((letter, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`${styles.cell} ${
                        isCellHighlighted(rowIndex, colIndex)
                          ? styles.highlighted
                          : ""
                      } ${
                        selectedCells.some(
                          (cell) =>
                            cell.row === rowIndex && cell.col === colIndex
                        )
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Success Message Overlay */}
            {foundWords.length === words.length && (
              <div className={styles.overlay}>
                <h2 className={styles.successMessage}>
                  Awesome! You've found every word! <br />
                  Your Score: {score}
                </h2>
                {level < maxLevel && (
                  <Button
                    className="mt-1"
                    variant="success"
                    onClick={nextLevel}
                  >
                    Next Level
                  </Button>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WordSearch;
