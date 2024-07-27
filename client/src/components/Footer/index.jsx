import React from 'react';
import './Footer.css';

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer className='site__footer flex-center'>
      <div className='container flex-column'>
        <img
          src='./img/logo.png'
          alt='logo paws&hearts'
          className='site__footer-logo'
        />
        <form className='site__footer-form' onSubmit={handleSubmit}>
          <label>Sucribete a nuestro voletín.</label>
          <div className='flex-center site__footer-form--form-space'>
            <input type='email' placeholder='E-mail' />
            <input type='submit' value='Suscribete' className='secondary-btn' />
          </div>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
