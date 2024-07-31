import React, { useEffect, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { helpHttp } from '../../helpers/helpHttp';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  motivo_adopcion: '',
};

const AdoptPetForm = ({ isModalOpen, closeModal, selectedPetId }) => {
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('User data in AdoptPetForm:', user); // Log user data
      setForm({
        nombre: user.nombre || '',
        direccion: user.direccion || '',
        correo: user.correo || '',
        telefono: user.telefono || '',
        ciudad: user.ciudad || '',
        pais: user.pais || '',
        motivo_adopcion: form.motivo_adopcion, // Preserve the current value of motivo_adopcion
      });
    }
  }, [user]);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!form.motivo_adopcion) {
      errors.motivo_adopcion = 'El motivo de adopción es obligatorio';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Enviando solicitud de adopción...');
      helpHttp()
        .post('https://no-code-backend-sn9i.onrender.com/api/formularios-adopcion/', {
          body: {
            usuario_id: user.id,
            mascota_id: selectedPetId,
            fecha_solicitud: new Date().toISOString().split('T')[0],
            estado_solicitud: 'pendiente',
            motivo_adopcion: form.motivo_adopcion,
          },
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((response) => {
          if (!response.error) {
            console.log('Solicitud enviada...');
            alert('Solicitud enviada correctamente');
            closeModal();
            alert('Solicitud enviada correctamente');
          } else {
            console.error('Error sending request:', response.error);
          }
        });
    }
  };

  if (!isAuth) {
    return <p>Por favor, inicie sesión para completar la solicitud de adopción.</p>;
  }

  return (
    <>
      {isModalOpen && (
        <div className='login__form-overlay flex-center'>
          <article className='login__form-container flex-column'>
            <FaTimesCircle className='close__btn' onClick={closeModal} />
            <img src='./img/logo.png' alt='' className='login__form-img' />
            <form
              className='login__form-form login flex-column-start'
              onSubmit={handleSubmit}
            >
              <h5>Solicitud de Adopción</h5>
              <div className='form__field flex-column-start'>
                <label>Nombre</label>
                <input
                  type='text'
                  name='nombre'
                  value={form.nombre || ''}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className='form__field flex-column-start'>
                <label>Dirección</label>
                <input
                  type='text'
                  name='direccion'
                  value={form.direccion || ''}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className='form__field flex-column-start'>
                <label>Correo Electrónico</label>
                <input
                  type='email'
                  name='correo'
                  value={form.correo || ''}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className='form__field flex-column-start'>
                <label>Teléfono</label>
                <input
                  type='text'
                  name='telefono'
                  value={form.telefono || ''}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className='form__field flex-column-start'>
                <label>Ciudad</label>
                <input
                  type='text'
                  name='ciudad'
                  value={form.ciudad || ''}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className='form__field flex-column-start'>
                <label>País</label>
                <input
                  type='text'
                  name='pais'
                  value={form.pais || ''}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className='form__field flex-column-start'>
                <label>Motivo de Adopción</label>
                <input
                  name='motivo_adopcion'
                  value={form.motivo_adopcion || ''}
                  onChange={handleChange}
                />
                {formErrors.motivo_adopcion && (
                  <p className='form-error'>{formErrors.motivo_adopcion}</p>
                )}
              </div>
              <div className='form__btn-container flex-center'>
                <input
                  type='submit'
                  value='Enviar Solicitud'
                  className='secondary-btn'
                />
              </div>
            </form>
          </article>
        </div>
      )}
    </>
  );
};

export default AdoptPetForm;
