import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'; // Importing necessary components
import { useNavigate } from 'react-router-dom';
import WordJumbleComp from '../components/wordJumbleComp';
import '../styles/wordJumble.css';

const WordJumblePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('easy');
    const navigate = useNavigate(); // Initializing navigate function

    return (
        <div className="word-jumble-page">
            <Container className="py-4">
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
                <Row className="text-center">
                    <Col>
                        <h1 className="text-center mb-2" style={{ color: "purple", fontFamily: "Allura", fontSize: "2.5rem" }}>Bible Word Shuffle</h1>
                        <p style={{ fontSize: "1rem", color: "black", fontFamily: "Quicksand" }}>
                        Unscramble the letters to find the Bible word! Choose your level: Easy, Medium, or Hard. Type your answer and click 'Check Answer' to see if you're right. <br/><br/> <i>"I can do all things through Christ who strengthens me." – Philippians 4:13</i>
                        </p>
                    </Col>
                </Row>
                <Row className="category-buttons justify-content-center my-4">
                    {/* Difficulty Selection */}
                    {/* Fun, centered difficulty buttons with icons */}
                    <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                        <Button variant="success" className="btn-lg px-4" onClick={() => setSelectedCategory("easy")}> 🟢 Easy </Button>
                        <Button variant="warning" className="btn-lg px-4" onClick={() => setSelectedCategory("medium")}> 🟠 Medium </Button>
                        <Button variant="danger" className="btn-lg px-4" onClick={() => setSelectedCategory("hard")}> 🔴 Hard </Button>
                    </div>
                </Row>

                <WordJumbleComp category={selectedCategory} />
            </Container>
        </div>
    );
};

export default WordJumblePage;
