import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/footer.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="fixed-bottom background-bottom text-dark text-lg-start">
      <Container>
        <Row className="d-flex justify-content-between align-items-center py-1">
          <Col className="text-light text-bold explore-text">
            Explore, Imagine, Grow in Faith!
          </Col>
          <Col className="text-right">
            <Button
              variant="outline-dark"
              className="button"
              style={{
                background:
                  "linear-gradient(100deg,rgb(191, 44, 11), rgba(200, 200, 13, 0.9))",
              }}
              onClick={() => navigate("/contactUs")}
            >
              Contact Us
            </Button>
          </Col>
        </Row>
      </Container>
      <div className="bg-dark text-light py-2 text-center">
        <p className="paragraph mb-0">
          © {new Date().getFullYear()} Biblical Characters Adventure. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
