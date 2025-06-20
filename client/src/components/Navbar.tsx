import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMenu } from 'react-icons/io5';
import { Button, IconButton } from '@mui/material';

import Logo from '../assets/logo.png';

const Navbar = ({ ...props }) => {
  const { textColor, navBgColor } = props;

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    setIsOpen(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="mb-16">
      <motion.nav
        className={`${navBgColor ? navBgColor : 'bg-neutral-50'} p-4 fixed top-0 left-0 w-full z-50`}
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
          <IconButton
            className="block md:hidden focus:outline-none"
            onClick={toggleMenu}
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{
              color: 'white',
              backgroundColor: 'primary.light',
              borderRadius: '6px',
              padding: '4px',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            <IoMenu className="text-2xl" />
          </IconButton>
          <motion.div
            className={`${
              isOpen
                ? 'fixed flex flex-col items-center top-16 left-1/2 transform -translate-x-1/2 w-2/3 p-4 rounded-md shadow-lg'
                : 'hidden'
            } md:flex md:items-center md:gap-6`}
            style={
              isOpen
                ? {
                    background: `${textColor === 'text-gray-50' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: `${textColor === 'text-gray-50' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)'}`,
                    zIndex: '1',
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
              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'primary.light',
                    color: textColor === 'text-gray-50' ? 'white' : 'grey.700',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor: 'rgba(167, 233, 175, 0.1)',
                    },
                  }}
                >
                  Sair
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'primary.light',
                    color: textColor === 'text-gray-50' ? 'white' : 'grey.700',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor: 'rgba(167, 233, 175, 0.1)',
                    },
                  }}
                >
                  Entrar
                </Button>
              )}
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
    </div>
  );
};

export default Navbar;
