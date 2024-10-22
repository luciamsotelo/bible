import React, { useState, useEffect } from 'react'; // <-- Add useEffect here
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/puzzle_noah.css';

const PuzzleNoah = () => {
    const originalPieces = [
        { id: 1, src: '/images/puzzleark1.jpg', position: null },
        { id: 2, src: '/images/puzzleark2.jpg', position: null },
        { id: 3, src: '/images/puzzleark3.jpg', position: null },
        { id: 4, src: '/images/puzzleark4.jpg', position: null },
    ];

    const [pieces, setPieces] = useState(originalPieces);
    const [droppedPieces, setDroppedPieces] = useState({});
    const [puzzleCompleted, setPuzzleCompleted] = useState(false);
    const [puzzleClose, setPuzzleClose] = useState(false);
    const navigate = useNavigate();

    // Shuffle pieces on initial render
    useEffect(() => {
        shufflePieces(); // Automatically shuffle pieces when the component mounts
    }, []); // Empty dependency array ensures this runs only once

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

    const handleDragStart = (e, piece) => {
        e.dataTransfer.setData("pieceId", piece.id);
    };

    const handleDrop = (e, position) => {
        e.preventDefault();
        const pieceId = e.dataTransfer.getData("pieceId");
        const pieceIndex = pieces.findIndex(piece => piece.id === parseInt(pieceId));

        if (pieceIndex !== -1) {
            const newDroppedPieces = { ...droppedPieces };

            if (newDroppedPieces[position]) {
                const existingPieceId = newDroppedPieces[position].id;
                newDroppedPieces[position] = null;
                setPieces(prev => prev.map(piece => 
                    piece.id === existingPieceId ? { ...piece, position: null } : piece
                ));
            }

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
            1: 'top-left',
            2: 'top-right',
            3: 'bottom-left',
            4: 'bottom-right'
        };

        let correctCount = 0;

        newPieces.forEach(piece => {
            if (correctPositions[piece.id] === piece.position) {
                piece.locked = true;
                correctCount++;
            }
        });

        setPieces(newPieces);

        if (correctCount === 4) {
            setPuzzleCompleted(true);
            setPuzzleClose(false);
        } else if (correctCount > 0 && correctCount < 4) {
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
            <div className="instructions text-center mb-4">
                <h2>Puzzle Instructions</h2>
                <p>Drag and drop the pieces into their correct positions to complete the puzzle.</p>
                <p>Once all pieces are in place, click the "Check Puzzle" button to see if you have completed it correctly.</p>
            </div>

            {puzzleCompleted ? (
                <div className="completed-puzzle-container text-center">
                    <img src="/images/puzzleark.jpg" alt="Completed Puzzle" className="img-fluid full-image w-50 d-block mx-auto" />
                    <h3>Congratulations! You've completed the puzzle!</h3>
                    <Button variant="success" onClick={playAgain} className="button-animate" style={{ margin: '10px' }}>
                        Play Again
                    </Button>
                    <Button variant="info" onClick={goToGamePage} className="button-animate" style={{ margin: '10px' }}>
                        Back to Puzzle Page
                    </Button>
                </div>
            ) : (
                <>
                    {puzzleClose && (
                        <div className="close-message text-center">
                            <h3>You're close! Keep trying!</h3>
                        </div>
                    )}

                    <Row className="puzzle-grid">
                        <Col xs={6} className="drop-zone" onDrop={(e) => handleDrop(e, 'top-left')} onDragOver={handleDragOver}>
                            {droppedPieces['top-left'] && (
                                <div onClick={() => handleRemovePiece('top-left')} className="img-container">
                                    <img src={droppedPieces['top-left'].src} alt="Top Left" className="img-fluid full-image" />
                                </div>
                            )}
                        </Col>
                        <Col xs={6} className="drop-zone" onDrop={(e) => handleDrop(e, 'top-right')} onDragOver={handleDragOver}>
                            {droppedPieces['top-right'] && (
                                <div onClick={() => handleRemovePiece('top-right')} className="img-container">
                                    <img src={droppedPieces['top-right'].src} alt="Top Right" className="img-fluid full-image" />
                                </div>
                            )}
                        </Col>
                        <Col xs={6} className="drop-zone" onDrop={(e) => handleDrop(e, 'bottom-left')} onDragOver={handleDragOver}>
                            {droppedPieces['bottom-left'] && (
                                <div onClick={() => handleRemovePiece('bottom-left')} className="img-container">
                                    <img src={droppedPieces['bottom-left'].src} alt="Bottom Left" className="img-fluid full-image" />
                                </div>
                            )}
                        </Col>
                        <Col xs={6} className="drop-zone" onDrop={(e) => handleDrop(e, 'bottom-right')} onDragOver={handleDragOver}>
                            {droppedPieces['bottom-right'] && (
                                <div onClick={() => handleRemovePiece('bottom-right')} className="img-container">
                                    <img src={droppedPieces['bottom-right'].src} alt="Bottom Right" className="img-fluid full-image" />
                                </div>
                            )}
                        </Col>
                    </Row>

                    <Row className="puzzle-grid">
                        {pieces.map(piece => (
                            piece.position === null && (
                                <Col key={piece.id} xs={6} className="puzzle-piece-container">
                                    <div 
                                        className="puzzle-piece" 
                                        draggable 
                                        onDragStart={(e) => handleDragStart(e, piece)}
                                    >
                                        <img src={piece.src} alt={`Piece ${piece.id}`} className="img-fluid" />
                                    </div>
                                </Col>
                            )
                        ))}
                    </Row>

                    <Button variant="primary" onClick={shufflePieces} className="button-animate" style={{ margin: '10px' }}>
                        Shuffle Puzzle
                    </Button>
                    <Button variant="secondary" onClick={resetPuzzle} className="button-animate" style={{ margin: '10px' }}>
                        Reset Puzzle
                    </Button>
                    <Button variant="success" onClick={handleLockPuzzle} className="button-animate" style={{ margin: '10px' }}>
                        Check Puzzle
                    </Button>
                </>
            )}
        </Container>
    );
};

export default PuzzleNoah;
