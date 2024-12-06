import React, { useState } from 'react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import classNames from 'classnames'; // Import classNames
import '../styles/dressup.css'; // Import the CSS for the page

const DressUp = () => {
  const [clothing, setClothing] = useState({
    hat: '',
    shirt: '',
    pants: '',
    shoes: ''
  });

  // Sample clothing options
  const clothingOptions = {
    hat: ['hat1.png', 'hat2.png', 'hat3.png'],
    shirt: ['shirt1.png', 'shirt2.png', 'shirt3.png'],
    pants: ['pants1.png', 'pants2.png', 'pants3.png'],
    shoes: ['shoes1.png', 'shoes2.png', 'shoes3.png']
  };

  // Function to handle clothing selection
  const handleClothingChange = (type, item) => {
    setClothing((prev) => ({ ...prev, [type]: item }));
  };

  return (
    <Container className="dressup-container">
      <Row>
        <Col xs={12} md={6} className="text-center">
          <h1 className="title">Character Dress-Up Adventure!</h1>
          <p>Choose clothing items to dress up your character.</p>
          <div className="character">
            {/* Updated image path for dressUp.jpg */}
            <Image
  src="/images/dressUp.jpg"
  alt="Character"
  className="character-image"
/>

            {clothing.hat && (
              <Image
                src={`/images/${clothing.hat}`}
                alt="Hat"
                className={classNames('clothing-item', 'hat')}
              />
            )}
            {clothing.shirt && (
              <Image
                src={`/images/${clothing.shirt}`}
                alt="Shirt"
                className={classNames('clothing-item', 'shirt')}
              />
            )}
            {clothing.pants && (
              <Image
                src={`/images/${clothing.pants}`}
                alt="Pants"
                className={classNames('clothing-item', 'pants')}
              />
            )}
            {clothing.shoes && (
              <Image
                src={`/images/${clothing.shoes}`}
                alt="Shoes"
                className={classNames('clothing-item', 'shoes')}
              />
            )}
          </div>
        </Col>

        <Col xs={12} md={6} className="clothing-options">
          <h2>Select Clothing</h2>
          {Object.keys(clothingOptions).map((type) => (
            <div key={type}>
              <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
              <div className="options">
                {clothingOptions[type].map((item, index) => (
                  <Button
                    key={index}
                    variant="primary"
                    onClick={() => handleClothingChange(type, item)}
                    className={classNames('clothing-btn', {
                      'btn-selected': clothing[type] === item
                    })}
                  >
                    {item.replace('.png', '')}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default DressUp;
