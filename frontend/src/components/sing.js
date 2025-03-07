import React, { useState, useEffect, useRef } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/Sing.module.css"; // Updated for CSS Modules

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
    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      const currentLyricsIndex = songData.lyrics.findIndex(
        (line) => currentTime >= line.startTime && currentTime < line.endTime
      );
      if (currentLyricsIndex !== -1) {
        setCurrentLine(currentLyricsIndex);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [songData.lyrics]); // Depend on `songData.lyrics` only

  // Get the background image URL for the current line
  const backgroundImage = songData.lyrics[currentLine]?.image;

  return (
    <div className={styles.singContainer}>
    {/* Play Button */}
    <Button
      className={`w-25 mx-auto d-block ${styles.playButton}`}
      variant="warning mb-3"
      onClick={handlePlayPause}
      size="lg"
    >
      {isPlaying ? "Pause" : "Play"}
    </Button>
  
      {/* Karaoke Container with Background */}
      <Container
        fluid
        className={`${styles.karaokeContainer} d-flex flex-column align-items-center justify-content-start mb-5`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Lyrics Container */}
        <Row className="w-100">
          <Col xs={12} className="text-center">
            <div className={styles.lyricsContainer}>
              <p className={styles.highlighted}>
                {songData.lyrics[currentLine]?.text || "Get ready to sing!"}
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
