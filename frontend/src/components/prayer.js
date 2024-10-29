import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "../styles/prayer.css"; // Custom styles for floating prayers
import "../App.css"; // Custom styles for floating prayers

const Prayer = () => {
  const [prayers, setPrayers] = useState([]);
  const [name, setName] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [messageReceived, setMessageReceived] = useState(false);

  // Check if speechSynthesis is supported
  useEffect(() => {
    if ('speechSynthesis' in window) {
      console.log("SpeechSynthesis is supported in this browser.");
    } else {
      console.log("SpeechSynthesis is not supported in this browser.");
    }
  }, []); // Runs once on component mount

  // List of colors for prayers
  const prayerColors = ["#ffec99", "#f0f8ff", "#ffadad", "#9bf6ff", "#fdffb6", "#caffbf", "#bdb2ff", "#ffc6ff"];

  // Function to generate random color
  const getRandomColor = () => {
    return prayerColors[Math.floor(Math.random() * prayerColors.length)];
  };

  // Function to read the prayer out loud with childlike voice
  const handleSpeak = (prayerText, callback) => {
    // Cancel any ongoing speech synthesis before starting a new one
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(prayerText);
    utterance.pitch = 3.0;
    utterance.rate = 0.9;
    
    const voices = window.speechSynthesis.getVoices();
    const childlikeVoice = 
      voices.find((voice) => voice.name.includes("Google UK English Female")) ||
      voices[4];
    if (childlikeVoice) {
      utterance.voice = childlikeVoice;
    }

    // Callback to notify when the prayer has finished being read
    utterance.onend = () => {
      if (callback) callback();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Function to handle prayer submission
const handleSubmit = (e) => {
  e.preventDefault();
  if (name && prayerRequest) {
    const newPrayer = {
      id: Date.now(),
      name,
      prayerRequest,
      color: getRandomColor(), // Assign a random color when the prayer is created
    };

    const updatedPrayers = [...prayers, newPrayer].slice(-7); // Keep up to 7 prayers
    setPrayers(updatedPrayers);

    const prayerText = `Dear Jesus, ${prayerRequest}. Love ${name}. Amen.`;

    // Speak the prayer and show the "message received" only after it has been read
    handleSpeak(prayerText, () => {
      // Set a timeout to match the duration of the prayer disappearance animation (10s here)
      setTimeout(() => {
        setMessageReceived(true); // Show the message after the prayer has disappeared
        setTimeout(() => setMessageReceived(false), 4000); // Hide message after 3 seconds
      }, 4000); // Adjust delay to match prayer animation duration (7s floatUp + 3s fadeOut)
    });

    setName("");
    setPrayerRequest("");
  }
};

  const getRandomPosition = () => {
    const left = Math.random() * 80;
    return { left: `${left}%` };
  };

  return (
    <div className="prayer-body">
      <Container className="prayer-container d-flex flex-column justify-content-between">
        <div className="prayer-float-container mb-4">
          {prayers.length > 0 ? (
            prayers.map((prayer) => {
              const { left } = getRandomPosition();
              return (
                <div
                  key={prayer.id}
                  className="floating-prayer" // Remove 'stay' class here
                  style={{
                    left,
                    backgroundColor: prayer.color, // Apply the random color here
                  }}
                >
                  <p>
                    <strong>Dear Jesus,</strong> {prayer.prayerRequest}
                  </p>
                  <p>
                    <strong>Love:</strong> {prayer.name}
                  </p>
                  <p>
                    <strong>Amen</strong>
                  </p>
                </div>
              );
            })
          ) : !messageReceived ? (
            <h3 className="text-center" style={{ color: "lightblue", fontWeight: "bold", textShadow: "2px 2px 4px black" }}>Share a prayer that’s close to your heart!</h3>
          ) : null}
        </div>

        {messageReceived && (
          <div
            className="d-flex justify-content-center align-items-center position-fixed top-35 w-90 p-3"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "2px solid #ffc107",
              boxShadow: "0 0 15px #ffc107", // Glow effect
              borderRadius: "15px",
              zIndex: "999",
            }}
          >
            <h4 className="text-center text-warning">
              Your special prayer has been sent, and it was beautiful!
            </h4>
          </div>
        )}

        <Form onSubmit={handleSubmit} className="prayer-form col-6 offset-3">
          <Form.Group>
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Your Prayer Request</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={prayerRequest}
              onChange={(e) => setPrayerRequest(e.target.value)}
              placeholder="Enter your prayer request"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Submit Prayer
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Prayer;
