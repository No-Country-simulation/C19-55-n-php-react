import React from 'react';
import { Element } from 'react-scroll';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import './Testimonials.css';
import data from '../../testimonials.json';
import { sliderSettings } from '../../testimonialsSliderSettings';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

const Testimonials = () => {
  // console.log(data);
  return (
    <section className='testimonials flex-column'>
      <Element name='testimonials'>
        <div className='container flex-center'>
          <div className='text-container flex-column'>
            <h6 className='section-subtitle'>Testimonios</h6>
            <h2>
              Las experiencias de las personas que forman parte de PAWS &
              HEARTS.
            </h2>
          </div>
        </div>
      </Element>
      <div className='slider__container'>
        <Swiper {...sliderSettings}>
          <SliderButtons />
          {data.map((card, index) => (
            <SwiperSlide key={index}>
              <div className='card'>
                <img src={card.image} alt='imagen de usuario' />
                <h4>{card.nombre}</h4>
                <p>{card.comentario}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className='flex-center slider-buttons'>
      <button onClick={() => swiper.slidePrev()}>
        <FaLongArrowAltLeft className='icon' />
      </button>
      <button onClick={() => swiper.slideNext()}>
        <FaLongArrowAltRight className='icon' />
      </button>
    </div>
  );
};
