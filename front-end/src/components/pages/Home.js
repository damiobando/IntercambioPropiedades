import React from 'react';
import HeroSection from '../HeroSection';
import Card from '../Cards'
import Cards2 from '../Cards2';
import FilterBox from '../FilterBox';
import '../../App.css';

function Home() {
  return (
    <>
    <HeroSection/>
    <Card/>
    <FilterBox/>
    <Cards2/>

    </>
  );
}

export default Home;