import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from "../styles/prayer.module.css"; // Updated for CSS Modules

const Prayer = () => {
  const [prayers, setPrayers] = useState([]);
  const [name, setName] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [messageReceived, setMessageReceived] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      console.log("SpeechSynthesis is supported in this browser.");
    } else {
      console.log("SpeechSynthesis is not supported in this browser.");
    }
  }, []);

  const prayerColors = ["#ffec99", "#f0f8ff", "#ffadad", "#9bf6ff", "#fdffb6", "#caffbf", "#bdb2ff", "#ffc6ff"];

  const getRandomColor = () => prayerColors[Math.floor(Math.random() * prayerColors.length)];

  const handleSpeak = (prayerText, callback) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(prayerText);
    utterance.pitch = 8.5;
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const childlikeVoice = voices.find(voice => voice.lang.includes("en-US") && voice.name.toLowerCase().includes("child"));

    if (childlikeVoice) {
      utterance.voice = childlikeVoice;
    }

    utterance.onend = () => callback && callback();
    utterance.onerror = (event) => console.error("Speech synthesis error:", event.error);

    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && prayerRequest) {
      setIsSubmitting(true);
      setShowForm(false); // hide the form
      const newPrayer = { id: Date.now(), name, prayerRequest, color: getRandomColor() };

      setPrayers(prev => [...prev, newPrayer].slice(-7));

      const prayerText = `Dear Jesus, ${prayerRequest}. Love ${name}. Amen.`;
      handleSpeak(prayerText, () => {
        setTimeout(() => {
          setMessageReceived(true);
          setTimeout(() => {
            setMessageReceived(false);
            setIsSubmitting(false);
            setName("");
            setPrayerRequest("");
            setShowForm(true); // show form again after message and animation
          }, 6000);
        }, 6000);
      });
    }
  };

  useEffect(() => {
    if (!messageReceived) {
      setTimeout(() => setPrayers([]), 3000);
    }
  }, [messageReceived]);

  return (
    <div className={styles.prayerBody}>
      <Container>
        <Row>
          <Col xs={12}>
            <div className={styles.prayerFloatContainer}>
              {prayers.length > 0 ? (
                prayers.map((prayer, index) => (
                  <div
                    key={prayer.id}
                    className={styles.floatingPrayer}
                    style={{
                      backgroundColor: prayer.color,
                      animationDelay: `${index * 1.5}s`, // Stagger the animations slightly
                    }}
                  >
                    <p><strong>Dear Jesus,</strong> {prayer.prayerRequest}</p>
                    <p><strong>Love:</strong> {prayer.name}</p>
                    <p><strong>Amen</strong></p>
                  </div>
                ))
              ) : !messageReceived ? (
                <h3 className={styles.prayerMessage}>
                  Share a prayer that’s close to your heart!
                  <p className={styles.prayerSubText}>
                    Talk to God and share your prayer request! Enter your name and prayer, then press 'Submit Prayer'.
                    Your prayer will be spoken aloud, and you’ll see it appear on the screen. <br />
                    <i>“Call to me and I will answer you.” – Jeremiah 33:3</i>
                  </p>
                </h3>
              ) : null}
            </div>
          </Col>
        </Row>

        {messageReceived && (
        <Row 
        className={`special-prayer-message justify-content-center align-items-start ${styles.fadeIn}`} 
        style={{ minHeight: '85vh', padding: '2rem 0' }}
      >
          <Col xs={11} md={8} lg={6} className="text-center">
            <div className={styles.prayerMessageBox} style={{ padding: '2rem', fontSize: '1.3rem'}}>
              <p>🕊️ “Heaven heard you <br></br> your prayer is in God’s hands.”</p>
            </div>
          </Col>
        </Row>
        )}

        {showForm && (
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6} className="mb-5">
              <Form onSubmit={handleSubmit} className={`${styles.prayerForm} text-center fadeIn`}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    disabled={isSubmitting}
                    className={styles.prayerInput}
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
                    className={styles.prayerTextarea}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className={styles.prayerSubmitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Prayer"}
                </Button>
              </Form>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Prayer;
