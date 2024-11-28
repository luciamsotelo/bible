import React, { useState } from 'react';
import WordJumbleComp from '../components/wordJumbleComp';
import '../styles/wordJumble.css';

const WordJumblePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('easy');

    return (
        <div className="word-jumble-page">
            <h1>Word Jumble Game</h1>
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
