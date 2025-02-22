import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'; // Importing necessary components
import { useNavigate } from 'react-router-dom';
import WordJumbleComp from '../components/wordJumbleComp';
import Header from '../components/header';
import '../styles/wordJumble.css';
import Footer from '../components/footer';

const WordJumblePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('easy');
    const navigate = useNavigate(); // Initializing navigate function

    return (
        <div className="word-jumble-page">
            <Header />
            <Container className="py-4">
                <Row className="justify-content-center mb-4">
                    <Col xs={12} md={8} lg={6}>
                        <Button variant="primary" onClick={() => navigate('/games')} className="w-100">
                            Back to Main Game Page
                        </Button>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <h1 className="text-center mb-2" style={{ color: "purple", fontFamily: "Allura", fontSize: "2.5rem" }}>Bible Word Shuffle</h1>
                        <p style={{ fontSize: "1rem", color: "black", fontFamily: "Quicksand" }}>
                        Unscramble the letters to find the Bible word! Choose your level: Easy, Medium, or Hard. Type your answer and click 'Check Answer' to see if you're right. <br/> <i>"I can do all things through Christ who strengthens me." – Philippians 4:13</i>
                        </p>
                    </Col>
                </Row>
                <Row className="category-buttons justify-content-center my-4">
                    <Col xs={4} sm={3} md={2}>
                        <Button variant="success" onClick={() => setSelectedCategory('easy')} className="w-100">
                            Easy
                        </Button>
                    </Col>
                    <Col xs={4} sm={3} md={2}>
                        <Button variant="warning" onClick={() => setSelectedCategory('medium')} className="w-100">
                            Medium
                        </Button>
                    </Col>
                    <Col xs={4} sm={3} md={2}>
                        <Button variant="danger" onClick={() => setSelectedCategory('hard')} className="w-100">
                            Hard
                        </Button>
                    </Col>
                </Row>
                <WordJumbleComp category={selectedCategory} />
            </Container>
            <Footer />
        </div>
    );
};

export default WordJumblePage;
