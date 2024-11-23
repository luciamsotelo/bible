// src/components/hangman.js
import React, { useState } from "react";
import "../styles/hangman.css";

const Hangman = () => {
  // Lists of biblical words/phrases by difficulty
  const easyWords = [
    "Genesis", "Exodus", "Noah", "Ruth", "Faith", "Jonah", "Moses", "Jesus", "Grace", "Prayer"
  ];

  const mediumWords = [
    "The Ten Commandments", "Mount Sinai", "David and Goliath", 
    "The Last Supper", "The Good Samaritan", "The Prodigal Son",
    "The Lord's Prayer", "The Tree of Life", "Parting of the Red Sea", 
    "The Burning Bush"
  ];

  const hardWords = [
    "The Sermon on the Mount", "By His Stripes We Are Healed", 
    "The Alpha and the Omega", "Take Up Your Cross and Follow Me", 
    "The Walls of Jericho", "I Am the Way, the Truth, and the Life",
    "Be Still and Know That I Am God", "The Armor of God", 
    "Trust in the Lord with All Your Heart", 
    "Man Shall Not Live by Bread Alone"
  ];

  const challengingWords = [
    "For God So Loved the World That He Gave His Only Son",
    "Though I Walk Through the Valley of the Shadow of Death",
    "Blessed Are the Poor in Spirit, for Theirs is the Kingdom of Heaven",
    "The Peace of God, Which Surpasses All Understanding, Will Guard Your Hearts and Minds",
    "Whatever You Do, Do It All for the Glory of God"
  ];

  const expertWords = [
    "The Lord Bless You and Keep You; The Lord Make His Face Shine Upon You",
    "The Earth is the Lord's, and Everything In It, the World, and All Who Live in It",
    "Do Not Be Anxious About Anything, but in Everything, by Prayer and Petition, With Thanksgiving, Present Your Requests to God",
    "For Where Your Treasure Is, There Your Heart Will Be Also",
    "Even Though I Walk Through the Valley of the Shadow of Death, I Will Fear No Evil"
  ];

  // Function to get a random word from the current word list
  const getRandomWord = (list) =>
    list[Math.floor(Math.random() * list.length)].toUpperCase();

  const [difficulty, setDifficulty] = useState("easy");
  const [wordList, setWordList] = useState(easyWords);
  const [word, setWord] = useState(getRandomWord(easyWords));
  const [guesses, setGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [maxGuesses] = useState(6);

  // Handle difficulty selection
  const selectDifficulty = (level) => {
    let selectedWords;
    switch (level) {
      case "easy":
        selectedWords = easyWords;
        break;
      case "medium":
        selectedWords = mediumWords;
        break;
      case "hard":
        selectedWords = hardWords;
        break;
      case "challenging":
        selectedWords = challengingWords;
        break;
      case "expert":
        selectedWords = expertWords;
        break;
      default:
        selectedWords = easyWords;
    }
    setDifficulty(level);
    setWordList(selectedWords);
    setWord(getRandomWord(selectedWords));
    resetGame();
  };

  // Check if the game is won
  const isGameWon = word
    .split("")
    .every((letter) => letter === " " || guesses.includes(letter));

  // Check if the game is lost
  const isGameLost = wrongGuesses.length >= maxGuesses;

  // Handle a guessed letter
  const handleGuess = (letter) => {
    if (guesses.includes(letter) || wrongGuesses.includes(letter)) return;

    if (word.includes(letter)) {
      setGuesses([...guesses, letter]);
    } else {
      setWrongGuesses([...wrongGuesses, letter]);
    }
  };

  // Reset the game
  const resetGame = () => {
    setGuesses([]);
    setWrongGuesses([]);
  };

  // Display the current word with guessed letters
  const displayWord = word
    .split("")
    .map((char) => {
      if (char === " ") return " "; // Keep spaces
      if (/[.,'";:?!]/.test(char)) return char; // Keep punctuation
      return guesses.includes(char) ? char : "_"; // Display guessed letters or underscores
    })
    .join(" ");

  return (
    <div className="hangman-container">
      <h1>Hangman: Biblical Edition</h1>

      {/* Difficulty Selection */}
      <div className="difficulty-buttons">
        <button onClick={() => selectDifficulty("easy")}>Easy</button>
        <button onClick={() => selectDifficulty("medium")}>Medium</button>
        <button onClick={() => selectDifficulty("hard")}>Hard</button>
        <button onClick={() => selectDifficulty("challenging")}>Challenging</button>
        <button onClick={() => selectDifficulty("expert")}>Expert</button>
      </div>

      <div className="hangman-word">
        {displayWord.split(" ").map((word, index) => (
          <span key={index}>{word}</span>
        ))}
      </div>

      <div className="hangman-letters">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            className="letter-button"
            onClick={() => handleGuess(letter)}
            disabled={guesses.includes(letter) || wrongGuesses.includes(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="hangman-status">
        <p>Wrong Guesses: {wrongGuesses.join(", ")}</p>
        <p>Remaining Attempts: {maxGuesses - wrongGuesses.length}</p>
      </div>

      {isGameWon && <p className="game-message">You won! 🎉</p>}
      {isGameLost && (
        <p className="game-message">You lost! The word was "{word}".</p>
      )}

      {(isGameWon || isGameLost) && (
        <button className="reset-button" onClick={resetGame}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default Hangman;
