import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample craft images (Replace these with your actual images)
import craft1 from '../images/david.jpg'; // Update these imports with actual images.
import craft2 from '../images/david.jpg';
import craft3 from '../images/bible.jpg';

const PrintableCrafts = () => {
    return (
        <Container
            className="mt-5 p-4"
            style={{
                background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h1 className="text-center mb-4">Printable Crafts</h1>
            <p className="text-center mb-5 text-muted">
                Click on the links below to download fun, biblical-themed crafts. These activities are perfect for kids to create and learn more about Bible stories while having fun!
            </p>
            <Row className="justify-content-center">
                {/* Noah's Ark Craft */}
                <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Img
                            variant="top"
                            src={craft1}
                            alt="Noah's Ark Craft"
                            className="img-fluid"
                        />
                        <Card.Body>
                            <Card.Title>Noah's Ark Animal Craft</Card.Title>
                            <Card.Text>
                                This fun craft helps kids learn the story of Noah and the animals he saved. Print it out, color the animals, and create your own ark!
                            </Card.Text>
                            <div className="d-flex flex-wrap">
                                <Button variant="success" href="/downloads/noahs-ark.pdf" target="_blank" className="me-2 mb-2">
                                    Noah's Ark
                                </Button>
                                <Button variant="info" href="/downloads/noahs-ark-instructions.pdf" target="_blank" className="me-2 mb-2">
                                    Ark Animals
                                </Button>
                                <Button variant="warning" href="/downloads/noahs-ark-instructions.pdf" target="_blank" className="mb-2">
                                    Instructions
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* David and Goliath Craft */}
                <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Img
                            variant="top"
                            src={craft2}
                            alt="David and Goliath Craft"
                            className="img-fluid"
                        />
                        <Card.Body>
                            <Card.Title>David & Goliath Color By Number</Card.Title>
                            <Card.Text>
                                Help David defeat Goliath and get him ready for battle. This craft includes a color by number template and a color by number color palette.
                            </Card.Text>
                            <Button variant="primary" href="/downloads/color-david.pdf" target="_blank">
                                Coloring Page
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Jesus and Fish Craft */}
                <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Img
                            variant="top"
                            src={craft3}
                            alt="Jesus Fish Craft"
                            className="img-fluid"
                        />
                        <Card.Body>
                            <Card.Title>Jesus Feeds 5000 Fish Craft</Card.Title>
                            <Card.Text>
                                Create fish and loaves to tell the story of Jesus feeding the 5000. This craft includes fish cutouts and a basket template for easy assembly.
                            </Card.Text>
                            <Button variant="danger" href="/downloads/jesus-fish-craft.pdf" target="_blank">
                                Download Craft
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PrintableCrafts;
