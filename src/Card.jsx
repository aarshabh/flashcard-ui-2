// src/Card.js
import React, { useState } from 'react';
import './Card.css';

function Card({ question, answer }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-inner">
        <div className="card-front">
          <h2>{question}</h2>
        </div>
        <div className="card-back">
          <h2>{answer}</h2>
        </div>
      </div>
    </div>
  );
}

export default Card;