import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import '../styles/Adventure_map.css';

const AdventureMap = () => {
  const [zoomedLocation, setZoomedLocation] = useState(null);

  const locations = [
    {
      name: 'Bethlehem',
      x: 20,
      y: 30,
      image: '/images/bethlehem.jpg',
      title: 'Bethlehem',
      description: 'Birthplace of Jesus, a historic city in the West Bank.'
    },
    {
      name: 'Nazareth',
      x: 75,
      y: 80,
      image: '/images/nazareth.jpg',
      title: 'Nazareth',
      description: 'The hometown of Jesus, located in northern Israel.'
    },
    {
      name: 'Jerusalem',
      x: 70,
      y: 40,
      image: '/images/jerusalem.jpg',
      title: 'Jerusalem',
      description: 'A city of great religious significance to many faiths.'
    },
    {
      name: 'Capernaum',
      x: 30,
      y: 0,
      image: '/images/capernaum.jpg',
      title: 'Capernaum',
      description: 'An ancient fishing village on the shores of the Sea of Galilee.'
    },
    {
      name: 'Sea of Galilee',
      x: 30,
      y: 70,
      image: '/images/sea_of_galilee.jpg',
      title: 'Sea of Galilee',
      description: 'A freshwater lake in northern Israel, known for its biblical events.'
    },
    {
      name: 'Mount of Olives',
      x: 100,
      y: 50,
      image: '/images/mount_of_olives.jpg',
      title: 'Mount of Olives',
      description: 'A mountain ridge east of Jerusalem, rich in religious history.'
    }
  ];

  const handleZoom = (location) => {
    console.log('zooming to:', location);
    setZoomedLocation(location);
  };

  const getTransformStyle = () => {
    if (!zoomedLocation) return {};

    // Adjust the offset to center the zoomed location
    const offsetX = 50 - zoomedLocation.x;
    const offsetY = 50 - zoomedLocation.y;

    return {
      transform: `scale(1.5) translate(${offsetX}%, ${offsetY}%)`
    };
  };

  return (
    <Container className="adventure-map">
      <Row>
        <Col md={8} className="map-container">
          <div
            className={`map-image ${zoomedLocation ? 'zoomed' : ''}`}
            style={{ backgroundImage: 'url(/images/middleE.jpg)', ...getTransformStyle() }}
          >
            {locations.map((loc, index) => (
  <div key={index} className="map-card" style={{ left: `${loc.x}%`, top: `${loc.y}%` }}>
    <Card className={`map-info ${zoomedLocation?.name === loc.name ? 'visible' : ''}`} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={loc.image} alt={loc.title} />
      <Card.Body>
        <Card.Title>{loc.title}</Card.Title>
        <Card.Text>{loc.description}</Card.Text>
        <Button variant="primary" onClick={() => alert(`Navigate to ${loc.title}`)}>
          Learn More
        </Button>
      </Card.Body>
    </Card>
  </div>
))}

          </div>
        </Col>
        <Col md={4} className="controls">
          {locations.map((loc, index) => (
            <Button key={index} onClick={() => handleZoom(loc)}>
              Visit {loc.name}
            </Button>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default AdventureMap;
