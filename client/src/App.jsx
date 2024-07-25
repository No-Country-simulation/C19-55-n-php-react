import { useEffect, useState } from 'react';
import About from './components/About';
import Header from './components/Header';
import Hero from './components/Hero';
import Pets from './components/Pets';
import { helpHttp } from './helpers/helpHttp';
import LogIn from './components/LogIn';
import Adoptions from './components/Adoptions';
import Testimonials from './components/Testimonials';

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
    <>
      <Header openModal={openModal} />
      <Hero />
      <About />
      <Pets pets={pets} />
      <Adoptions />
      <Testimonials />
      <LogIn isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}

export default App;
