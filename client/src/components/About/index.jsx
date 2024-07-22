import React from 'react';
import { Element } from 'react-scroll';
import './About.css';

const About = () => {
  return (
    <section className='about'>
      <Element name='about' className='container flex-center'>
        <div className='text-container'>
          <h6 className='section-subtitle'>Sobre Nosotros</h6>
          <h2>Promovemos prácticas de adopción responsables.</h2>
          <p>
            No solo rescatamos animales; transformamos vidas. Nuestro enfoque
            integral garantiza que cada adopción sea exitosa, proporcionando
            apoyo y orientación a los adoptantes para asegurar que tanto las
            mascotas como las familias tengan una experiencia positiva y
            enriquecedora. <br /> <br /> Aspiramos a un mundo donde cada mascota
            tenga un hogar amoroso y donde la adopción sea la primera opción
            para quienes buscan un compañero de vida.
          </p>
        </div>
        <div className='img-container'>
          <img src='/img/about-img.png' alt='' className='about-img' />
        </div>
      </Element>
    </section>
  );
};

export default About;
