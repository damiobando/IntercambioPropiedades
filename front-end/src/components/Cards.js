import React from 'react';
import {useEffect} from 'react';
import { useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { getProperties } from '../api/property';

function Cards() {
  const [propertiesCountAlajuela, setPropertiesCountAlajuela] = useState(0);
  const [propertiesCountHeredia, setPropertiesCountHeredia] = useState(0);
  const [propertiesCountSanJose, setPropertiesCountSanJose] = useState(0);
  const [propertiesCountCartago, setPropertiesCountCartago] = useState(0);
  const [propertiesCountGuanacaste, setPropertiesCountGuanacaste] = useState(0);
  const [propertiesCountPuntarenas, setPropertiesCountPuntarenas] = useState(0);
  const [propertiesCountLimon, setPropertiesCountLimon] = useState(0);


  useEffect(() => {
    // Lógica para obtener las propiedades y contarlas por provincia
    const fetchData = async () => {
      try {
        const properties = await getProperties();
        const propertiesData = properties.data;
        console.log('properties:', propertiesData);
        const countAlajuela = propertiesData.filter(property => property.province === 'Alajuela').length;
        const countHeredia = propertiesData.filter(property => property.province === 'Heredia').length;
        const countSanJose = propertiesData.filter(property => property.province === 'San José').length;
        const countCartago = propertiesData.filter(property => property.province === 'Cartago').length;
        const countGuanacaste = propertiesData.filter(property => property.province === 'Guanacaste').length;
        const countPuntarenas = propertiesData.filter(property => property.province === 'Puntarenas').length;
        const countLimon = propertiesData.filter(property => property.province === 'Limón').length;

        // Actualizar los estados con las cantidades por provincia
        setPropertiesCountAlajuela(countAlajuela);
        setPropertiesCountHeredia(countHeredia);
        setPropertiesCountSanJose(countSanJose);
        setPropertiesCountCartago(countCartago);
        setPropertiesCountGuanacaste(countGuanacaste);
        setPropertiesCountPuntarenas(countPuntarenas);
        setPropertiesCountLimon(countLimon);

      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchData();
  }, [])

  return (
    <div className='cards'>
      <div>
        <div>
        <ul className='cards__items'>
          
            <CardItem
              src='images/puntarenas.png'
              text='Puntarenas'
              label={propertiesCountPuntarenas}
              path='/sign-up'
            />
            <CardItem
              src='images/Guanacaste.jpg'
              text='Guanacaste'
              label={propertiesCountGuanacaste}
              path='/sign-up'
            />
            <CardItem
              src='images/SanJose.jpg'
              text="San José"
              label={propertiesCountSanJose}
              path='/sign-up'
            />
           
          </ul>
          <ul className='cards__items'>
          <CardItem
              src='images/Heredia.jpg'
              text='Heredia'
              label={propertiesCountHeredia}
              path='/sign-up'
            />
            <CardItem
              src='images/Limon.jpg'
              text='Limón'
              label={propertiesCountLimon}
              path='/sign-up'
            />
            <CardItem
              src='images/Alajuela.jpg'
              text='Alajuela'
              label={propertiesCountAlajuela}
              path='/sign-up'
            />  
            <CardItem
              src='images/Cartago.jpeg'
              text='Cartago'
              label={propertiesCountCartago}
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