import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample craft images (Replace these with your actual images)
import craft1 from '../images/david.jpg'; // Update these imports with actual images.
import craft2 from '../images/david.jpg';
import craft3 from '../images/bible.jpg';

const PrintableCrafts = () => {
    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Printable Crafts</h1>
            <p className="text-center mb-5">Click on the links below to download fun, biblical-themed crafts. These activities are perfect for kids to create and learn more about Bible stories while having fun!</p>
            <Row className="justify-content-center">
                {/* Noah's Ark Craft */}
                <Col md={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Img variant="top" src={craft1} alt="Noah's Ark Craft" />
                        <Card.Body>
                            <Card.Title>Noah's Ark Animal Craft</Card.Title>
                            <Card.Text>
                                This fun craft helps kids learn the story of Noah and the animals he saved. Print it out, color the animals, and create your own ark!
                            </Card.Text>
                            <Button variant="primary" href="/downloads/noahs-ark.pdf" target="_blank">
                                Noah's Ark
                            </Button>
                            <Button variant="primary" href="/downloads/noahs-ark-instructions.pdf" target="_blank" className="ms-2">
                                Ark Animals
                            </Button>
                            <Button variant="primary" href="/downloads/noahs-ark-instructions.pdf" target="_blank" className="ms-2">
                                Instructions
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                
                {/* David and Goliath Craft */}
                <Col md={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Img variant="top" src={craft2} alt="David and Goliath Craft" />
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
                <Col md={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Img variant="top" src={craft3} alt="Jesus Fish Craft" />
                        <Card.Body>
                            <Card.Title>Jesus Feeds 5000 Fish Craft</Card.Title>
                            <Card.Text>
                                Create fish and loaves to tell the story of Jesus feeding the 5000. This craft includes fish cutouts and a basket template for easy assembly.
                            </Card.Text>
                            <Button variant="primary" href="/downloads/jesus-fish-craft.pdf" target="_blank">
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
