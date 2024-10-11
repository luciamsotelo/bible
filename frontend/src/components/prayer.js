import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../styles/prayer.css'; // Custom styles for floating prayers

const Prayer = () => {
  const [prayers, setPrayers] = useState([]);
  const [name, setName] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');

  // Function to read the prayer out loud with childlike voice
  const handleSpeak = (prayerText) => {
    const utterance = new SpeechSynthesisUtterance(prayerText);
    utterance.pitch = 6.5;
    utterance.rate = 0.75;

    const voices = window.speechSynthesis.getVoices();
    const childlikeVoice = voices.find((voice) => voice.name.includes('Google UK English Female')) || voices[0];
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

  // Add a "stay" class after floating up
  useEffect(() => {
    const timeoutIds = prayers.map((prayer, index) => {
      return setTimeout(() => {
        setPrayers((prevPrayers) =>
          prevPrayers.map((p) => (p.id === prayer.id ? { ...p, stay: true } : p))
        );
      }, index * 3000); // Delay by 3 seconds per prayer
    });

    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, [prayers]);

  // Remove prayers after 24 hours
  useEffect(() => {
    const interval = setInterval(() => {
      const filteredPrayers = prayers.filter((prayer) => Date.now() - prayer.id < 86400000);
      setPrayers(filteredPrayers);
    }, 1000);

    return () => clearInterval(interval);
  }, [prayers]);

  const getRandomPosition = () => {
    const top = Math.random() * 80;
    const left = Math.random() * 80;
    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <Container className="prayer-container d-flex flex-column justify-content-between">
      <div className="prayer-float-container mb-4">
        {prayers.length > 0 ? (
          prayers.map((prayer, index) => {
            const { top, left } = getRandomPosition();
            return (
              <div
                key={prayer.id}
                className={`floating-prayer ${prayer.stay ? 'stay' : ''}`}
                style={{ top, left }}
              >
                <p><strong>Dear Jesus,</strong> {prayer.prayerRequest}</p>
                <p><strong>From:</strong> {prayer.name}</p>
                <p><strong>Amen</strong></p>
              </div>
            );
          })
        ) : (
          <p>No prayers yet. Be the first to submit one!</p>
        )}
      </div>

      <Form onSubmit={handleSubmit} className="prayer-form col-6 offset-3" >
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
