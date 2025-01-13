import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../styles/Adventure_map.css';


const AdventureMap = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const points = [
    { id: 1, x: '60%', y: '95%', name: 'Bethlehem', description: 'Jesus was born in Bethlehem, fulfilling Old Testament prophecy. Angels announced His birth to shepherds nearby, marking the arrival of the promised Savior. His humble birth in a stable underscored His role as a servant King who came to save humanity.', image: "/images/bethlehem.jpg"},
    { id: 2, x: '50%', y: '55%', name: 'Nazareth', description: 'Jesus grew up in Nazareth, where He learned carpentry under Josephs guidance. After His baptism, He returned and proclaimed Himself as the fulfillment of Isaiahs prophecy in the synagogue, marking the beginning of His ministry. However, His claim led to rejection by many in His hometown.', image: '/images/nazareth.jpg' },
    { id: 3, x: '90%', y: '60%', name: 'Capernaum', description: 'Jesus based much of His ministry in Capernaum, performing numerous miracles, like healing the sick and casting out demons. He taught in the synagogue, calling people to repentance and faith. His miracles drew large crowds, and Capernaum became known as a place of divine healing and teaching.', image: '/images/capernaum.jpg' },
    { id: 4, x: '40%', y: '50%', name: 'Sea of Galilee', description: 'Jesus called His first disciples on the shores of the Sea of Galilee, including Peter, Andrew, James, and John. He taught crowds from boats, calmed storms, and walked on water. The Sea of Galilee became a place of profound faith and miracles, witnessing His power over nature.', image: '/images/seaGalilee.jpg' },
    { id: 5, x: '90%', y: '90%', name: 'Jerusalem', description: 'Jesus traveled to Jerusalem for key Jewish festivals, taught in the temple, and cleansed it of merchants exploiting worshipers. His final days were spent here, where He was crucified and later rose from the dead, fulfilling His mission of redemption and offering salvation to all humanity.', image: '/images/jerusalem.jpg' },
    { id: 6, x: '50%', y: '40%', name: 'Mount of Olives', description: 'Jesus often visited the Mount of Olives for prayer and reflection. Here, He delivered the Olivet Discourse, prophesying future events and the end times. The Mount of Olives was also the site of His ascension into heaven, where He left His disciples with a promise of His eventual return.', image: '/images/mountolives.jpg' },
  ];

  return (
    <div className="map-container">
      <img src="/images/israel.png" alt="Adventure Map" className="map-image" />

      {points.map((point) => (
    <div
      key={point.id}
      className="map-point"
      style={{ top: point.y, left: point.x }}
      onClick={() => setSelectedPoint(point)}
    >
      <span className="tooltip">{point.name}</span>
    </div>
  ))}


{selectedPoint && (
  <Card className="info-card">
    <Card.Img variant="top" src={selectedPoint.image} />
    <Card.Body>
      <Card.Title>{selectedPoint.name}</Card.Title>
      <Card.Subtitle>{selectedPoint.title}</Card.Subtitle>
      <Card.Text className='text-sm-start'>{selectedPoint.description}</Card.Text>
      <Button variant="secondary" onClick={() => setSelectedPoint(null)}>
        Close
      </Button>
    </Card.Body>
  </Card>
)}


      <div className="button-container">
        {points.map((point) => (
          <Button key={point.id} onClick={() => setSelectedPoint(point)}>
            Visit {point.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AdventureMap;
