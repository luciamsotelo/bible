import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/daniellion.css';

const originalPieces = [
    { id: 1, src: '/images/puzzledanielandlion1.jpg', position: null },
    { id: 2, src: '/images/puzzledanielandlion2.jpg', position: null },
    { id: 3, src: '/images/puzzledanielandlion3.jpg', position: null },
    { id: 4, src: '/images/puzzledanielandlion4.jpg', position: null },
    { id: 5, src: '/images/puzzledanielandlion5.jpg', position: null },
    { id: 6, src: '/images/puzzledanielandlion6.jpg', position: null },
    { id: 7, src: '/images/puzzledanielandlion7.jpg', position: null },
    { id: 8, src: '/images/puzzledanielandlion8.jpg', position: null },
    { id: 9, src: '/images/puzzledanielandlion9.jpg', position: null },
    { id: 10, src: '/images/puzzledanielandlion10.jpg', position: null },
    { id: 11, src: '/images/puzzledanielandlion11.jpg', position: null },
    { id: 12, src: '/images/puzzledanielandlion12.jpg', position: null },
    { id: 13, src: '/images/puzzledanielandlion13.jpg', position: null },
    { id: 14, src: '/images/puzzledanielandlion14.jpg', position: null },
    { id: 15, src: '/images/puzzledanielandlion15.jpg', position: null },
    { id: 16, src: '/images/puzzledanielandlion16.jpg', position: null },
];

const PuzzleDanielLion = () => {
    const [pieces, setPieces] = useState(originalPieces);
    const [droppedPieces, setDroppedPieces] = useState({});
    const [puzzleCompleted, setPuzzleCompleted] = useState(false);
    const [puzzleClose, setPuzzleClose] = useState(false);
    const navigate = useNavigate();

    const shufflePieces = () => {
        const shuffled = [...pieces].sort(() => Math.random() - 0.5);
        setPieces(shuffled.map(piece => ({ ...piece, position: null })));
        setDroppedPieces({});
        setPuzzleCompleted(false);
        setPuzzleClose(false);
    };

    const resetPuzzle = () => {
        setPieces(originalPieces);
        setDroppedPieces({});
        setPuzzleCompleted(false);
        setPuzzleClose(false);
    };

    useEffect(() => {
        shufflePieces(); // Shuffle pieces when the component mounts
    }, []); // Empty dependency array ensures this runs once

    const handleDragStart = (e, piece) => {
        e.dataTransfer.setData("pieceId", piece.id);
    };

    const handleDrop = (e, position) => {
        e.preventDefault();
        const pieceId = e.dataTransfer.getData("pieceId");
        const pieceIndex = pieces.findIndex(piece => piece.id === parseInt(pieceId));

        if (pieceIndex !== -1) {
            const newDroppedPieces = { ...droppedPieces };
            newDroppedPieces[position] = pieces[pieceIndex];
            setDroppedPieces(newDroppedPieces);
            setPieces(prev => 
                prev.map(piece => 
                    piece.id === pieces[pieceIndex].id ? { ...piece, position } : piece
                )
            );
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleRemovePiece = (position) => {
        const pieceToRemove = droppedPieces[position];
        if (pieceToRemove) {
            setPieces(prev => 
                prev.map(piece => 
                    piece.id === pieceToRemove.id ? { ...piece, position: null } : piece
                )
            );
            setDroppedPieces(prev => ({ ...prev, [position]: null }));
        }
    };

    const handleLockPuzzle = () => {
        const newPieces = [...pieces];
        const correctPositions = {
            1: 'top-left', 2: 'top-center-left', 3: 'top-center-right', 4: 'top-right',
            5: 'middle-left', 6: 'middle-center-left', 7: 'middle-center-right', 8: 'middle-right',
            9: 'bottom-left', 10: 'bottom-center-left', 11: 'bottom-center-right', 12: 'bottom-right',
            13: 'extra1', 14: 'extra2', 15: 'extra3', 16: 'extra4'
        };

        let correctCount = 0;
        newPieces.forEach(piece => {
            if (correctPositions[piece.id] === piece.position) {
                piece.locked = true;
                correctCount++;
            }
        });

        setPieces(newPieces);

        if (correctCount === 16) {
            setPuzzleCompleted(true);
            setPuzzleClose(false);
        } else if (correctCount > 0) {
            setPuzzleClose(true); 
            setPuzzleCompleted(false);
        } else {
            setPuzzleClose(false);
        }
    };

    const playAgain = () => {
        resetPuzzle();
    };

    const goToGamePage = () => {
        navigate('/games/puzzle');
    };

    return (
        <Container>
            <div className="daniellion-instructions text-center mb-4">
                <h2>Puzzle Instructions</h2>
                <p>Drag and drop the pieces into their correct positions to complete the puzzle.</p>
                <p>Once all pieces are in place, click the "Check Puzzle" button to see if you have completed it correctly.</p>
            </div>

            {puzzleCompleted ? (
                <div className="daniellion-completed-puzzle-container text-center">
                    <img src="/images/puzzledanielandlion.jpg" alt="Completed Puzzle" className="daniellion-completed-puzzle-image daniellion-img-fluid daniellion-full-image w-50 d-block mx-auto" />
                    <h3>Congratulations! You've completed the puzzle!</h3>
                    <Button variant="success" onClick={playAgain} className="daniellion-button-animate" style={{ margin: '10px' }}>
                        Play Again
                    </Button>
                    <Button variant="info" onClick={goToGamePage} className="daniellion-button-animate" style={{ margin: '10px' }}>
                        Back to Puzzle Page
                    </Button>
                </div>
            ) : (
                <>
                    {puzzleClose && (
                        <div className="daniellion-close-message text-center">
                            <h3>You're close! Keep trying!</h3>
                        </div>
                    )}

                    <Row className="daniellion-puzzle-grid">
                        {['top-left', 'top-center-left', 'top-center-right', 'top-right', 
                        'middle-left', 'middle-center-left', 'middle-center-right', 'middle-right',
                        'bottom-left', 'bottom-center-left', 'bottom-center-right', 'bottom-right',
                        'extra1', 'extra2', 'extra3', 'extra4'].map((position) => (
                            <Col xs={3} className="daniellion-drop-zone" onDrop={(e) => handleDrop(e, position)} onDragOver={handleDragOver} key={position}>
                                {droppedPieces[position] && (
                                    <div onClick={() => handleRemovePiece(position)} className="">
                                        <img src={droppedPieces[position].src} alt={position} className="daniellion-img-fluid daniellion-full-image" />
                                    </div>
                                )}
                            </Col>
                        ))}
                    </Row>

                    <Row className="daniellion-puzzle-grid">
                        {pieces.map(piece => (
                            piece.position === null && (
                                <Col xs={3} key={piece.id} className="daniellion-puzzle-piece-container">
                                    <div 
                                        className="daniellion-puzzle-piece" 
                                        draggable 
                                        onDragStart={(e) => handleDragStart(e, piece)}
                                    >
                                        <img src={piece.src} alt={`Piece ${piece.id}`} className="daniellion-img-fluid" />
                                    </div>
                                </Col>
                            )
                        ))}
                    </Row>

                    <Button variant="primary" onClick={shufflePieces} className="daniellion-button-animate" style={{ margin: '10px' }}>
                        Shuffle Puzzle
                    </Button>
                    <Button variant="secondary" onClick={resetPuzzle} className="daniellion-button-animate" style={{ margin: '10px' }}>
                        Reset Puzzle
                    </Button>
                    <Button variant="success" onClick={handleLockPuzzle} className="daniellion-button-animate" style={{ margin: '10px' }}>
                        Check Puzzle
                    </Button>
                </>
            )}
        </Container>
    );
};

export default PuzzleDanielLion;
