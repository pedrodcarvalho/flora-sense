import { Box, Typography, Link } from '@mui/material';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <Box
      component={motion.footer}
      sx={{
        backgroundColor: 'grey.800',
        color: 'grey.300',
        p: 2,
        textAlign: 'center'
      }}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        &copy; {`${new Date().getFullYear()}`} FloraSense. Todos os direitos
        reservados.
      </Typography>
      <Typography variant="body2">
        Desenvolvido com ajuda das <span style={{ color: '#ef4444' }}>🌱</span> por{' '}
        <Link
          component={motion.a}
          href="https://github.com/pedrodcarvalho/"
          target="_blank"
          sx={{
            color: 'primary.light',
            fontWeight: 'bold',
            textDecoration: 'underline',
            '&:hover': {
              color: 'primary.main'
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Pedro Domitti
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
