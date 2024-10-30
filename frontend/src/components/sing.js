import React, { useState, useEffect, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
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

  // Get the background image URL for the current line
  const backgroundImage = songData.lyrics[currentLine]?.image;

  return (
    <Container className="karaoke-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="text-center">{songData.title}</h1>
      <div className="play-button-container">
        <Button variant="primary" onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </div>
      <div className="lyrics-container">
        <p className="highlighted">{songData.lyrics[currentLine]?.text}</p>
      </div>
      <audio ref={audioRef} src={songData.audio} />
    </Container>
  );
};

export default Sing;
