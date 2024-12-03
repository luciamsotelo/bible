import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import '../styles/sing.css';

const Sing = ({ songData }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const currentLyricsIndex = songData.lyrics.findIndex(
        (line) => currentTime >= line.startTime && currentTime < line.endTime
      );
      if (currentLyricsIndex !== -1) {
        setCurrentLine(currentLyricsIndex);
      }
    };
    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [songData]);

  // Get the background image URL for the current line
  const backgroundImage = songData.lyrics[currentLine]?.image;

  return (
    <Container
      className="karaoke-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="text-center">
          <h1 className="mb-4 text-white">{songData.title}</h1>
          <div className="play-button-container mb-4">
            <Button
              variant="primary"
              onClick={handlePlayPause}
              size="lg"
              className="w-100"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </div>
          <div className="lyrics-container">
            <p className="highlighted text-white">{songData.lyrics[currentLine]?.text}</p>
          </div>
        </Col>
      </Row>
      <audio ref={audioRef} src={songData.audio} />
    </Container>
  );
};

export default Sing;
