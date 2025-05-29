import Dashboard from '../components/Dashboard';
import PlantImageAnalyzer from '../components/PlantImageAnalyzer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar textColor="text-gray-700" />
      <div className="flex-1 flex flex-col min-h-0">
        <Dashboard />
        <div className="md:block border-t mx-5 my-5"></div>
        <PlantImageAnalyzer />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
