// src/components/hangman.js
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Correct import
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
    "The Bread of Life",
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
  const [maxGuesses] = useState(5);

 // Initialize navigate
 const navigate = useNavigate(); // Fix here

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
      case "expert":
        selectedWords = shuffleArray([...expertWords]);
        break;
      default:
        selectedWords = shuffleArray([...easyWords]);
    }
  
    setDifficulty(level);
    setWordList(selectedWords);
    setWord(getRandomWord(selectedWords));
    setGuesses([]); // Reset guesses
    setWrongGuesses([]); // Reset wrong guesses
  };
  

  // Check if the game is won
  const isGameWon = word
  .split("")
  .filter((char) => !/[.,'";:?!]/.test(char)) // Ignore punctuation
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
    if (/[.,'";:?!]/.test(char)) return char; // Keep punctuation visible
    return guesses.includes(char) ? char : "_"; // Display guessed letters or underscores
  })
  .join(" ");


  return (
    
    <div className="hangman-container ">
    {/* Home Button */}
    <nav className="custom-nav my-4">
  <div className="container d-flex justify-content-between">
    <Button 
      variant="warning" 
      className="custom-nav-button"
      onClick={() => navigate('/')}
    >
      🏠 Home
    </Button>

    <Button 
      variant="info" 
      className="custom-nav-button"
      onClick={() => navigate('/games')}
    >
      🎮 Games Menu
    </Button>
  </div>
</nav>


      <h1 className="game-title mt-4 mb-2" style={{fontFamily:'Cinzel Decorative', fontSize:'2rem'}}>Biblical Challenge</h1>
      <p className="instructions mb-4" >Pick a letter, guess the word. <br/>Don’t run out of guesses! <br/> <i>"Be happy even in hard times because it makes us strong – Romans 5:3-4."</i></p>

      {/* Current Difficulty */}
      <div className="difficulty-info" >
        <p> <strong>Current Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</strong></p>
        <p> <strong>Total Words Available: {wordList.length}</strong></p>
      </div>

      {/* Difficulty Selection */}
     {/* Fun, centered difficulty buttons with icons */}
<div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
  <Button variant="success" className="btn-lg px-4" onClick={() => selectDifficulty("easy")}> 🟢 Easy </Button>
  <Button variant="primary" className="btn-lg px-4" onClick={() => selectDifficulty("medium")}> 🔵 Medium </Button>
  <Button variant="warning" className="btn-lg px-4" onClick={() => selectDifficulty("hard")}> 🟠 Hard </Button>
  <Button variant="danger" className="btn-lg px-4" onClick={() => selectDifficulty("expert")}> 🔴 Expert </Button>
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
      className={`letter-button ${guesses.includes(letter) || wrongGuesses.includes(letter) ? 'used' : ''}`}
      onClick={() => handleGuess(letter)}
      disabled={guesses.includes(letter) || wrongGuesses.includes(letter)}
    >
      {letter}
    </button>
  ))}
</div>


      <div className="hangman-status">
        <p>Wrong Guesses: {wrongGuesses.join(", ")}</p>
        <p>Remaining Guesses: {maxGuesses - wrongGuesses.length}</p>
      </div>

{/* Game Over Overlay */}
      {(isGameWon || isGameLost) && (
        <div className="overlay">
          <Container className="game-message-container">
            {isGameWon && <p className="game-message">You won! The answer was "{word}". 🎉</p>}
            {isGameLost && <p className="game-message">So Close! The answer was "{word}".</p>}
            <button className="reset-button btn mt-4" onClick={resetGame}>Play Again</button>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Hangman;