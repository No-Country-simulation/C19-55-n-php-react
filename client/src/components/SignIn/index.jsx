import React, { useEffect, useState } from 'react';
import { helpHttp } from '../../helpers/helpHttp';

const initialForm = {
  nombre: '',
  correo: '',
  contraseña: '',
  direccion: '',
  telefono: '',
  ciudad: '',
  pais: '',
  rol_id: 1,
};

const UserRegister = ({ setLoginUser }) => {
  const [registerForm, setRegisterForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    for (let key in registerForm) {
      if (key !== 'id' && !registerForm[key]) {
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
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Enviando formulario...');
      helpHttp()
        .post('https://no-code-backend-sn9i.onrender.com/api/users/register', {
          body: registerForm,
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((response) => {
          if (!response.error) {
            console.log(response.message);
            console.log(registerForm);
            setRegisterForm(initialForm);
            setLoginUser(true);
          } else {
            console.log(response.status);
            console.log(response);
          }
        });
    }
  };

  return (
    <>
      <form
        className='login__form-form flex-column-start'
        onSubmit={handleSubmit}
      >
        <h5>Iniciar Sesión</h5>
        <div className='form__field flex-column-start'>
          <label>Nombre</label>
          <input
            name='nombre'
            value={registerForm.nombre}
            type='text'
            onChange={handleChange}
          />
          {formErrors.nombre && (
            <p className='form-error'>{formErrors.nombre}</p>
          )}
        </div>
        <div className='form__field flex-column-start'>
          <label>Correo Electrónico</label>
          <input
            name='correo'
            value={registerForm.correo}
            type='email'
            onChange={handleChange}
          />
          {formErrors.correo && (
            <p className='form-error'>{formErrors.correo}</p>
          )}
        </div>
        <div className='form__field flex-column-start'>
          <label>Contraseña</label>
          <input
            name='contraseña'
            value={registerForm.contraseña}
            type='password'
            onChange={handleChange}
          />
          {formErrors.contraseña && (
            <p className='form-error'>{formErrors.contraseña}</p>
          )}
        </div>
        <div className='form__field flex-column-start'>
          <label>Dirección</label>
          <input
            name='direccion'
            value={registerForm.direccion}
            type='text'
            onChange={handleChange}
          />
          {formErrors.direccion && (
            <p className='form-error'>{formErrors.direccion}</p>
          )}
        </div>
        <div className='form__field flex-column-start'>
          <label>Teléfono</label>
          <input
            name='telefono'
            value={registerForm.telefono}
            type='text'
            onChange={handleChange}
          />
          {formErrors.telefono && (
            <p className='form-error'>{formErrors.telefono}</p>
          )}
        </div>
        <div className='form__field flex-column-start'>
          <label>Ciudad</label>
          <input
            name='ciudad'
            value={registerForm.ciudad}
            type='text'
            onChange={handleChange}
          />
          {formErrors.ciudad && (
            <p className='form-error'>{formErrors.ciudad}</p>
          )}
        </div>
        <div className='form__field flex-column-start'>
          <label>País</label>
          <input
            name='pais'
            value={registerForm.pais}
            type='text'
            onChange={handleChange}
          />
          {formErrors.pais && <p className='form-error'>{formErrors.pais}</p>}
        </div>
        <div className='form__btn-container flex-center'>
          <input type='submit' value='Registrarse' className='secondary-btn' />
        </div>
        <p>
          ¿Ya tienes una cuenta?{' '}
          <span onClick={() => setLoginUser(true)}> Iniciar Sesión</span>
        </p>
      </form>
    </>
  );
};

export default UserRegister;
