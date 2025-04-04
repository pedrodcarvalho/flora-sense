import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Plant from '../assets/welcome-plant.svg';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div>
      <Navbar />
      <motion.div className="flex flex-col md:flex-row items-center justify-center h-screen w-full bg-gradient-to-r from-primary-light to-primary gap-10 p-5">
        <motion.div
          className="flex flex-col gap-5 w-full md:w-96 text-center md:text-left"
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="font-title text-7xl md:text-9xl text-gray-200"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            FloraSense
          </motion.h1>
          <motion.h3
            className="text-xl text-gray-900 md:text-2xl font-bold text-center md:text-left"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Fortalecendo <i className="text-gray-50 underline">plantas</i> com
            inteligência – Monitore, Analise e Cuide sem esforço!
          </motion.h3>
          <motion.p
            className="text-sm md:text-base text-gray-900"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            FloraSense é seu melhor assistente de cuidados com plantas,
            fornecendo monitoramento em tempo real e insights personalizados
            para ajudar você a nutrir seus companheiros verdes.
          </motion.p>
          <motion.button
            onClick={handleGetStarted}
            className="bg-green-500 p-2 rounded-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.1, backgroundColor: '#38a169' }} // Slightly brighter green
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-white font-bold text-lg">
              Hora de plantar!
            </span>
          </motion.button>
        </motion.div>
        <motion.img
          src={Plant}
          className="w-64 md:w-96 object-cover"
          alt="Plant"
          loading="lazy"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Welcome;
