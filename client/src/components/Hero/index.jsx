import React from 'react';
import { Element } from 'react-scroll';
import './Hero.css';

const Hero = () => {
  return (
    <section className='hero'>
      <Element name='hero' className='container flex-center'>
        <div className='text-container'>
          <h1>Tú puedes hacer la diferencia en sus vidas.</h1>
          <p>
            En <span>PAWS & HEARTS</span>, nos dedicamos a brindar segundas
            oportunidades a los animales necesitados, encontrándoles hogares
            amorosos y permanentes.
          </p>
          <a className='flex-center action-btn'>
            Descubrir más <img src='./img/arrow.png' alt='' />
          </a>
        </div>
        <div className='flex-center img-container'>
          <img src='./img/hero01.png' alt='' className='hero-img' />
          <img src='./img/hero04.png' alt='' className='hero-img' />
          <img src='./img/hero03.png' alt='' className='hero-img' />
          <img src='./img/hero02.png' alt='' className='hero-img' />
        </div>
      </Element>
    </section>
  );
};

export default Hero;
