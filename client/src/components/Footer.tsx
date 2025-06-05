import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-slate-900 text-gray-200 p-4 text-center"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <p>
        &copy; {`${new Date().getFullYear()}`} FloraSense. Todos os direitos
        reservados.
      </p>
      <p>
        Desenvolvido com ajuda das <span className="text-red-500">🌱</span> por{' '}
        <motion.a
          href="https://github.com/pedrodcarvalho/"
          target="_blank"
          className="text-primary font-extrabold underline"
          whileHover={{ scale: 1.1, color: '#A7E9AF' }}
          whileTap={{ scale: 0.9 }}
        >
          Pedro Domitti
        </motion.a>
      </p>
    </motion.footer>
  );
};

export default Footer;
