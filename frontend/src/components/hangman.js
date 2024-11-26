// src/components/hangman.js
import React, { useState } from "react";
import "../styles/hangman.css";

const Hangman = () => {
  // Lists of biblical words/phrases by difficulty
  const easyWords = [
    "Genesis", "Exodus", "Noah", "Ruth", "Faith", "Jonah", "Moses", "Jesus", 
    "Grace", "Prayer", "Adam", "Eve", "Psalm", "Love", "Holy", "Peace", 
    "Light", "Hope", "Jacob", "Abel", "Mary", "Aaron", "Joseph", "Isaac", 
    "Bible", "Angel", "Heaven", "Christ", "Truth", "David", "Glory", 
    "King", "Lord", "Peter", "Cross", "Life", "Sin", "Paul", "John", 
    "Lamb", "Star", "Wine", "Joy", "Elijah", "Temple", "Dove", "Bread", 
    "Soul", "Blood", "Eden", "Sword", "Ark", "Job", "Love", "Shepherd", 
    "Leah", "Hannah", "Sarah", "Covenant", "Tower", "Judah", "Samuel", 
    "Zion", "Yahweh", "Witness", "Praise", "Faithful", "Blessing", "Wisdom", 
    "Disciple", "Kingdom", "Rock", "Lion", "Miracle", "Sabbath", "Messiah"
  ];
  

  const mediumWords = [
    "The Ten Commandments", "Mount Sinai", "David and Goliath", 
    "The Last Supper", "The Good Samaritan", "The Prodigal Son",
    "The Lord's Prayer", "The Tree of Life", "Parting of the Red Sea", 
    "The Burning Bush", "Joseph's Coat of Many Colors", 
    "Daniel in the Lion's Den", "The Birth of Jesus", "The Beatitudes", 
    "The Golden Calf", "The Widow's Mite", "The Tower of Babel", 
    "The Garden of Gethsemane", "The Baptism of Jesus", "The Fiery Furnace",
    "Elijah's Chariot of Fire", "The Feeding of the Five Thousand", 
    "The Battle of Jericho", "Jesus Walks on Water", "The Parable of the Sower"
  ];
  

  const hardWords = [
    "The Sermon on the Mount", "By His Stripes We Are Healed", 
    "The Alpha and the Omega", "Take Up Your Cross and Follow Me", 
    "The Walls of Jericho", "I Am the Way, the Truth, and the Life",
    "Be Still and Know That I Am God", "The Armor of God", 
    "Trust in the Lord with All Your Heart", "Man Shall Not Live by Bread Alone",
    "The Parable of the Lost Sheep", "The Fruits of the Spirit", 
    "The Pharisee and the Tax Collector", "The Great Commission", 
    "The Valley of Dry Bones", "The Lamb of God", "The Book of Life",
    "The Stone the Builders Rejected", "Do Not Fear, for I Am with You", 
    "The Bread of Life"
  ];
  

  const challengingWords = [
    "For God So Loved the World That He Gave His Only Son",
    "Though I Walk Through the Valley of the Shadow of Death",
    "Blessed Are the Poor in Spirit, for Theirs is the Kingdom of Heaven",
    "The Peace of God, Which Surpasses All Understanding, Will Guard Your Hearts and Minds",
    "Whatever You Do, Do It All for the Glory of God",
    "Come to Me, All You Who Are Weary and Burdened, and I Will Give You Rest",
    "The Joy of the Lord Is My Strength", "Your Word Is a Lamp to My Feet",
    "If God Is for Us, Who Can Be Against Us", 
    "My Grace Is Sufficient for You, for My Power Is Made Perfect in Weakness",
    "I Can Do All Things Through Christ Who Strengthens Me",
    "Seek First the Kingdom of God and His Righteousness",
    "The Spirit Is Willing but the Flesh Is Weak",
    "The First Shall Be Last, and the Last Shall Be First",
    "Do Unto Others as You Would Have Them Do Unto You"
  ];
  

  const expertWords = [
    "The Lord Bless You and Keep You; The Lord Make His Face Shine Upon You",
    "The Earth is the Lord's, and Everything In It, the World, and All Who Live in It",
    "Do Not Be Anxious About Anything, but in Everything, by Prayer and Petition, With Thanksgiving, Present Your Requests to God",
    "For Where Your Treasure Is, There Your Heart Will Be Also",
    "Even Though I Walk Through the Valley of the Shadow of Death, I Will Fear No Evil",
    "Let Us Run with Perseverance the Race Marked Out for Us",
    "No Weapon Formed Against You Shall Prosper", 
    "For the Wages of Sin Is Death, but the Gift of God Is Eternal Life",
    "But Those Who Hope in the Lord Will Renew Their Strength",
    "He Who Dwells in the Secret Place of the Most High Shall Abide Under the Shadow of the Almighty",
    "The Lord Is My Shepherd; I Shall Not Want",
    "God Works All Things Together for the Good of Those Who Love Him",
    "Greater Love Has No One Than This, That He Lay Down His Life for His Friends",
    "In the Beginning Was the Word, and the Word Was with God, and the Word Was God",
    "Every Good and Perfect Gift Is from Above, Coming Down from the Father of Lights"
  ];
  

  // Function to shuffle an array
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Function to get a random word from the current word list
  const getRandomWord = (list) =>
    list[Math.floor(Math.random() * list.length)].toUpperCase();

  const [difficulty, setDifficulty] = useState("easy");
  const [wordList, setWordList] = useState(shuffleArray([...easyWords]));
  const [word, setWord] = useState(getRandomWord(wordList));
  const [guesses, setGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [maxGuesses] = useState(6);

  // Handle difficulty selection
  const selectDifficulty = (level) => {
    let selectedWords;
    switch (level) {
      case "easy":
        selectedWords = shuffleArray([...easyWords]);
        break;
      case "medium":
        selectedWords = shuffleArray([...mediumWords]);
        break;
      case "hard":
        selectedWords = shuffleArray([...hardWords]);
        break;
      case "challenging":
        selectedWords = shuffleArray([...challengingWords]);
        break;
      case "expert":
        selectedWords = shuffleArray([...expertWords]);
        break;
      default:
        selectedWords = shuffleArray([...easyWords]);
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
    setWord(getRandomWord(wordList));
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

      {/* Current Difficulty */}
      <div className="difficulty-info">
        <p>Current Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
        <p>Total Words Available: {wordList.length}</p>
      </div>

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
