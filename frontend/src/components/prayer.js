import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/prayer.css";
import "../App.css";

const Prayer = () => {
  const [prayers, setPrayers] = useState([]);
  const [name, setName] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [messageReceived, setMessageReceived] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if ("speechSynthesis" in window) {
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
  
    // Create a soft and sweet childlike voice for speech synthesis
utterance.pitch = 8.5; // Lower pitch slightly for a softer tone
utterance.rate = 0.9;  // Slightly slower rate for clarity and gentleness

// Get the available voices from the Speech Synthesis API
const voices = window.speechSynthesis.getVoices();

// Select a childlike, unisex voice with an English (US) accent
const childlikeVoice = voices.find((voice) => 
    voice.lang.includes("en-US") && 
    voice.name.toLowerCase().includes("child")
);

// Assign the selected voice to the utterance if available
if (childlikeVoice) {
    utterance.voice = childlikeVoice;
}

  
    // Add event listeners for better control and callback execution
    utterance.onend = () => {
      if (callback) callback();
    };
  
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      if (callback) callback(event.error);
    };
  
    window.speechSynthesis.speak(utterance);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && prayerRequest) {
      setIsSubmitting(true);
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
            setIsSubmitting(false);
            setName("");
            setPrayerRequest("");
          }, 3000);
        }, 3000);
      });
    }
  };

  
  return (
    <div className="prayer-body">
      <Container className="py-4">
        <Row className="justify-content-center mb-4">
          <Col xs={12}>
            <div className="prayer-float-container">
              {prayers.length > 0 ? (
                prayers.map((prayer) => {
                  const { left } = prayer;
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
                <h3 className="text-center prayer-message" style={{
                  color: "lightblue", 
                  fontWeight: "bold", 
                  textShadow: "2px 2px 4px black", 
                  fontSize: "1.5rem", // Adjust font size
                  padding: "20px", // Add padding for better spacing
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.6)" // Semi-transparent background
                }}>
                  Share a prayer that’s close to your heart!
                </h3>
              ) : null}
            </div>
          </Col>
        </Row>
        {messageReceived && (
          <Row className="justify-content-center">
            <Col xs={10} md={8} className="text-center">
              <div
                className="prayer-message-box p-3"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "2px solid #ffc107",
                  borderRadius: "15px",
                }}
              >
                <h4>Your special prayer has been sent, and it was beautiful!</h4>
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <Form onSubmit={handleSubmit} className="prayer-form">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                  className="prayer-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={prayerRequest}
                  onChange={(e) => setPrayerRequest(e.target.value)}
                  placeholder="Enter your prayer request"
                  required
                  disabled={isSubmitting}
                  className="prayer-textarea"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 prayer-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Prayer"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Prayer;
