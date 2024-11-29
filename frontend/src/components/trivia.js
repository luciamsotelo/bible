import React, { useState } from 'react';
import '../styles/trivia.css';

const Trivia = () => {
    const questions = [
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
        {
            question: "What is the last book of the Bible?",
            options: ["Revelation", "Jude", "Acts", "Malachi"],
            correctAnswer: "Revelation",
        },
        {
            question: "Who killed Goliath?",
            options: ["David", "Saul", "Jonathan", "Samson"],
            correctAnswer: "David",
        },
        {
            question: "What was the name of the place where Jesus was crucified?",
            options: ["Golgotha", "Bethlehem", "Nazareth", "Jericho"],
            correctAnswer: "Golgotha",
        },
        {
            question: "What did Jesus turn water into?",
            options: ["Wine", "Bread", "Milk", "Honey"],
            correctAnswer: "Wine",
        },
        {
            question: "Who betrayed Jesus for thirty pieces of silver?",
            options: ["Judas", "Peter", "Thomas", "Matthew"],
            correctAnswer: "Judas",
        },
        {
            question: "What is the first commandment?",
            options: [
                "You shall have no other gods before me.",
                "You shall not kill.",
                "Honor your father and mother.",
                "You shall not steal.",
            ],
            correctAnswer: "You shall have no other gods before me.",
        },
        {
            question: "Who was the first king of Israel?",
            options: ["Saul", "David", "Solomon", "Samuel"],
            correctAnswer: "Saul",
        },
        {
            question: "What is the name of the river where Jesus was baptized?",
            options: ["Jordan", "Nile", "Euphrates", "Tigris"],
            correctAnswer: "Jordan",
        },
        {
            question: "How many plagues did God send on Egypt?",
            options: ["10", "7", "5", "12"],
            correctAnswer: "10",
        },
        {
            question: "What food did God provide to the Israelites in the wilderness?",
            options: ["Manna", "Bread", "Fish", "Quail"],
            correctAnswer: "Manna",
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);

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
            alert(`Game over! Your score is ${score}/${questions.length}`);
            setCurrentQuestionIndex(0);
            setScore(0);
        }
    };

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
                            className={`option-button ${
                                selectedAnswer
                                    ? option === questions[currentQuestionIndex].correctAnswer
                                        ? "correct"
                                        : option === selectedAnswer
                                        ? "incorrect"
                                        : ""
                                    : ""
                            }`}
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
