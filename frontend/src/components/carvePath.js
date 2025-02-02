import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/carvePath.module.css"; // Import the CSS Module

const StoryComponent = () => {
  const [story, setStory] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const audioRef = React.useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [blink, setBlink] = useState(true); // State for blinking effect

  useEffect(() => {
    fetch("/storyData.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch story data");
        return response.json();
      })
      .then((data) => {
        setStory(data);
        setCurrentStep(data.steps[data.start]);
      })
      .catch((error) => console.error("Error loading story data:", error));
  }, []);

  // Function to start and stop blinking effect
  const triggerBlinkEffect = () => {
    setBlink(true);
    setTimeout(() => {
      setBlink(false);
    }, 5000); // Stops blinking after 5 seconds
  };

  useEffect(() => {
    triggerBlinkEffect(); // Start blinking on initial load
  }, []);

  const handleChoice = (nextStep) => {
    setCurrentStep(story.steps[nextStep]);
    setImageIndex(0);
    setIsPlaying(false);
    setIsPaused(false);
    triggerBlinkEffect(); // Restart blinking when a new step is chosen

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    let timeout;
    if (isPlaying && currentStep?.images?.length > 0) {
      const currentImage = currentStep.images[imageIndex];
      timeout = setTimeout(() => {
        setImageIndex((prevIndex) =>
          prevIndex < currentStep.images.length - 1 ? prevIndex + 1 : 0
        );
      }, currentImage.duration);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, imageIndex]);

  const playAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentStep.audio);
      audioRef.current.currentTime = 0;
    }
    if (isPaused) {
      audioRef.current.play();
      setIsPaused(false);
    } else {
      audioRef.current.pause();
      audioRef.current = new Audio(currentStep.audio);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setImageIndex(0);
    }
    setIsPlaying(true);
    audioRef.current.onended = () => setIsPlaying(false);
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
    }
    setIsPlaying(false);
  };

  if (!currentStep) {
    return <div className="text-center mt-4">Loading story...</div>;
  }

  return (
    <div className={`container text-center mt-4 ${styles.storyContainer}`}>
      <h2 className={styles.storyTitle}>{currentStep.title}</h2>
      <p className={styles.storyDescription}>{currentStep.description}</p>
      <div className="mb-4">
        {currentStep.images.length > 0 && (
          <img
            src={currentStep.images[imageIndex]?.src}
            alt="Story Scene"
            className={`img-fluid border border-light border-5 ${styles.storyImage}`}
          />
        )}
      </div>
      {currentStep.audio && (
        <div className="mb-3">
          <button
            className={`btn btn-primary me-2 ${blink ? styles.blinkingButton : ""}`}
            onClick={playAudio}
          >
            {isPaused ? "Resume Story" : "Play Story"}
          </button>
          <button className="btn btn-secondary" onClick={pauseAudio}>
            Pause
          </button>
        </div>
      )}
      <div>
        {currentStep.choices.map((choice, index) => (
          <button
            key={index}
            className="btn btn-outline-light bg-success text-white m-2"
            onClick={() => handleChoice(choice.nextStep)}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoryComponent;
