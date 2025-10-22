import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import RoomsSection from '../components/Rooms.tsx';
import Menu from '../components/Menu';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import Reservation from '../components/Reservation';
import BanquetSection from '../components/BanquetSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <RoomsSection />
      <Menu />
      <Gallery />
      <BanquetSection />
      <Reviews />
      <Reservation />
    </div>
  );
};

export default HomePage;
