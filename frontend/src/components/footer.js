import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/footer.css'

const Footer = () => {
  const navigate = useNavigate();
    return (
    <footer className="fixed-bottom background-bottom text-dark text-center text-lg-start mt-auto">
      <Container className="">
        <Row className="align-items-center">
          <Col xs={12} sm={12} md={6} lg={6} className="">
          <p className="" style={{ color: "white", marginBottom: 0 }}>Explore, imagine, and grow in faith! </p>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="d-flex justify-content-center align-items-center"
          >
            <Button
              variant="outline-dark"
              className="m-1"
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
      <div className="bg-dark text-light py-1">
        <p className="mb-0">
          © {new Date().getFullYear()} Biblical Characters Adventure. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
