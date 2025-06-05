import {
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  TextField,
  Button,
} from '@mui/material';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logo from '../assets/logo.png';

const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(1, 'Assunto é obrigatório'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Contact form data:', data);
    setFormSubmitted(true);
    setIsSubmitting(false);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="!bg-neutral-50 !min-h-screen !flex !flex-col">
      <Navbar textColor="text-gray-700" navBgColor="bg-neutral-100 shadow-md" />
      <Container maxWidth="lg" className="!py-24 !flex-grow">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} className="!p-6 !md:p-10 !rounded-xl !bg-white">
            <Box className="!text-center !mb-8">
              <img
                src={Logo}
                alt="FloraSense Logo"
                className="!w-24 !h-24 !mx-auto !mb-4"
              />
              <Typography
                variant="h3"
                component="h1"
                className="!font-title !text-primary !mb-2"
              >
                Entre em Contato
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                className="!italic"
              >
                Vamos cultivar uma conversa juntos!
              </Typography>
            </Box>

            <Grid container spacing={6}>
              {/* Contact Information */}
              <Grid item xs={12} md={6}>
                <section className="!mb-8">
                  <Typography
                    variant="h4"
                    component="h2"
                    className="!text-primary-dark !mb-4 !font-semibold"
                  >
                    Informações de Contato
                  </Typography>
                  <Typography
                    variant="body1"
                    className="!text-neutral-700 !leading-relaxed !mb-6"
                  >
                    Tem alguma dúvida sobre o FloraSense? Quer reportar um bug
                    ou sugerir uma nova funcionalidade? Estamos aqui para
                    ajudar! Entre em contato conosco através dos canais abaixo.
                  </Typography>

                  <List dense>
                    <motion.div
                      variants={contactItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 }}
                    >
                      <ListItem>
                        <ListItemIcon>
                          <FaEnvelope className="!text-primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Email"
                          secondary="pedrodomitti@gmail.com"
                        />
                      </ListItem>
                    </motion.div>

                    <motion.div
                      variants={contactItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 }}
                    >
                      <ListItem>
                        <ListItemIcon>
                          <FaGithub className="!text-neutral-800" />
                        </ListItemIcon>
                        <ListItemText
                          primary="GitHub"
                          secondary={
                            <motion.a
                              href="https://github.com/pedrodcarvalho/"
                              target="_blank"
                              className="!text-primary !underline"
                              whileHover={{ color: '#2E7D32' }}
                            >
                              @pedrodcarvalho
                            </motion.a>
                          }
                        />
                      </ListItem>
                    </motion.div>

                    <motion.div
                      variants={contactItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 }}
                    >
                      <ListItem>
                        <ListItemIcon>
                          <FaLinkedin className="!text-blue-600" />
                        </ListItemIcon>
                        <ListItemText
                          primary="LinkedIn"
                          secondary={
                            <motion.a
                              href="https://linkedin.com/in/pedro-carvalho-a92bab210/"
                              target="_blank"
                              className="!text-primary !underline"
                              whileHover={{ color: '#2E7D32' }}
                            >
                              Pedro Domitti de Carvalho
                            </motion.a>
                          }
                        />
                      </ListItem>
                    </motion.div>
                  </List>
                </section>
              </Grid>

              {/* Contact Form */}
              <Grid item xs={12} md={6}>
                <section>
                  <Typography
                    variant="h4"
                    component="h2"
                    className="!text-primary-dark !mb-4 !font-semibold"
                  >
                    Envie uma Mensagem
                  </Typography>

                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="!mb-4 !p-4 !bg-green-100 !border !border-green-400 !rounded !text-green-700"
                    >
                      <Typography variant="body2">
                        🌱 Mensagem enviada com sucesso! Entraremos em contato
                        em breve.
                      </Typography>
                    </motion.div>
                  )}

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="!space-y-4"
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Nome Completo"
                      {...register('name')}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      disabled={isSubmitting}
                    />

                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Email"
                      type="email"
                      {...register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      disabled={isSubmitting}
                    />

                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Assunto"
                      {...register('subject')}
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                      disabled={isSubmitting}
                    />

                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Mensagem"
                      multiline
                      rows={6}
                      {...register('message')}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      disabled={isSubmitting}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isSubmitting}
                      sx={{
                        textTransform: 'none',
                        color: 'white',
                        fontSize: '1rem',
                        py: 1.5,
                        px: 4,
                      }}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    </Button>
                  </form>
                </section>
              </Grid>
            </Grid>

            <section className="!mt-12 !text-center">
              <Typography
                variant="h4"
                component="h2"
                className="!text-primary-dark !mb-4 !font-semibold"
              >
                Feedback e Contribuições
              </Typography>
              <Typography
                variant="body1"
                className="!text-neutral-700 !leading-relaxed !mb-4"
              >
                Sua contribuição é muito bem-vinda! Se você é desenvolvedor e
                quer ajudar a melhorar a plataforma, ou se você tem ideias para
                novas funcionalidades, adoraríamos ouvir você.
              </Typography>
              <motion.div className="!flex !justify-center !gap-4 !flex-wrap">
                <motion.a
                  href="https://github.com/pedrodcarvalho/flora-sense"
                  target="_blank"
                  className="!bg-neutral-800 !text-white !px-6 !py-3 !rounded-lg !font-semibold !no-underline"
                  whileHover={{ scale: 1.05, backgroundColor: '#1f2937' }}
                  whileTap={{ scale: 0.95 }}
                >
                  🌿 Contribuir no GitHub
                </motion.a>
                <motion.a
                  href="https://github.com/pedrodcarvalho/flora-sense/issues"
                  target="_blank"
                  className="!bg-primary !text-white !px-6 !py-3 !rounded-lg !font-semibold !no-underline"
                  whileHover={{ scale: 1.05, backgroundColor: '#2E7D32' }}
                  whileTap={{ scale: 0.95 }}
                >
                  🐛 Reportar Bug
                </motion.a>
              </motion.div>
            </section>
          </Paper>
        </motion.div>
      </Container>
      <Footer />
    </div>
  );
};

export default Contact;
