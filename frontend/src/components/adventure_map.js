import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../styles/Adventure_map.module.css';

const AdventureMap = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const points = [
    { id: 1, x: '60%', y: '95%', name: 'Bethlehem', description: 'Jesus was born in Bethlehem, fulfilling Old Testament prophecy. Angels announced His birth to shepherds nearby, marking the arrival of the promised Savior. His humble birth in a stable underscored His role as a servant King who came to save humanity.', image: "/images/bethlehem.jpg" },
    { id: 2, x: '50%', y: '60%', name: 'Nazareth', description: 'Jesus grew up in Nazareth, where He learned carpentry under Josephs guidance. After His baptism, He returned and proclaimed Himself as the fulfillment of Isaiahs prophecy in the synagogue, marking the beginning of His ministry. However, His claim led to rejection by many in His hometown.', image: '/images/nazareth.jpg' },
    { id: 3, x: '90%', y: '60%', name: 'Capernaum', description: 'Jesus based much of His ministry in Capernaum, performing numerous miracles, like healing the sick and casting out demons. He taught in the synagogue, calling people to repentance and faith. His miracles drew large crowds, and Capernaum became known as a place of divine healing and teaching.', image: '/images/capernaum.jpg' },
    { id: 4, x: '40%', y: '50%', name: 'Sea of Galilee', description: 'Jesus called His first disciples on the shores of the Sea of Galilee, including Peter, Andrew, James, and John. He taught crowds from boats, calmed storms, and walked on water. The Sea of Galilee became a place of profound faith and miracles, witnessing His power over nature.', image: '/images/seaGalilee.jpg' },
    { id: 5, x: '90%', y: '90%', name: 'Jerusalem', description: 'Jesus traveled to Jerusalem for key Jewish festivals, taught in the temple, and cleansed it of merchants exploiting worshipers. His final days were spent here, where He was crucified and later rose from the dead, fulfilling His mission of redemption and offering salvation to all humanity.', image: '/images/jerusalem.jpg' },
    { id: 6, x: '50%', y: '40%', name: 'Mount of Olives', description: 'Jesus often visited the Mount of Olives for prayer and reflection. Here, He delivered the Olivet Discourse, prophesying future events and the end times. The Mount of Olives was also the site of His ascension into heaven, where He left His disciples with a promise of His eventual return.', image: '/images/mountolives.jpg' },
  ];

  const handleClick = (point) => {
    if (selectedPoint?.id === point.id) {
      setSelectedPoint(null);
    } else {
      setSelectedPoint(point);
    }
  };

  return (
    <div>
      <h1 className={styles.mapTitle}>
        The Adventure Map
      </h1>
      <p className={styles.mapDescription}>
        Welcome to the Adventure Map! Explore the places where Jesus lived, taught, and performed miracles. Click on the locations to learn about key events in His life, from His birth in Bethlehem to His resurrection in Jerusalem. Let’s begin the journey!<br/><i>“For we walk by faith, not by sight.” – 2 Corinthians 5:7</i>
      </p>
      <div className={styles.mapContainer}>
        <img src="/images/israel.png" alt="Adventure Map" className={styles.mapImage} />
  
        {points.map((point) => (
          <div key={point.id} className={styles.mapPoint} style={{ top: point.y, left: point.x }}>
            <button className={styles.mapButton} onClick={() => handleClick(point)}>
              {point.name}
            </button>
          </div>
        ))}
  
        {selectedPoint && (
          <>
            <div className={styles.overlay} onClick={() => setSelectedPoint(null)}></div>
            <Card className={styles.infoCardCentered}>
              <Card.Img variant="top" src={selectedPoint.image} />
              <Card.Body>
                <Card.Title className={styles.cardTitle}>{selectedPoint.name}</Card.Title>
                <Card.Text className={styles.textStart}>{selectedPoint.description}</Card.Text>
                <Button variant="secondary" onClick={() => setSelectedPoint(null)}>Close</Button>
              </Card.Body>
            </Card>
          </>
        )}
      </div>
    </div>
  );
  
};

export default AdventureMap;
