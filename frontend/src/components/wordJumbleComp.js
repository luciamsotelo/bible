import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
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
    const [checked, setChecked] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [score, setScore] = useState(0);
    const [revealedAnswer, setRevealedAnswer] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    // Reference to input element to focus on it
    const inputRef = useRef(null);

    const currentSet = wordSets[category];
    const currentWord = currentSet[currentIndex];

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setChecked(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !correct && attempts < 3) {
            checkAnswer();
        }
    };

    const checkAnswer = () => {
        setChecked(true);
        setAttempts(attempts + 1);
    
        if (input.toLowerCase() === currentWord.word.toLowerCase()) {
            setCorrect(true);
            setScore(score + 10);
        } else {
            setCorrect(false);
            if (attempts === 2) {
                setRevealedAnswer(true);
                setTimeout(() => {
                    nextWord(); // Automatically move to the next word after 2 seconds
                }, 2000);  // 2 second delay
            }
        }
    };
    
    const nextWord = () => {
        if (currentIndex + 1 < currentSet.length) {
            setInput('');
            setCorrect(false);
            setChecked(false);
            setAttempts(0);
            setRevealedAnswer(false);
            setCurrentIndex((prev) => prev + 1);
        } else {
            setGameOver(true);
        }
    };
    

    const restartGame = () => {
        setCurrentIndex(0);
        setInput('');
        setCorrect(false);
        setChecked(false);
        setAttempts(0);
        setScore(0);
        setRevealedAnswer(false);
        setGameOver(false);
    };

    // Automatically move to next word after a correct guess
    if (correct && attempts < 3) {
        setTimeout(() => {
            nextWord();
        }, 1500);
    }

    // Automatically focus on input when game starts or when new word is shown
    useEffect(() => {
        if (!gameOver && !correct) {
            inputRef.current?.focus();
        }
    }, [currentIndex, gameOver, correct]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    {!gameOver ? (
                        <>
                            <h3>Clue: {currentWord.clue}</h3>
                            <div className="jumbled-word">{shuffleWord(currentWord.word)}</div>
                            <Form.Control
                                ref={inputRef} // Reference for auto-focus
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}
                                placeholder="Unscramble the word"
                                className="mb-3"
                                disabled={correct || attempts === 3}
                            />
                            <Button variant="success" onClick={checkAnswer} className="w-100 mb-2" disabled={correct || attempts === 3}>
                                Check Answer
                            </Button>
                            {checked && correct && <Alert variant="success">Correct! Great job!</Alert>}
                            {checked && !correct && <Alert variant="danger">Try again!</Alert>}
                            {revealedAnswer && <Alert variant="info">The correct answer is: {currentWord.word}</Alert>}

                            <div className="mt-4">
                                <h4>Score: {score}</h4>
                                <p>Attempts remaining: {3 - attempts}</p>
                            </div>
                        </>
                    ) : (
                        <div>
                            <h3>Game Over!</h3>
                            <h4>Your Final Score: {score}</h4>
                            <Button variant="info" onClick={restartGame}>Restart Game</Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default WordJumbleComp;
