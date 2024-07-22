import React, { useState } from 'react';
import { Link } from 'react-scroll';
import './Header.css';

const Header = () => {
  const [clickMenu, setClickMenu] = useState(false);

  const handleClick = () => {
    setClickMenu(!clickMenu);
  };

  return (
    <header>
      <article className='container flex-between'>
        <img className='site__logo' src='./img/logo.png' alt='paws & hearts' />
        <img
          className='menu__btn'
          src='./img/menu.png'
          alt='icono de menu'
          onClick={handleClick}
        />
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
          <Link className='navbar__link'>Dar en Adopción</Link>
          <Link className='navbar__link'>Testimonios</Link>
          <img
            className='user__icon'
            src='./img/user-icon.png'
            alt='icono de usuario'
          />
          <img
            className='close__btn'
            src='./img/close-btn.png'
            alt='icono de cerrar'
            onClick={() => setClickMenu(false)}
          />
        </nav>
      </article>
    </header>
  );
};

export default Header;
