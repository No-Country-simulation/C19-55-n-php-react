import React from 'react';
import { Element } from 'react-scroll';
import './Pets.css';

const Pets = ({ pets, images }) => {
  return (
    <section className='pets'>
      <Element name='pets' className='container flex-column'>
        <div className='text-container flex-column'>
          <h6 className='section-subtitle'>Mascotas en Adopción</h6>
          <h2>
            Te guiamos en cada paso del proceso de adopción para encontrar el
            compañero perfecto.
          </h2>
        </div>
        <div className='pets__card-container flex-center'>
          {pets.map((pet) => {
            return (
              <figure className='flex-column pet__card' key={pet.id}>
                <img
                  src='./img/pet-img01.png'
                  alt=''
                  className='pet__card-img'
                />
                <figcaption className='flex-column pet__card-details'>
                  <div className='flex-between pet__card-text'>
                    <h6>{pet.nombre}</h6>
                    <span>{pet.raza}</span>
                  </div>
                  <a className='secondary-btn'>Adóptame</a>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Element>
    </section>
  );
};

export default Pets;
