import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/comingSoon.css'; // Don't forget to add the custom CSS!

const ComingSoon = () => {
  return (
    <Container fluid className="coming-soon-container">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="coming-soon-title">🎉 Coming Soon! 🎉</h1>
          <p className="coming-soon-message">
            We're preparing something magical just for you! Stay tuned for an adventure through the Bible in a fun and colorful way!
          </p>
          <div className="coming-soon-video">
            <video
              src="/videos/underConstruction.mp4"
              controls
              autoPlay
              muted
              loop
              className="video-player"
            ></video>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ComingSoon;
