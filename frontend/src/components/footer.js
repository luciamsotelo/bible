import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Footer.module.css"; // Updated for CSS Modules

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="d-flex justify-content-between align-items-center py-1">
          <Col className={styles.exploreText}>
            Explore, Imagine, Grow in Faith!
          </Col>
          <Col className="text-right">
            <Button
              className={styles.contactButton}
              onClick={() => navigate("/contactUs")}
            >
              Contact Us
            </Button>
          </Col>
        </Row>
      </Container>
      <div className={styles.footerBottom}>
        <p>
          © {new Date().getFullYear()} A Bible Adventure. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
