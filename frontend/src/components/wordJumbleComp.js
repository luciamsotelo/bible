import React, { useState } from 'react';
import '../styles/wordJumble.css';

const wordSets = {
    easy: [
        { word: 'Noah', clue: 'Built the Ark' },
        { word: 'Eve', clue: 'First woman' },
        { word: 'David', clue: 'Defeated Goliath' },
        { word: 'Adam', clue: 'First man' },
        { word: 'Moses', clue: 'Led Israelites out of Egypt' },
        { word: 'Jonah', clue: 'Swallowed by a big fish' },
        { word: 'Ruth', clue: 'Loyal daughter-in-law' },
        { word: 'Mary', clue: 'Mother of Jesus' },
        { word: 'Paul', clue: 'Wrote many New Testament letters' },
        { word: 'Peter', clue: 'Denied Jesus three times' },
        { word: 'Joseph', clue: 'Had a coat of many colors' },
        { word: 'Jesus', clue: 'Savior of the world' },
        { word: 'Abel', clue: 'Killed by his brother Cain' },
    ],
    medium: [
        { word: 'Exodus', clue: 'Second book of the Bible' },
        { word: 'Jericho', clue: 'Walls came tumbling down' },
        { word: 'Isaiah', clue: 'Prophet with 66 chapters' },
        { word: 'Genesis', clue: 'The beginning book' },
        { word: 'Leviticus', clue: 'Laws of the priests' },
        { word: 'Philippians', clue: 'Epistle of joy' },
        { word: 'Galatians', clue: 'Paul wrote to them about faith' },
        { word: 'Corinthians', clue: 'Two letters to a divided church' },
        { word: 'Revelation', clue: 'Last book of the Bible' },
        { word: 'Romans', clue: 'Paul’s letter about righteousness' },
        { word: 'Proverbs', clue: 'Book of wisdom' },
        { word: 'Ecclesiastes', clue: 'Book about life’s meaning' },
        { word: 'Hosea', clue: 'Prophet with a faithful love story' },
    ],
    hard: [
        { word: 'Nebuchadnezzar', clue: 'King of Babylon' },
        { word: 'Melchizedek', clue: 'Priest of God Most High' },
        { word: 'Zerubbabel', clue: 'Rebuilt the temple' },
        { word: 'Beelzebub', clue: 'Another name for Satan' },
        { word: 'Jehoshaphat', clue: 'King who prayed for victory' },
        { word: 'Epaphroditus', clue: 'Helper of Paul' },
        { word: 'Habakkuk', clue: 'Prophet who questioned God' },
        { word: 'Methuselah', clue: 'Oldest man in the Bible' },
        { word: 'Abednego', clue: 'One of the fiery furnace trio' },
        { word: 'Shadrach', clue: 'One of the fiery furnace trio' },
        { word: 'Meshach', clue: 'One of the fiery furnace trio' },
        { word: 'Eliphaz', clue: 'Friend of Job' },
        { word: 'Obadiah', clue: 'Shortest Old Testament book' },
    ],
};


const shuffleWord = (word) => word.split('').sort(() => Math.random() - 0.5).join('');

const WordJumbleComp = ({ category }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [correct, setCorrect] = useState(false);
    const [checked, setChecked] = useState(false); // Tracks if the answer has been checked

    const currentSet = wordSets[category];
    const currentWord = currentSet[currentIndex];

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setChecked(false); // Reset checked state when input changes
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    };

    const checkAnswer = () => {
        setChecked(true); // Mark as checked
        if (input.toLowerCase() === currentWord.word.toLowerCase()) {
            setCorrect(true);
        } else {
            setCorrect(false);
        }
    };

    const nextWord = () => {
        setInput('');
        setCorrect(false);
        setChecked(false); // Reset checked state for the next word
        setCurrentIndex((prev) => (prev + 1) % currentSet.length);
    };

    return (
        <div className="word-jumble-container">
            <h2>Category: {category}</h2>
            <p>Clue: {currentWord.clue}</p>
            <div className="jumbled-word">{shuffleWord(currentWord.word)}</div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress} // Check for the Enter key
                placeholder="Unscramble the word"
            />
            <button onClick={checkAnswer}>Check Answer</button>
            {checked && correct && <p className="correct">Correct! Great job!</p>}
            {checked && !correct && <p className="incorrect">Try again!</p>}
            <button onClick={nextWord}>Next Word</button>
        </div>
    );
};

export default WordJumbleComp;
