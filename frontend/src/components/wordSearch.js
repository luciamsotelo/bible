import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from '../styles/wordSearch.module.css';
import backgroundImg from '../../src/images/wordSearchBG.webp';

const WordSearch = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gridSize] = useState(10);
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [highlightedCells, setHighlightedCells] = useState({});
  const [timer, setTimer] = useState(null);
  const [message, setMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Timer for the current level
  const [gameOverMessage, setGameOverMessage] = useState(''); // Display message when time is up
  const [showPlayAgain, setShowPlayAgain] = useState(false); // Show "Play Again" button

  const maxLevel = 9;

  const words = useMemo(() => {
    const levelWords = [
      ['JESUS', 'NOAH'], // Level 1
      ['MOSES', 'DAVID'], // Level 2
      ['PETER', 'ELIJAH', 'JUDAS'], // Level 3
      ['BETHLEHEM', 'CAPERNAUM', 'JERUSALEM', 'GALILEE'], // Level 4
      ['JACOB', 'ISAAC', 'ABRAHAM', 'DANIEL', 'JOHN'], // Level 5
      ['MATHEW', 'MARK', 'LUKE', 'JOHN', 'ACTS', 'ROMANS'], // Level 6
      ['GENESIS', 'EXODUS', 'LEVITICUS', 'NUMBERS'], // Level 7
      ['FAITH', 'LOVE', 'HOPE', 'JOY', 'PEACE', 'GRACE'], // Level 8
      ['RUTH', 'SARAH', 'ESTHER', 'MARY', 'EVE', 'REBEKAH', 'LEAH', 'HANNAH', 'JUDITH'], // Level 9
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

    let newGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

    const placeWord = (word) => {
      let placed = false;
      while (!placed) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
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
            (newGrid[row][col] !== '' && newGrid[row][col] !== word[i])
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
        if (newGrid[row][col] === '') {
          newGrid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
  }, [words, gridSize]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const restartGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setFoundWords([]);
    setHighlightedCells({});
    setSelectedCells([]);
    setGameOverMessage('');
    setShowPlayAgain(false);
    initializeGrid();
  }, [initializeGrid]);

  useEffect(() => {
    const initialTime = level <= 5 ? 60 : 120; // Set timer based on level
    setTimeLeft(initialTime);

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timerInterval);
          setGameOverMessage("Time's up."); // Show game over message
          setShowPlayAgain(true); // Show "Play Again" button
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [level, restartGame]);

  const handleCellClick = (row, col) => {
    const cell = { row, col };
    const alreadySelected = selectedCells.some(
      (selected) => selected.row === row && selected.col === col
    );

    const newSelection = alreadySelected
      ? selectedCells.filter((selected) => !(selected.row === row && selected.col === col))
      : [...selectedCells, cell];

    setSelectedCells(newSelection);

    if (newSelection.length > 1) {
      const direction = calculateDirection(newSelection);
      if (!direction) {
        setSelectedCells([]);
        return;
      }

      const selectedLetters = newSelection.map(({ row, col }) => grid[row][col]);
      const selectedWord = selectedLetters.join('');
      const reversedWord = [...selectedLetters].reverse().join('');

      if (
        (words.includes(selectedWord) || words.includes(reversedWord)) &&
        !foundWords.includes(selectedWord) &&
        !foundWords.includes(reversedWord)
      ) {
        const finalWord = words.includes(selectedWord) ? selectedWord : reversedWord;
        setFoundWords([...foundWords, finalWord]);

        const newHighlights = { ...highlightedCells };
        newHighlights[finalWord] = [...newSelection];
        setHighlightedCells(newHighlights);

        setSelectedCells([]);
        setScore((prev) => prev + finalWord.length * 10);

        setMessage(`Great job! You found: ${finalWord}`);
        setMessageVisible(true);
        clearTimeout(timer);
        setTimer(setTimeout(() => setMessageVisible(false), 3000));
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

  const isCellHighlighted = (row, col) => {
    return Object.values(highlightedCells).some((cells) =>
      cells.some((cell) => cell.row === row && cell.col === col)
    );
  };

  const nextLevel = () => {
    if (level < maxLevel) {
      setLevel((prev) => prev + 1);
      setFoundWords([]);
      setHighlightedCells({});
      setSelectedCells([]);
    }
  };

  return (
    <Container
      className={styles.wordSearchContainer}
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {gameOverMessage && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p className={styles.message} style={{ color: 'red', fontSize: '2rem' }}>
            {gameOverMessage}
          </p>
          {showPlayAgain && (
            <Button onClick={restartGame} variant="primary">
              Play Again
            </Button>
          )}
        </div>
      )}
      <Row>
        <Col xs={12} sm={4}>
          <Card className="p-3 mb-3">
            <h3>Word List</h3>
            <ul style={{ listStyleType: 'none' }}>
              {words.map((word) => (
                <li key={word} className={foundWords.includes(word) ? styles.found : ''}>
                  {foundWords.includes(word) ? <s>{word}</s> : word}
                </li>
              ))}
            </ul>
            <h4>Score: {score}</h4>
            <h5>Level: {level}</h5>
            <h5>Time Left: {timeLeft}s</h5>
            {messageVisible && <p className={styles.message}>{message}</p>}
            {foundWords.length === words.length && (
              <Button className="mt-3" onClick={nextLevel}>
                Next Level
              </Button>
            )}
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <div className={styles.grid}>
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                {row.map((letter, colIndex) => (
                  <div
                    key={colIndex}
                    className={`${styles.cell} ${
                      isCellHighlighted(rowIndex, colIndex) ? styles.highlighted : ''
                    } ${
                      selectedCells.some(
                        (cell) => cell.row === rowIndex && cell.col === colIndex
                      )
                        ? styles.selected
                        : ''
                    }`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WordSearch;
