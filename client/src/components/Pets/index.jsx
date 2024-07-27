import React, { useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Pets.css';

const Pets = ({ pets }) => {
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = {};
      for (const pet of pets) {
        const response = await fetch(
          `https://no-code-backend-sn9i.onrender.com/api/pets/${pet.id}/images`
        );
        const data = await response.json();
        if (data.length > 0) {
          const base64Image = `data:${data[0].mime_type};base64,${data[0].contenido}`;
          newImages[pet.id] = base64Image;
        }
      }
      setImages(newImages);
    };

    fetchImages();
  }, [pets]);

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
                {loading || !images[pet.id] ? (
                  <Skeleton height={200} width={300} />
                ) : (
                  <img
                    src={images[pet.id]}
                    alt={pet.nombre}
                    className='pet__card-img'
                  />
                )}
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
