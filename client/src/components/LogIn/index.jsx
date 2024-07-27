import React, { useEffect, useState } from 'react';
import UserRegister from '../SignIn';
import { FaTimesCircle } from 'react-icons/fa';
import { helpHttp } from '../../helpers/helpHttp';

const LogIn = ({ isModalOpen, closeModal }) => {
  const [loginUser, setLoginUser] = useState(true);
  const [users, setUsers] = useState([]);

  // Obtener la información de los usuarios
  useEffect(() => {
    helpHttp()
      .get('https://no-code-backend-sn9i.onrender.com/api/users')
      .then((resp) => {
        if (!resp.error) {
          setUsers(resp);
          console.log(users);
        } else {
          console.log(resp.error);
        }
      });
  }, []);

  // Cambiar entre formulario de inicio de sesión y registro de usuario
  const registerForm = () => {
    setLoginUser(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className='login__form-overlay flex-center'>
          <article className='login__form-container flex-column'>
            <FaTimesCircle className='close__btn' onClick={closeModal} />
            <img src='./img/logo.png' alt='' className='login__form-img' />
            {loginUser ? (
              <form className='login__form-form login flex-column-start'>
                <h5>Iniciar Sesión</h5>
                <div className='form__field flex-column-start'>
                  <label>Correo Electrónico</label>
                  <input type='email' />
                </div>
                <div className='form__field flex-column-start'>
                  <label>Contraseña</label>
                  <input type='password' />
                </div>
                <div className='form__btn-container flex-center'>
                  <input
                    type='submit'
                    value='Iniciar Sesión'
                    className='secondary-btn'
                  />
                </div>
                <p>
                  ¿No tienes una cuenta?
                  <span onClick={registerForm}> Inscribirte</span>
                </p>
              </form>
            ) : (
              <UserRegister setLoginUser={setLoginUser} />
            )}
          </article>
        </div>
      )}
    </>
  );
};

export default LogIn;
