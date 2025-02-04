import React, { useState, useEffect, useRef } from "react";
import { Container, Button } from "react-bootstrap";
import "../styles/sing.css";

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

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [songData]);

  // Set background image
  const backgroundImage = songData.lyrics[currentLine]?.image;

  return (
    <div className="karaoke-wrapper">
      {/* Play/Pause Button */}
      <Button className="play-button" variant="success" onClick={handlePlayPause} size="lg">
        {isPlaying ? "Pause 🎵" : "Play ▶️"}
      </Button>

      {/* Karaoke Container with Background Image */}
      <Container
        className="karaoke-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat", // Ensures the image only appears once
        }}
      >
        {/* Lyrics Display */}
        <div className="lyrics-container">
          <p className="highlighted">
            {songData.lyrics[currentLine]?.text || "Get ready to sing! 🎤"}
          </p>
        </div>

        {/* Audio Element */}
        <audio ref={audioRef} src={songData.audio} />
      </Container>
    </div>
  );
};

export default Sing;
