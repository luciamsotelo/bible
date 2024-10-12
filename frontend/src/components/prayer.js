import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../styles/prayer.css'; // Custom styles for floating prayers

const Prayer = () => {
  const [prayers, setPrayers] = useState([]);
  const [name, setName] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');
  const [messageReceived, setMessageReceived] = useState(false);

  // Function to read the prayer out loud with childlike voice
  const handleSpeak = (prayerText) => {
    const utterance = new SpeechSynthesisUtterance(prayerText);
    utterance.pitch = 2.0;
    utterance.rate = 0.7;

    const voices = window.speechSynthesis.getVoices();
    const childlikeVoice = voices.find((voice) => voice.name.includes('Google UK English Female')) || voices[2];
    if (childlikeVoice) {
      utterance.voice = childlikeVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Function to handle prayer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && prayerRequest) {
      const newPrayer = { id: Date.now(), name, prayerRequest, stay: false };

      const updatedPrayers = [...prayers, newPrayer].slice(-7);
      setPrayers(updatedPrayers);

      const prayerText = `Dear Jesus, ${prayerRequest}. From ${name}. Amen.`;
      handleSpeak(prayerText);

      setName('');
      setPrayerRequest('');
    }
  };

  // Trigger the animation and remove after fade-out
  useEffect(() => {
    const timeoutIds = prayers.map((prayer) => {
      return setTimeout(() => {
        setPrayers((prevPrayers) =>
          prevPrayers.filter((p) => p.id !== prayer.id)
        );
        setMessageReceived(true); // Show the received message
        setTimeout(() => setMessageReceived(false), 3000); // Hide after 3 seconds
      }, 5000); // 5 seconds duration for fade-out
    });

    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, [prayers]);

  const getRandomPosition = () => {
    const left = Math.random() * 80;
    return { left: `${left}%` };
  };

  return (
    <Container className="prayer-container d-flex flex-column justify-content-between">
      <div className="prayer-float-container mb-4">
        {prayers.length > 0 ? (
          prayers.map((prayer) => {
            const { left } = getRandomPosition();
            return (
              <div
                key={prayer.id}
                className={`floating-prayer ${prayer.stay ? 'stay' : ''}`}
                style={{ left }}
              >
                <p><strong>Dear Jesus,</strong> {prayer.prayerRequest}</p>
                <p><strong>From:</strong> {prayer.name}</p>
                <p><strong>Amen</strong></p>
              </div>
            );
          })
        ) : !messageReceived ? ( // Only show "No prayers" message when there are no prayers and the message has not been received
          <p>No prayers yet. Be the first to submit one!</p>
        ) : null }
      </div>

      {messageReceived && (
        <div className="d-flex justify-content-center align-items-center bg-warning w-75 text-center mb-5">
        <h4 className="">Your message has been received by God all mighty!</h4>
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
  );
};

export default Prayer;
