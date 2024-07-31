import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './Header.css';
import { FaUserCircle, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; 
const Header = ({ openModal }) => {
  const [clickMenu, setClickMenu] = useState(false);
  const { isAuth } = useAuth(); 
  const navigate = useNavigate(); 

  const handleClick = () => {
    setClickMenu(!clickMenu);
  };

  const handleUserIconClick = () => {
    if (isAuth) {
      navigate('/dashboard');
    } else {
      openModal(); 
    }
  };

  return (
    <header>
      <article className='container flex-between'>
        <img className='site__logo' src='./img/logo.png' alt='paws & hearts' />
        <div className='menu__button' onClick={handleClick}>
          <img src='./img/menu-icon.svg' alt='icono de menu' />
        </div>
        <nav className={`navbar ${clickMenu ? 'open' : ''}`}>
          <ScrollLink
            className='navbar__link'
            to='hero'
            smooth={true}
            offset={-70}
            duration={200}
            onClick={handleClick}
          >
            Inicio
          </ScrollLink>
          <ScrollLink
            className='navbar__link'
            to='about'
            smooth={true}
            offset={-70}
            duration={200}
            onClick={handleClick}
          >
            Sobre Nosotros
          </ScrollLink>
          <ScrollLink
            className='navbar__link'
            to='pets'
            smooth={true}
            offset={-70}
            duration={200}
            onClick={handleClick}
          >
            Adoptar
          </ScrollLink>
          <ScrollLink
            to='adoptions'
            className='navbar__link'
            onClick={() => setClickMenu(false)}
          >
            Dar en Adopción
          </ScrollLink>
          <ScrollLink
            to='testimonials'
            className='navbar__link'
            onClick={() => setClickMenu(false)}
          >
            Testimonios
          </ScrollLink>
          <div className='close__button' onClick={() => setClickMenu(false)}>
            <FaTimes />
          </div>
        </nav>
        <div className='flex-center user__icon-container' onClick={handleUserIconClick}>
          <FaUserCircle className='user__icon' />
        </div>
      </article>
    </header>
  );
};

export default Header;

