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
    <div className="sing-container">
      <Button
        className="w-25 mx-auto d-block play-button-container mb-3"
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

      {/* Karaoke Container with Background */}
      <Container
        fluid
        className="karaoke-container d-flex flex-column align-items-center justify-content-start"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Lyrics Container at the Top */}
        <Row className="w-100">
          <Col xs={12} className="text-center">
            <div className="lyrics-container">
              <p className="highlighted">
                {songData.lyrics[currentLine]?.text || 'Get ready to sing!'}
              </p>
            </div>
          </Col>
        </Row>

        {/* Background Image Filler to Keep Proper Spacing */}
        <audio ref={audioRef} src={songData.audio} />
      </Container>
    </div>
  );
};

export default Sing;