import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMenu } from 'react-icons/io5';

import Logo from '../assets/logo.png';

const Navbar = ({ ...props }) => {
  const { textColor } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      className="bg-transparent p-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center text-lg font-bold text-gray-50"
        >
          <motion.img
            src={Logo}
            alt="FloraSense Logo"
            className="w-7 h-7 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className={`ml-2 text-2xl ${textColor} font-extrabold hover:underline`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            FloraSense
          </motion.div>
        </Link>
        <motion.button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoMenu className="text-2xl" />
        </motion.button>
        <motion.div
          className={`${
            isOpen
              ? 'fixed flex flex-col items-center bg-gray-950 top-16 left-1/2 transform -translate-x-1/2 w-2/3 p-4 rounded-md shadow-lg'
              : 'hidden'
          } md:flex md:items-center md:gap-6`}
          style={
            isOpen
              ? {
                  background: 'rgba(255, 255, 255, 0)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }
              : undefined
          }
        >
          {['Home', 'Sobre', 'Contato'].map((text, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, color: '#A7E9AF' }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                to={`/${text.toLowerCase()}`}
                className={`block mt-2 md:mt-0 ${textColor} font-extrabold text-lg hover:underline`}
              >
                {text}
              </Link>
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${isOpen ? 'mt-4' : ''}`}
          >
            <Link
              to="/login"
              className={`border-primary-light border-solid border-2 px-4 py-1 rounded-lg ${textColor} font-bold text-md`}
            >
              Entrar
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className={`hidden md:block border-t ${textColor} mt-2`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1 }}
      ></motion.div>
    </motion.nav>
  );
};

export default Navbar;
