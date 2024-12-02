import React, { useState } from 'react';
import WordJumbleComp from '../components/wordJumbleComp';
import '../styles/wordJumble.css';
import Header from '../components/header';

const WordJumblePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('easy');

    return (
        <div className="word-jumble-page">
            <Header />
            <h1 className="text-center my-4">Word Jumble Game</h1>
            <div className="category-buttons">
                <button onClick={() => setSelectedCategory('easy')}>Easy</button>
                <button onClick={() => setSelectedCategory('medium')}>Medium</button>
                <button onClick={() => setSelectedCategory('hard')}>Hard</button>
            </div>
            <WordJumbleComp category={selectedCategory} />
        </div>
    );
};

export default WordJumblePage;
