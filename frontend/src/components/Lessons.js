import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Lessons = () => {
  const navigate = useNavigate();

  const lessons = [
    {
      title: "Eli's Adventure",
      description: "Join Eli on his exciting journey to discover God's path.",
      image: "/images/Elimain.webp",
      link: "/carve-path"
    },
    {
      title: "Anna's Quest",
      description: "Follow Anna on a heartfelt journey as she learns valuable lessons about trusting God. Through challenges and triumphs, she discovers faith, courage, and the power of God's plan in her life.",
      image: "/images/annamain.jpg",
      link: "/anna"
    }
  ];

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1>Bible Story Lessons</h1>
        <p>Choose a story to explore and learn valuable lessons from the Bible!</p>
      </div>
      <Row className="justify-content-center">
        {lessons.map((lesson, index) => (
          <Col md={6} lg={4} className="mb-4" key={index}>
            <Card className="h-100 shadow">
              <Card.Img variant="top" src={lesson.image} alt={lesson.title} />
              <Card.Body>
                <Card.Title>{lesson.title}</Card.Title>
                <Card.Text>{lesson.description}</Card.Text>
                <Button variant="primary" onClick={() => navigate(lesson.link)}>
                  Start Lesson
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Lessons;
