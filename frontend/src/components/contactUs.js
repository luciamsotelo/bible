import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "../styles/ContactUs.module.css"; // Use CSS Modules

const ContactUs = () => {
  const [isHoveredLucia, setIsHoveredLucia] = useState(false);
  const [isHoveredCarlos, setIsHoveredCarlos] = useState(false);

  return (
    <Container className={`py-5 ${styles.contactContainer}`}>
      <h2 className={`text-center mb-4 ${styles.contactTitle}`}>
        A Little Bit About Us
      </h2>

      <Row className="align-items-stretch">
        {/* Lucia's Card */}
        <Col xs={12} md={6} className="mb-4">
          <Card className={styles.contactCard}>
            <div
              className={styles.contactImg}
              onMouseEnter={() => setIsHoveredLucia(true)}
              onMouseLeave={() => setIsHoveredLucia(false)}
            >
              {isHoveredLucia ? (
                <video
                  src="/videos/luciaVideo.mp4"
                  autoPlay
                  muted
                  loop
                  className={styles.contactVideo}
                />
              ) : (
                <img
                  src="/images/lucia.jpg"
                  alt="Lucia Sotelo"
                  className={styles.contactImg}
                />
              )}
            </div>
            <Card.Body className={styles.cardBody}>
              <Card.Title className={`text-center ${styles.contactName}`}>
                Lucia Sotelo
              </Card.Title>
              <Card.Text className={styles.cardText}>
                As a passionate disciple of Christ, my faith is the foundation
                of everything I do. Inspired by God’s grace and my church, I use
                my skills to share His love and truth through creativity and
                purpose.
              </Card.Text>
              <p className={styles.email}>
                <strong>Email:</strong> luciamsotelo@yahoo.com
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Carlos Hernandez's Card */}
        <Col xs={12} md={6} className="mb-4">
          <Card className={styles.contactCard}>
            <div
              className={styles.contactImg}
              onMouseEnter={() => setIsHoveredCarlos(true)}
              onMouseLeave={() => setIsHoveredCarlos(false)}
            >
              {isHoveredCarlos ? (
                <video
                  src="/videos/carlosVideo.mp4"
                  autoPlay
                  muted
                  loop
                  className={styles.contactVideo}
                />
              ) : (
                <img
                  src="/images/carlos.jpg"
                  alt="Carlos Hernandez"
                  className={styles.contactImg}
                />
              )}
            </div>
            <Card.Body className={styles.cardBody}>
              <Card.Title className={`text-center ${styles.contactName}`}>
                Carlos Hernandez
              </Card.Title>
              <Card.Text className={styles.cardText}>
                Introduced to Christianity through my wife, I’ve experienced the
                power of God’s love and grace. My faith shapes my passion as a
                full-stack developer.
              </Card.Text>
              <p className={styles.email}>
                <strong>Email:</strong> chernandezmiranda@outlook.com
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bible Verse */}
      <Row className="mt-5">
        <Col className="text-center">
          <blockquote className={`blockquote ${styles.bibleVerseContainer}`}>
            <p className={styles.bibleVerse}>
              "Jesus took the children in his arms, placed his hands on them and
              blessed them."
            </p>
            <footer className="blockquote-footer mt-3 text-black">
              Mark 10:16
            </footer>
          </blockquote>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
