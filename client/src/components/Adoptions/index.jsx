import React from 'react';
import { Element } from 'react-scroll';
import './Adoptions.css';

const Adoptions = () => {
  return (
    <section className='flex-center adoptions'>
      <Element name='adoptions' className='container flex-column'>
        <div className='text-container flex-column'>
          <div className='text-content flex-column'>
            <h6 className='section-subtitle'>Dar en Adopción</h6>
            <h2>Dale a tu mascota una segunda oportunidad.</h2>
          </div>
          <a className='secondary-btn'>Reubicación Responsable</a>
        </div>
        <div className='img-container'>
          <img src='./img/adoptions-img.png' alt='' />
        </div>
      </Element>
    </section>
  );
};

export default Adoptions;
