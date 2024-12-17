import React, { useState } from 'react';
import styles from '../styles/wordSearch.module.css';

const WordSearch = () => {
  const grid = [
    ['J', 'E', 'S', 'U', 'S', 'A', 'L', 'M', 'H', 'G'], // JESUS
    ['E', 'L', 'I', 'J', 'A', 'H', 'N', 'E', 'V', 'R'], // ELIJAH
    ['D', 'A', 'V', 'I', 'D', 'P', 'E', 'T', 'E', 'R'], // DAVID and PETER
    ['A', 'N', 'O', 'A', 'H', 'Q', 'A', 'R', 'K', 'H'], // NOAH
    ['M', 'O', 'S', 'E', 'S', 'D', 'A', 'N', 'I', 'E'], // MOSES
    ['E', 'L', 'A', 'R', 'C', 'H', 'E', 'M', 'I', 'J'], // Miscellaneous letters
    ['S', 'A', 'R', 'A', 'H', 'H', 'A', 'N', 'A', 'H'], // SARAH
    ['H', 'I', 'J', 'O', 'S', 'E', 'P', 'H', 'R', 'U'], // JOSEPH
    ['B', 'E', 'T', 'H', 'L', 'E', 'H', 'E', 'M', 'Z'], // BETHLEHEM
    ['A', 'B', 'R', 'A', 'H', 'A', 'M', 'H', 'E', 'A'], // ABRAHAM
  ];

  const words = ['JESUS', 'MOSES', 'NOAH', 'DAVID', 'SARAH', 'PETER', 'ELIJAH', 'BETHLEHEM'];

  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [highlightedCells, setHighlightedCells] = useState({});
  const [message, setMessage] = useState('');

  const handleCellClick = (row, col) => {
    // Add or remove cell selection on click
    const cell = { row, col };
    const alreadySelected = selectedCells.some(
      (selected) => selected.row === row && selected.col === col
    );

    const newSelection = alreadySelected
      ? selectedCells.filter((selected) => !(selected.row === row && selected.col === col))
      : [...selectedCells, cell];

    setSelectedCells(newSelection);

    // Check if the selected cells match any word regardless of order
    const selectedLetters = newSelection.map(({ row, col }) => grid[row][col]).sort().join('');
    const matchingWord = words.find(
      (word) => word.split('').sort().join('') === selectedLetters
    );

    if (matchingWord && !foundWords.includes(matchingWord)) {
      setFoundWords([...foundWords, matchingWord]);

      // Highlight the word
      const newHighlights = { ...highlightedCells };
      newHighlights[matchingWord] = [...newSelection];
      setHighlightedCells(newHighlights);

      setSelectedCells([]); // Clear selection
      setMessage(`Great job! You found ${matchingWord}`);
    } else if (selectedLetters.length > 10) {
      setSelectedCells([]);
      setMessage('Keep searching!');
    }
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
        <div className={styles.message}>{message}</div>
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
