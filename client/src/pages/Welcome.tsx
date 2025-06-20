import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Box, Typography } from '@mui/material';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Plant from '../assets/welcome-plant.svg';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  // Set initial body background to match navbar gradient
  React.useEffect(() => {
    const originalBackground = document.body.style.background;
    document.body.style.background = 'linear-gradient(to right, #A7E9AF, #4CAF50)';

    return () => {
      document.body.style.background = originalBackground;
    };
  }, []);

  return (
    <Box sx={{ background: 'linear-gradient(to right, #A7E9AF, #4CAF50)' }}>
      <Navbar
        textColor="text-gray-50"
        navBgColor="bg-gradient-to-r from-primary-light to-primary"
      />
      <Box
        component={motion.div}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
          gap: 5,
          p: 2.5,
        }}
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box
          component={motion.div}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            width: { xs: '100%', md: '384px' },
            textAlign: { xs: 'center', md: 'left' },
          }}
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography
            component={motion.h1}
            className="font-title text-neutral-200"
            variant="h1"
            sx={{
              fontFamily: 'title',
              fontSize: { xs: '4.5rem', md: '8rem' },
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            FloraSense
          </Typography>
          <Typography
            component={motion.h2}
            variant="h5"
            sx={{
              color: 'grey.900',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 'bold',
              textAlign: { xs: 'center', md: 'left' },
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Fortalecendo{' '}
            <Box
              component="i"
              sx={{ color: 'grey.50', textDecoration: 'underline' }}
            >
              plantas
            </Box>{' '}
            com inteligência – Monitore, Analise e Cuide sem esforço!
          </Typography>
          <Typography
            component={motion.p}
            variant="body1"
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
              color: 'grey.900',
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            FloraSense é seu melhor assistente de cuidados com plantas,
            fornecendo monitoramento em tempo real e insights personalizados
            para ajudar você a nutrir seus companheiros verdes.
          </Typography>
          <Button
            onClick={handleGetStarted}
            variant="contained"
            size="large"
            component={motion.button}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{
              backgroundColor: '#13863f',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              textTransform: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#1a9d4b',
              },
            }}
          >
            Hora de plantar!
          </Button>
        </Box>
        <Box
          component={motion.img}
          src={Plant}
          sx={{ width: { xs: '256px', md: '384px' }, objectFit: 'cover' }}
          alt="Plant"
          loading="lazy"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </Box>
      <Footer />
    </Box>
  );
};

export default Welcome;
