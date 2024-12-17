import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from '../styles/wordSearch.module.css';

const WordSearch = () => {
  const gridSize = 10;

  // Initialize words once using useMemo
  const words = useMemo(() => ['JESUS', 'MOSES', 'NOAH', 'DAVID', 'SARAH', 'PETER', 'ELIJAH', 'BETHLEHEM'], []);

  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [highlightedCells, setHighlightedCells] = useState({});
  const [message, setMessage] = useState('');

  // Function to initialize the grid with words
  const initializeGrid = useCallback(() => {
    const directions = [
      { row: 0, col: 1 },   // Horizontal
      { row: 1, col: 0 },   // Vertical
      { row: 1, col: 1 },   // Diagonal down-right
      { row: -1, col: 1 },  // Diagonal up-right
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

  // Handle cell selection
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
        setMessage('Invalid selection! Must be in a straight line.');
        setSelectedCells([]);
        return;
      }
  
      // Use natural selection order without sorting
      const selectedLetters = newSelection.map(({ row, col }) => grid[row][col]);
      const selectedWord = selectedLetters.join('');
      const reversedWord = [...selectedLetters].reverse().join('');
  
      // Check for the word or its reverse
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
        setMessage(`Great job! You found ${finalWord}`);
      } else if (selectedWord.length > 10) {
        setSelectedCells([]);
        setMessage('Keep searching!');
      }
    }
  };
  
  

  // Check if selection is in a valid direction
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

  return (
    <div className={styles.wordSearchContainer}>
      <div className={styles.sidebar}>
        <div className={styles.wordList}>
          <h3>Word List</h3>
          <ul>
            {words.map((word) => (
              <li key={word} className={foundWords.includes(word) ? styles.found : ''}>
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.gridContainer}>
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
        <div className={`${styles.message} ${message.includes('Great job!') ? styles.messageSuccess : ''}`}>
          {message}
        </div>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.foundWords}>
          <h3>Found Words</h3>
          <ul>
            {foundWords.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
