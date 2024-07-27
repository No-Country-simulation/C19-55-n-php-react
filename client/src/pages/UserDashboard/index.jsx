import React from 'react';
import './UserDashboard.css';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const { logout } = useAuth();

  return (
    <>
      <header className='header flex-center'>
        <div className='container flex-between'>
          <h1>Dashboard</h1>
          <a className='secondary-btn' onClick={logout}>
            Cerrar Sesión
          </a>
        </div>
      </header>
      <section className='dashboard flex-center'>
        <div className='container flex-column'>
          <div className='text-container flex-column'>
            <h2>Bienvenido</h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
