import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import '../styles/contactUs.css';

const ContactUs = () => {
  return (
    <Container className="contact-us-container py-5">
      <h2 className="text-center mb-4" style={{color: "blue", fontFamily: "Allura", fontSize: "2.8rem", fontWeight: "bold", textShadow: "2px 2px 8px green"}}>A Little Bit About Us</h2>
      <Row className="align-items-stretch">
        {/* Lucia's Card */}
        <Col xs={12} md={6} lg={6} className="mb-4">
          <Card className="contact-card">
            <Card.Img 
              variant="top" 
              src="/images/lucia.jpg" 
              alt="Lucia Sotelo" 
              className="contact-img"
            />
            <Card.Body style={{ background: "linear-gradient(to right, rgb(175, 92, 203), rgb(218, 14, 119), rgb(30, 153, 210))" }}>
              <Card.Title className="text-center" style={{color: "goldenrod", fontFamily: "Allura", fontSize: "3rem"}}>
                Lucia Sotelo
              </Card.Title>
              <Card.Text className="card-text" style={{color: "white", fontFamily: "Bubblegum Sans", fontSize: "1.1rem"}}>
                As a passionate disciple of Christ, my faith is the foundation of everything I do. Inspired by God’s grace and my church, I use my skills to share His love and truth through creativity and purpose. I’m a full-stack developer driven by a love for collaboration and storytelling. For me, building websites is more than a career—it’s a way to connect, inspire, and make an eternal impact through God’s love.
              </Card.Text>
              <div>
                <p style={{color: "white", fontFamily: "Quicksand", fontSize: ".9rem"}}><strong>Email:</strong> luciamsotelo@yahoo.com</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Carlos Hernandez's Card */}
        <Col xs={12} md={6} lg={6} className="mb-4">
          <Card className="contact-card">
            <Card.Img 
              variant="top" 
              src="/images/carlos.jpg" 
              alt="Carlos Hernandez" 
              className="contact-img"
            />
            <Card.Body style={{background: "linear-gradient(to top, rgb(143, 14, 218), rgb(3, 4, 4))"}}>
              <Card.Title className="text-center" style={{color: "purple", fontFamily: "Rye", fontSize: "1.8rem"}}>
                Carlos Hernandez
              </Card.Title>
              <Card.Text className="card-text" style={{color: "goldenrod", fontFamily: "Bubblegum Sans", fontSize: "1.2rem"}}>
                Introduced to Christianity through my wife, I’ve experienced the power of God’s love and grace. My faith shapes my passion as a full-stack developer, where I aim to create meaningful, educational experiences for children, engaging content for adults to share with their kids. Development for me is more than a career—it’s a way to connect and leave a lasting impact.
              </Card.Text>
              <div>
                <p style={{color: "white", fontFamily: "Quicksand", fontSize: ".9rem"}}><strong>Email:</strong> chernandezmiranda@outlook.com</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bible Verse */}
      <Row className="mt-5">
        <Col className="text-center">
          <blockquote className="blockquote bible-verse">
            <p className="mb-0" style={{color: "goldenrod", fontFamily: "Quicksand", fontSize: "2rem", textShadow: "2px 2px 1px purple"}}>
              "Jesus took the children in his arms, placed his hands on them and blessed them."
            </p>
            <footer className="blockquote-footer mt-3 text-black">Mark 10:16</footer>
          </blockquote>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
