import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Container, Button } from 'react-bootstrap';

import '../styles/puzzlenoah.css';

const PuzzleNoah = () => {
    

    const originalPieces = useMemo(() => [
        { id: 1, src: '/images/puzzleark1.jpg', position: null },
        { id: 2, src: '/images/puzzleark2.jpg', position: null },
        { id: 3, src: '/images/puzzleark3.jpg', position: null },
        { id: 4, src: '/images/puzzleark4.jpg', position: null },
    ], []);

    const [pieces, setPieces] = useState(originalPieces);
    const [droppedPieces, setDroppedPieces] = useState({});
    const [puzzleCompleted, setPuzzleCompleted] = useState(false);

    const shufflePieces = useCallback(() => {
        const shuffled = [...originalPieces].sort(() => Math.random() - 0.5);
        setPieces(shuffled.map(piece => ({ ...piece, position: null })));
        setDroppedPieces({});
        setPuzzleCompleted(false);
    }, [originalPieces]);

    useEffect(() => {
        shufflePieces();
    }, [shufflePieces]);

    const resetPuzzle = () => {
        setPieces(originalPieces);
        setDroppedPieces({});
        setPuzzleCompleted(false);
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
        }
    };

    const playAgain = () => {
        resetPuzzle();
    };

    return (
        <Container className="pb-5">
            <div className="noah-instructions text-center mb-4">
                <h2>Puzzle Instructions</h2>
                <p>Drag and drop the pieces into their correct positions to complete the puzzle.</p>
            </div>

            {puzzleCompleted ? (
                <div className="text-center">
                    <img src="/images/puzzleark.jpg" alt="Completed Puzzle" className="img-fluid w-50" />
                    <h3>Congratulations! You've completed the puzzle!</h3>
                    <Button variant="success" onClick={playAgain} className="m-2">
                        Play Again
                    </Button>
                </div>
            ) : (
                <>
                    <div className="noah-puzzle-grid">
                        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
                            <div
                                key={position}
                                className="noah-drop-zone"
                                onDrop={(e) => handleDrop(e, position)}
                                onDragOver={handleDragOver}
                            >
                                {droppedPieces[position] && (
                                    <img
                                        src={droppedPieces[position].src}
                                        alt={position}
                                        className="noah-piece-image"
                                        onClick={() => handleRemovePiece(position)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="d-flex flex-wrap justify-content-center mt-4">
                        {pieces
                            .filter((piece) => piece.position === null)
                            .map((piece) => (
                                <div
                                    key={piece.id}
                                    className="noah-draggable-piece"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, piece)}
                                >
                                    <img
                                        src={piece.src}
                                        alt={`Piece ${piece.id}`}
                                        className="img-fluid"
                                    />
                                </div>
                            ))}
                    </div>

                    <div className="text-center mt-4">
                        <Button variant="primary" onClick={shufflePieces} className="m-2">
                            Shuffle Puzzle
                        </Button>
                        <Button variant="secondary" onClick={resetPuzzle} className="m-2">
                            Reset Puzzle
                        </Button>
                        <Button variant="success" onClick={handleLockPuzzle} className="m-2">
                            Check Puzzle
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
};

export default PuzzleNoah;