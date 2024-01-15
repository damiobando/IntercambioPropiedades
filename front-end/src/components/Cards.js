import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <div>
        <div>
        <ul className='cards__items'>
          
            <CardItem
              src='images/puntarenas.png'
              text='Puntarenas'
              label='121 propiedades'
              path='/sign-up'
            />
            <CardItem
              src='images/Guanacaste.jpg'
              text='Guanacaste'
              label='238 propiedades'
              path='/sign-up'
            />
            <CardItem
              src='images/SanJose.jpg'
              text='San Jose'
              label='60 propiedades'
              path='/services'
            />
           
          </ul>
          <ul className='cards__items'>
          <CardItem
              src='images/Heredia.jpg'
              text='Heredia'
              label='83 propiedades'
              path='/sign-up'
            />
            <CardItem
              src='images/Limon.jpg'
              text='Limón'
              label='43 propiedades'
              path='/sign-up'
            />
            <CardItem
              src='images/Alajuela.jpg'
              text='Alajuela'
              label='34 propiedades'
              path='/products'
            />  
            <CardItem
              src='images/Cartago.jpeg'
              text='Cartago'
              label='56 propiedades'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
      
      
{/* 
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='Adventure'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Adventure'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Ride through the Sahara Desert on a guided camel tour'
              label='Adrenaline'
              path='/sign-up'
            />
          </ul>
        </div>
      </div> */}
    </div>
  );
}

export default Cards;