import React, { useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import '../styles/story.css'; // Optional: CSS for additional styling

// Story data for the cards
const stories = [
  {
    title: "Adam and Eve",
    frontImage: "/images/adam_eve_front.jpg",
    expandedImage: "/images/adam_eve_full.jpg",
    story: "In the Garden of Eden, Adam and Eve were the first humans created by God...",
    lesson: "Obedience to God is key, and sin brings separation from Him."
  },
  {
    title: "Noah's Ark",
    frontImage: "/images/noah_ark_front.jpg",
    expandedImage: "/images/noah_ark_full.jpg",
    story: "God told Noah to build an ark to save his family and the animals from a flood...",
    lesson: "Trusting in God's plan brings protection and salvation."
  },
  {
    title: "David and Goliath",
    frontImage: "/images/david_goliath_front.jpg",
    expandedImage: "/images/david_goliath_full.jpg",
    story: "David, a young shepherd, defeated the giant Goliath with faith in God...",
    lesson: "With God, even the smallest can overcome great challenges."
  },
  {
    title: "Daniel and the Lion's Den",
    frontImage: "/images/daniel_lion_front.jpg",
    expandedImage: "/images/daniel_lion_full.jpg",
    story: "Daniel was thrown into the lion's den for praying to God, but he was saved...",
    lesson: "God protects those who are faithful and trust in Him."
  },
  {
    title: "Jonah and the Big Fish",
    frontImage: "/images/jonah_fish_front.jpg",
    expandedImage: "/images/jonah_fish_full.jpg",
    story: "Jonah ran from God's command and was swallowed by a big fish, but he repented...",
    lesson: "God’s mercy is great, and it’s never too late to turn back to Him."
  },
  {
    title: "Jesus Feeds 5000",
    frontImage: "/images/jesus_feeds_front.jpg",
    expandedImage: "/images/jesus_feeds_full.jpg",
    story: "Jesus miraculously fed 5,000 people with five loaves of bread and two fish...",
    lesson: "God provides abundantly, even with little."
  }
];

const BibleStories = () => {
  // State to track which card is expanded
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpand = (index) => {
    setExpandedCard(index);
  };

  const handleCollapse = () => {
    setExpandedCard(null);
  };

  return (
    <div className="container my-5">
      <Row>
        {stories.map((story, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            {expandedCard === index ? (
              <Card className="expanded-card">
                <Card.Img variant="top" src={story.expandedImage} />
                <Card.Body>
                  <Card.Title>{story.title}</Card.Title>
                  <Card.Text>{story.story}</Card.Text>
                  <Card.Text><strong>Lesson:</strong> {story.lesson}</Card.Text>
                  <Button variant="primary" onClick={handleCollapse}>Close</Button>
                </Card.Body>
              </Card>
            ) : (
              <Card onClick={() => handleExpand(index)} className="story-card">
                <Card.Img variant="top" src={story.frontImage} />
                <Card.Body>
                  <Card.Title>{story.title}</Card.Title>
                </Card.Body>
              </Card>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BibleStories;
