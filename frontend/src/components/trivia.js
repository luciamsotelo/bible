import React, { useState, useEffect } from 'react';
import '../styles/trivia.css';

const Trivia = () => {
    // Function to shuffle an array using Fisher-Yates algorithm
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Trivia questions
    const originalQuestions = [
        {
            question: "Who built the ark?",
            options: ["Noah", "Moses", "Abraham", "David"],
            correctAnswer: "Noah",
        },
        {
            question: "What is the first book of the Bible?",
            options: ["Genesis", "Exodus", "Psalms", "Revelation"],
            correctAnswer: "Genesis",
        },
        {
            question: "How many disciples did Jesus have?",
            options: ["10", "11", "12", "13"],
            correctAnswer: "12",
        },
        {
            question: "Who was swallowed by a great fish?",
            options: ["Jonah", "Job", "Peter", "Paul"],
            correctAnswer: "Jonah",
        },
        {
            question: "What was the name of the garden where Adam and Eve lived?",
            options: ["Eden", "Gethsemane", "Canaan", "Bethel"],
            correctAnswer: "Eden",
        },
        {
            question: "Who parted the Red Sea?",
            options: ["Moses", "Joshua", "Elijah", "Aaron"],
            correctAnswer: "Moses",
        },
        {
            question: "What did God create on the first day?",
            options: ["Light", "Animals", "Plants", "Man"],
            correctAnswer: "Light",
        },
        {
            question: "Who is known as the 'father of faith'?",
            options: ["Abraham", "Isaac", "Jacob", "Joseph"],
            correctAnswer: "Abraham",
        },
        {
            question: "What is the shortest verse in the Bible?",
            options: ["Jesus wept.", "I am.", "God is love.", "Amen."],
            correctAnswer: "Jesus wept.",
        },
        {
            question: "Who was the strongest man in the Bible?",
            options: ["Samson", "David", "Saul", "Goliath"],
            correctAnswer: "Samson",
        },
    ];

    // State management
    const [questions, setQuestions] = useState(originalQuestions.map((q) => ({ ...q, options: shuffleArray(q.options) })));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const buttons = document.querySelectorAll(".option-button");
        const imageWidth = 0; // Replace with your image width
        const imageHeight = 0 ; // Replace with your image height

        buttons.forEach((button, index) => {
            const xOffset = (index % 2) * (imageWidth / 2);
            const yOffset = Math.floor(index / 2) * (imageHeight / 2);
            button.style.backgroundPosition = `${xOffset}px ${yOffset}px`;
        });
    }, [questions, currentQuestionIndex, selectedAnswer]);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if (answer === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsGameOver(true);
        }
    };

    const restartGame = () => {
        setQuestions(originalQuestions.map((q) => ({ ...q, options: shuffleArray(q.options) })));
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsGameOver(false);
    };

    if (isGameOver) {
        return (
            <div className="trivia-container">
                <h1>Game Over!</h1>
                <p>Your score is {score}/{questions.length}</p>
                <button className="next-button" onClick={restartGame}>
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div className="trivia-container">
            <h1>Bible Trivia</h1>
            <div className="question-section">
                <h2>{questions[currentQuestionIndex].question}</h2>
                <div className="options">
                    {questions[currentQuestionIndex].options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleAnswerClick(option)}
                            className={`option-button ${selectedAnswer ? (option === questions[currentQuestionIndex].correctAnswer ? "correct" : option === selectedAnswer ? "incorrect" : "") : ""}`}
                            disabled={!!selectedAnswer}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            {selectedAnswer && (
                <button className="next-button" onClick={handleNextQuestion}>
                    Next Question
                </button>
            )}
            <p>Score: {score}</p>
        </div>
    );
};

export default Trivia;