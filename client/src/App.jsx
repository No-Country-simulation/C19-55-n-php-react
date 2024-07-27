import React, { useEffect, useState } from 'react';
import { helpHttp } from './helpers/helpHttp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './pages/UserDashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [pets, setPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let petsUrl = 'https://no-code-backend-sn9i.onrender.com/api/pets';

  useEffect(() => {
    helpHttp()
      .get(petsUrl)
      .then((resp) => {
        if (!resp.error) {
          setPets(resp);
        } else {
          setPets([]);
        }
      });
  }, []);

  // Abrir el modal del Login
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Cerrar el modal del Login
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                pets={pets}
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={closeModal}
              />
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
