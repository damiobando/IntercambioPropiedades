import React from 'react';
import '../App.css';
import './Cards.css';
import CardItem from './CardItem';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='.\videos\CostaRica.mp4' autoPlay loop muted />
      <h1>En Costa Rica existen estas propiedades para intercambiar</h1>
      
    </div>
  );
}

export default HeroSection;