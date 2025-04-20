import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/carvePath.module.css";
import { useNavigate } from "react-router-dom";

const StoryComponent = () => {
  const [story, setStory] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [blink, setBlink] = useState(true);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/AnnaStory.json")
      .then((response) => response.json())
      .then((data) => {
        setStory(data);
        setCurrentStep(data.steps[data.start]);
      })
      .catch((error) => console.error("Error loading story data:", error));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const triggerBlinkEffect = () => {
    setBlink(true);
    setTimeout(() => setBlink(false), 5000);
  };

  useEffect(() => {
    triggerBlinkEffect();
  }, [currentStep]);

  const handleChoice = (nextStep) => {
    setCurrentStep(story.steps[nextStep]);
    setIsPaused(false);
    setIsPlaying(false);
    triggerBlinkEffect();

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    clearTimeout(timeoutRef.current);
    setImageIndex(0);
  };

  useEffect(() => {
    if (isPlaying && currentStep?.images?.length > 1) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setImageIndex((prev) => (prev + 1) % currentStep.images.length);
      }, currentStep.images[imageIndex].duration);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentStep, imageIndex, isPlaying]);

  const playAudio = () => {
    if (isPlaying) return;

    if (!audioRef.current || audioRef.current.src !== currentStep.audio) {
      audioRef.current = new Audio(currentStep.audio);
    }

    audioRef.current.play();
    setIsPaused(false);
    setIsPlaying(true);

    audioRef.current.onended = () => {
      setIsPlaying(false);
      clearTimeout(timeoutRef.current);
    };
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
    clearTimeout(timeoutRef.current);
  };

  const restartStory = () => {
    setCurrentStep(story.steps[story.start]);
    setImageIndex(0);
    setIsPaused(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    clearTimeout(timeoutRef.current);
  };

  if (!currentStep)
    return <div className="text-center mt-4">Loading story...</div>;

  return (
    <div className={`container text-center ${styles.storyContainer}`}>
      <div className="d-flex justify-content-start">
        <button
          className="btn btn-warning m-5"
          onClick={() => navigate("/lessons")}
        >
          ⬅ Back to Story Page
        </button>
      </div>
      <h1 className={styles.storyTitle}>{currentStep.title}</h1>
      <p className={styles.storyDescription}>{currentStep.description}</p>

      {currentStep.images?.length > 0 && (
        <>
          <img
            src={currentStep.images[imageIndex]?.src}
            alt="Anna's Adventure"
            className={`img-fluid border border-light border-5 mb-3 ${styles.storyImage}`}
          />
          {currentStep.audio && (
            <div className="mb-4">
              <button
                className={`btn btn-primary m-2 ${
                  blink ? styles.blinkingButton : ""
                }`}
                onClick={playAudio}
              >
                {isPaused ? "Resume Story" : "Play Story"}
              </button>
              <button className="btn btn-secondary m-2" onClick={pauseAudio}>
                Pause
              </button>
            </div>
          )}
        </>
      )}

      <div>
        {currentStep.choices.length > 0 ? (
          currentStep.choices.map((choice, index) => (
            <button
              key={index}
              className="btn btn-outline-light bg-success text-white m-2"
              onClick={() => handleChoice(choice.nextStep)}
            >
              {choice.text}
            </button>
          ))
        ) : (
          <div className="mt-4">
            <h3 className={styles.storyTitle}>🌸 Anna's Reflection 🌸</h3>
            <p className={styles.storyDescription}>
              Thank you for joining Anna on her special quest! Remember, God is
              always with you, guiding your heart and your steps.
            </p>
            <button className="btn btn-success" onClick={restartStory}>
              Restart Story
            </button>
            <button
              className="btn btn-success m-2"
              onClick={() => navigate("/lessons")}
            >
              Lessons Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryComponent;
