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
  Avatar,
} from '@mui/material';
import {
  FaReact,
  FaNodeJs,
  FaLeaf,
  FaBrain,
  FaMicrochip,
  FaDatabase,
  FaCloud,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiVite,
  SiJest,
  SiSocketdotio,
  SiPython,
  SiTensorflow,
} from 'react-icons/si';
import { motion } from 'framer-motion';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logo from '../assets/logo.png';

const About = () => {
  const iconSize = '1.5em';

  const techItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      sx={{
        backgroundColor: 'grey.50',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar textColor="text-gray-700" navBgColor="bg-neutral-100 shadow-md" />
      <Container maxWidth="lg" sx={{ py: 12, flexGrow: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              backgroundColor: 'background.paper',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                component="img"
                src={Logo}
                alt="FloraSense Logo"
                sx={{ width: 96, height: 96, mx: 'auto', mb: 2 }}
              />
              <Typography
                variant="h3"
                component="h1"
                className="font-title"
                sx={{
                  color: 'primary.main',
                  mb: 1,
                }}
              >
                Sobre o FloraSense
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{ fontStyle: 'italic' }}
              >
                Fortalecendo plantas com inteligência – Monitore, Analise e
                Cuide sem esforço!
              </Typography>
            </Box>

            <section className="mb-8">
              <Typography
                variant="h4"
                component="h2"
                className="text-primary-dark mb-3 font-semibold"
              >
                Nossa Missão
              </Typography>
              <Typography
                variant="body1"
                className="text-neutral-700 leading-relaxed"
              >
                O FloraSense nasceu da paixão pela natureza e da tecnologia.
                Nossa missão é simplificar o cuidado com as plantas, tornando-o
                acessível e prazeroso para todos, desde jardineiros experientes
                até iniciantes. Acreditamos que, com as ferramentas certas e
                insights inteligentes, qualquer um pode cultivar um oásis verde.
              </Typography>
            </section>

            <section className="mb-8">
              <Typography
                variant="h4"
                component="h2"
                className="text-primary-dark mb-4 font-semibold"
              >
                Como Funciona: A Tecnologia por Trás da Magia Verde
              </Typography>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    className="text-primary mb-2"
                  >
                    Frontend
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <FaReact size={iconSize} className="text-sky-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="React"
                        secondary="Para uma interface de usuário dinâmica e responsiva."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SiTypescript
                          size={iconSize}
                          className="text-blue-600"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="TypeScript"
                        secondary="Para um código mais robusto e manutenível."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SiVite size={iconSize} className="text-purple-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Vite"
                        secondary="Para um desenvolvimento frontend rápido e moderno."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SiJest size={iconSize} className="text-red-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Jest"
                        secondary="Para testes automatizados e confiáveis."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SiTailwindcss
                          size={iconSize}
                          className="text-teal-500"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="TailwindCSS"
                        secondary="Para estilização ágil e customizável."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SiRedux size={iconSize} className="text-purple-700" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Redux"
                        secondary="Para gerenciamento de estado global da aplicação."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FaLeaf size={iconSize} className="text-green-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="MUI (Material-UI)"
                        secondary="Componentes React para um design elegante e consistente."
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    className="text-primary mb-2"
                  >
                    Backend
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <FaNodeJs size={iconSize} className="text-green-600" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Node.js & Express"
                        secondary="Para um servidor rápido e escalável."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FaDatabase
                          size={iconSize}
                          className="text-orange-500"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Banco de Dados (MongoDB)"
                        secondary="Armazenamento flexível de dados das plantas e usuários."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SiSocketdotio
                          size={iconSize}
                          className="text-neutral-800"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Socket.IO"
                        secondary="Para comunicação em tempo real com dispositivos IoT."
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    className="text-primary mb-2"
                  >
                    IoT (Internet das Coisas)
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <FaMicrochip size={iconSize} className="text-red-700" />
                      </ListItemIcon>
                      <ListItemText
                        primary="ESP32 (Microcontrolador)"
                        secondary="Coleta dados dos sensores em tempo real."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FaCloud size={iconSize} className="text-sky-600" />
                      </ListItemIcon>
                      <ListItemText
                        primary="MQTT (Comunicação)"
                        secondary="Protocolo leve para envio eficiente de dados."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SiPython size={iconSize} className="text-yellow-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="C++ (Firmware)"
                        secondary="Lógica embarcada no dispositivo IoT para leitura e processamento inicial."
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    className="text-primary mb-2"
                  >
                    Inteligência Artificial & Machine Learning
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <FaBrain size={iconSize} className="text-pink-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Google Gemini AI"
                        secondary="Para identificação de plantas e recomendações de cuidados através de análise de imagem."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SiPython size={iconSize} className="text-blue-500" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Python"
                        secondary="Utilizado no desenvolvimento e treinamento de modelos de ML."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SiTensorflow
                          size={iconSize}
                          className="text-orange-600"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="TensorFlow Lite"
                        secondary="Para modelos de ML otimizados e embarcados no dispositivo IoT."
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </section>

            <section className="mb-8">
              <Typography
                variant="h4"
                component="h2"
                className="text-primary-dark mb-3 font-semibold"
              >
                Principais Funcionalidades
              </Typography>
              <motion.ul className="list-disc list-inside space-y-2 text-neutral-700">
                {[
                  'Monitoramento em tempo real de umidade do solo, luz, temperatura e umidade do ar.',
                  'Dashboard intuitivo com gráficos para visualização dos dados da sua planta.',
                  'Assistente botânica inteligente "Flora" para análise de imagens de plantas, fornecendo identificação e dicas de cuidado personalizadas.',
                  'Sistema de autenticação seguro para proteger seus dados.',
                  'Design responsivo para acesso em qualquer dispositivo.',
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    variants={techItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            </section>

            <section className="text-center">
              <Typography
                variant="h4"
                component="h2"
                className="text-primary-dark mb-4 font-semibold"
              >
                O Desenvolvedor
              </Typography>
              <Box className="flex flex-col items-center">
                <Avatar
                  alt="Pedro Domitti"
                  src="https://avatars.githubusercontent.com/u/83586350"
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography
                  variant="h6"
                  className="text-neutral-800 font-medium"
                >
                  Pedro Domitti de Carvalho
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Entusiasta de tecnologia, desenvolvimento de software e
                  soluções inovadoras.
                </Typography>
                <motion.a
                  href="https://github.com/pedrodcarvalho/"
                  target="_blank"
                  className="text-primary font-bold underline mt-2 inline-block"
                  whileHover={{ scale: 1.05, color: '#2E7D32' }}
                >
                  GitHub Profile
                </motion.a>
              </Box>
            </section>
          </Paper>
        </motion.div>
      </Container>
      <Footer />
    </Box>
  );
};

export default About;
