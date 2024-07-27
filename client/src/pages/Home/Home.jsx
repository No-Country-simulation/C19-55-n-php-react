import React, { useEffect, useState } from 'react';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Pets from '../../components/Pets';
import Adoptions from '../../components/Adoptions';
import Testimonials from '../../components/Testimonials';
import LogIn from '../../components/LogIn';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Home = ({ pets, isModalOpen, openModal, closeModal }) => {
  return (
    <main>
      <Header openModal={openModal} />
      <Hero />
      <About />
      <Pets pets={pets} />
      <Adoptions />
      <Testimonials />
      <Footer />
      <LogIn isModalOpen={isModalOpen} closeModal={closeModal} />
    </main>
  );
};

export default Home;
