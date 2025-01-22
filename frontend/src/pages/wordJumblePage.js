import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Importing Button from React Bootstrap
import { useNavigate } from 'react-router-dom'; // Importing navigate hook for navigation
import WordJumbleComp from '../components/wordJumbleComp';
import Header from '../components/header';
import '../styles/wordJumble.css';

const WordJumblePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('easy');
    const navigate = useNavigate(); // Initializing navigate function

    return (
        <div className="word-jumble-page">
            <Header />
            <Button variant="primary" onClick={() => navigate('/games')}>
                Back to Main Game Page
            </Button>
            <h1 className="text-center my-4" style={{ color: "goldenrod", textShadow: "2px 2px 8px black", fontFamily: "allura", fontSize: "3rem", fontWeight: "bold", }}>Word Jumble</h1>

            <p className="my-1" style ={{ fontSize: "1.2rem",  color: "purple", fontFamily: "Quicksand"}}>Unscramble the letters to find the correct word! Type your answer and click "Check Answer" to see if you're right.</p>

            <div className="category-buttons my-3">
                <button onClick={() => setSelectedCategory('easy')}>Easy</button>
                <button onClick={() => setSelectedCategory('medium')}>Medium</button>
                <button onClick={() => setSelectedCategory('hard')}>Hard</button>
            </div>
            <WordJumbleComp category={selectedCategory} />
        </div>
    );
};

export default WordJumblePage;
