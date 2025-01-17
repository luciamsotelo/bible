import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StoryComponent = () => {
  const [story, setStory] = useState(null); // Story data from JSON
  const [currentStep, setCurrentStep] = useState(null); // Current step in the story
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const audioRef = React.useRef(null); // For managing audio playback
  const [isPaused, setIsPaused] = useState(false); // Track if paused

  // Fetch the story data when the component mounts
  useEffect(() => {
    fetch("/storyData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch story data");
        }
        return response.json();
      })
      .then((data) => {
        setStory(data);
        setCurrentStep(data.steps[data.start]); // Set the initial step
      })
      .catch((error) => {
        console.error("Error loading story data:", error);
      });
  }, []);

  const handleChoice = (nextStep) => {
    setCurrentStep(story.steps[nextStep]);
    setImageIndex(0);
    setIsPlaying(false);
    setIsPaused(false);
    if (audioRef.current) {
      audioRef.current.pause(); // Stop the current audio
      audioRef.current.currentTime = 0; // Reset audio playback position
    }
  };

  useEffect(() => {
    let timeout;
    if (isPlaying && currentStep?.images?.length > 0) {
      const currentImage = currentStep.images[imageIndex]; // Get the current image object
      timeout = setTimeout(() => {
        setImageIndex((prevIndex) =>
          prevIndex < currentStep.images.length - 1 ? prevIndex + 1 : 0
        );
      }, currentImage.duration); // Use the duration for the current image
    }
    return () => clearTimeout(timeout); // Clear the timeout when dependencies change
  }, [isPlaying, currentStep, imageIndex]);

  const playAudio = () => {
    if (!audioRef.current) {
      // Create a new Audio instance if it doesn't exist
      audioRef.current = new Audio(currentStep.audio);
      audioRef.current.currentTime = 0; // Start audio from the beginning
    }

    if (isPaused) {
      // Resume playback from paused state
      audioRef.current.play();
      setIsPaused(false);
    } else {
      // Restart audio and images
      audioRef.current.pause();
      audioRef.current = new Audio(currentStep.audio);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setImageIndex(0); // Restart images
    }

    setIsPlaying(true);

    // Stop iterating images when the audio ends
    audioRef.current.onended = () => {
      setIsPlaying(false); // Stop image iteration
    };
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause audio playback
      setIsPaused(true);
    }
    setIsPlaying(false); // Stop image iteration
  };

  // Show a loading message while the story is being fetched
  if (!currentStep) {
    return <div className="text-center mt-4">Loading story...</div>;
  }

  return (
    <div className="container text-center mt-4">
      <h2 style={{fontFamily: "quicksand", color: "black", textShadow: "2px 2px 8px goldenrod", fontSize: "2rem"}}>{currentStep.title}</h2>
      <p style={{fontSize: "1.2rem", fontFamily: "quicksand", color: "black"}}>{currentStep.description}</p>
      <div className="mb-4">
        {currentStep.images.length > 0 && (
          <img
            src={currentStep.images[imageIndex]?.src}
            alt="Story Scene"
            className="img-fluid rounded-5 border border-light border-5 w-50"

          />
        )}
      </div>
      {currentStep.audio && (
        <div className="mb-3">
          <button className="btn btn-primary me-2" onClick={playAudio}>
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
