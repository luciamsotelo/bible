import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className="fixed-bottom bg-gradient text-light text-center text-lg-start mt-auto" style={{ background: 'linear-gradient(135deg, #FF5733, #33FF57)' }}>
            <Container className="p-2">
                <Row className="align-items-center">
                    <Col xs={12} sm={12} md={6} lg={6} className="mb- mb-md-0">
                        
                        <p className="text-light">
                            We provide engaging activities and stories that bring biblical characters to life. Join us on this adventure!
                        </p>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
                        <Button variant="outline-light" className="m-1">Contact Us</Button>
                    </Col>
                </Row>
            </Container>
            <div className="bg-dark text-light py-1">
                <p className="mb-0">
                    © {new Date().getFullYear()} Biblical Characters Adventure. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

