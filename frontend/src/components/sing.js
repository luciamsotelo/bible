import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import '../styles/sing.css'; // Custom styles if needed

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
        line => currentTime >= line.startTime && currentTime < line.endTime
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

  return (
    <Container className="karaoke-container">
  <Row className="text-center mb-4">
    <Col>
      <h1>{songData.title}</h1>
    </Col>
  </Row>
  <Row className="text-center mb-4">
    <Col>
      <Button className="col-2" variant="primary" onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </Col>
  </Row>
  <Row className="justify-content-center">
    <Col md={8}>
      <div className="lyrics-container">
        {songData.lyrics.map((line, index) => (
          <p key={index} className={currentLine === index ? 'highlighted' : ''}>
            {line.text}
          </p>
        ))}
      </div>
    </Col>
  </Row>
  <Row className="text-center mt-4">
    <Col>
      <audio ref={audioRef} src={songData.audio} />
    </Col>
  </Row>
</Container>

  );
};

export default Sing;
