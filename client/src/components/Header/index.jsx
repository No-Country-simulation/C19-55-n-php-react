import React, { useState } from 'react';
import { Link } from 'react-scroll';
import './Header.css';
import { FaUserCircle, FaTimes } from 'react-icons/fa';

const Header = ({ openModal }) => {
  const [clickMenu, setClickMenu] = useState(false);

  const handleClick = () => {
    setClickMenu(!clickMenu);
  };

  return (
    <header>
      <article className='container flex-between'>
        <img className='site__logo' src='./img/logo.png' alt='paws & hearts' />
        <div className='menu__button' onClick={handleClick}>
          <img src='./img/menu-icon.svg' alt='icono de menu' />
        </div>
        <nav className={`navbar ${clickMenu ? 'open' : ''}`}>
          <Link
            className='navbar__link'
            to='hero'
            smooth={true}
            offset={-70}
            duration={200}
            onClick={handleClick}
          >
            Inicio
          </Link>
          <Link
            className='navbar__link'
            to='about'
            smooth={true}
            offset={-70}
            duration={200}
            onClick={handleClick}
          >
            Sobre Nosotros
          </Link>
          <Link
            className='navbar__link'
            to='pets'
            smooth={true}
            offset={-70}
            duration={200}
            onClick={handleClick}
          >
            Adoptar
          </Link>
          <Link
            to='adoptions'
            className='navbar__link'
            onClick={() => setClickMenu(false)}
          >
            Dar en Adopción
          </Link>
          <Link
            to='testimonials'
            className='navbar__link'
            onClick={() => setClickMenu(false)}
          >
            Testimonios
          </Link>
          <div className='close__button' onClick={() => setClickMenu(false)}>
            <FaTimes />
          </div>
        </nav>
        <div className='flex-center user__icon-container' onClick={openModal}>
          <FaUserCircle className='user__icon' />
        </div>
      </article>
    </header>
  );
};

export default Header;
