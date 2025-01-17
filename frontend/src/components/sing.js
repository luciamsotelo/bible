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
    <div>
      <Button
        className="w-100 mx-auto d-block play-button-container mb-3"
        variant="success"
        onClick={handlePlayPause}
        size="lg"
        style={{
          zIndex: 1,
          position: 'relative',
          bottom: '20px',
        }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </Button>

      <Container
        className="karaoke-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'contain', // This will make the image smaller but ensure it's fully visible
          backgroundPosition: 'center',
          padding: '1rem',
        }}
      >
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className="text-center">
            <div className="lyrics-container" style={{ fontFamily: 'comic sans ms', color: '' }}>
              <p className="highlighted text-white">
                {songData.lyrics[currentLine]?.text}
              </p>
            </div>
          </Col>
        </Row>
        <audio ref={audioRef} src={songData.audio} />
      </Container>
    </div>
  );
};

export default Sing;
