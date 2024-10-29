import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "../styles/prayer.css";
import "../App.css";

const Prayer = () => {
  const [prayers, setPrayers] = useState([]);
  const [name, setName] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [messageReceived, setMessageReceived] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to handle loading

  useEffect(() => {
    if ('speechSynthesis' in window) {
      console.log("SpeechSynthesis is supported in this browser.");
    } else {
      console.log("SpeechSynthesis is not supported in this browser.");
    }
  }, []);

  const prayerColors = ["#ffec99", "#f0f8ff", "#ffadad", "#9bf6ff", "#fdffb6", "#caffbf", "#bdb2ff", "#ffc6ff"];

  const getRandomColor = () => {
    return prayerColors[Math.floor(Math.random() * prayerColors.length)];
  };

  const handleSpeak = (prayerText, callback) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(prayerText);
    utterance.pitch = 3.0;
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const childlikeVoice = 
      voices.find((voice) => voice.name.includes("Google UK English Female")) || voices[4];
    if (childlikeVoice) {
      utterance.voice = childlikeVoice;
    }

    utterance.onend = () => {
      if (callback) callback();
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && prayerRequest) {
      setIsSubmitting(true); // Set loading to true to disable form
      const newPrayer = {
        id: Date.now(),
        name,
        prayerRequest,
        color: getRandomColor(),
      };
  
      const updatedPrayers = [...prayers, newPrayer].slice(-7);
      setPrayers(updatedPrayers);
  
      const prayerText = `Dear Jesus, ${prayerRequest}. Love ${name}. Amen.`;
  
      handleSpeak(prayerText, () => {
        setTimeout(() => {
          setMessageReceived(true);
          setTimeout(() => {
            setMessageReceived(false);
            setIsSubmitting(false); // Reset loading after message is shown
            setName(""); // Clear name input
            setPrayerRequest(""); // Clear prayer request input
            
            // Reload the page after resetting the form
            window.location.reload(); 
          }, 3000);
        }, 3000);
      });
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
                  className="floating-prayer"
                  style={{
                    left,
                    backgroundColor: prayer.color,
                  }}
                >
                  <p><strong>Dear Jesus,</strong> {prayer.prayerRequest}</p>
                  <p><strong>Love:</strong> {prayer.name}</p>
                  <p><strong>Amen</strong></p>
                </div>
              );
            })
          ) : !messageReceived ? (
            <h3 className="text-center" style={{ color: "lightblue", fontWeight: "bold", textShadow: "2px 2px 4px black" }}>
              Share a prayer that’s close to your heart!
            </h3>
          ) : null}
        </div>

        {messageReceived && (
  <div
    className="d-flex justify-content-center align-items-center position-fixed w-100 h-100"
    style={{
      top: "0",
      left: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Add background overlay for focus
      zIndex: "999",
      animation: "fadeIn 1s ease-in-out" // Apply fade-in animation
    }}
  >
    <div
      className="d-flex justify-content-center align-items-center p-4"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        border: "2px solid #ffc107",
        boxShadow: "0 0 15px #ffc107",
        borderRadius: "15px",
        maxWidth: "80%",
        padding: "2rem",
      }}
    >
      <h4 className="text-center text-warning mb-0">
        Your special prayer has been sent, and it was beautiful!
      </h4>
    </div>
  </div>
)}

        <Form onSubmit={handleSubmit} className="prayer-form">
          <Form.Group>
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              disabled={isSubmitting} // Disable during submission
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
              disabled={isSubmitting} // Disable during submission
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Prayer"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Prayer;
