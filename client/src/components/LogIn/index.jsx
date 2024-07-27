import React, { useState } from 'react';
import UserRegister from '../SignIn';
import { FaTimesCircle } from 'react-icons/fa';
import { helpHttp } from '../../helpers/helpHttp';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  correo: '',
  contraseña: '',
};

const LogIn = ({ isModalOpen, closeModal }) => {
  const [loginUser, setLoginUser] = useState(true);
  const [loginForm, setLoginForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    for (let key in loginForm) {
      if (!loginForm[key]) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } es obligatorio`;
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Accediendo...');
      helpHttp()
        .post('https://no-code-backend-sn9i.onrender.com/api/users/login', {
          body: loginForm,
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((response) => {
          if (!response.error) {
            console.log('Bienvenido...');
            login();
            navigate('/dashboard');
          }
        });
    }
  };

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
              <form
                className='login__form-form login flex-column-start'
                onSubmit={handleSubmit}
              >
                <h5>Iniciar Sesión</h5>
                <div className='form__field flex-column-start'>
                  <label>Correo Electrónico</label>
                  <input
                    type='email'
                    name='correo'
                    value={loginForm.correo}
                    onChange={handleChange}
                  />
                  {formErrors.correo && (
                    <p className='form-error'>{formErrors.correo}</p>
                  )}
                </div>
                <div className='form__field flex-column-start'>
                  <label>Contraseña</label>
                  <input
                    type='password'
                    name='contraseña'
                    value={loginForm.contraseña}
                    onChange={handleChange}
                  />
                  {formErrors.contraseña && (
                    <p className='form-error'>{formErrors.contraseña}</p>
                  )}
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
