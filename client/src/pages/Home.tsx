import { Box, Divider } from '@mui/material';
import Dashboard from '../components/Dashboard';
import PlantImageAnalyzer from '../components/PlantImageAnalyzer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar textColor="text-gray-700" />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Box sx={{ mb: 6 }}>
          <Dashboard />
        </Box>
        <Divider sx={{ mx: 2.5, my: 4 }} />
        <Box sx={{ mx: 2.5, pb: 4 }}>
          <PlantImageAnalyzer />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
