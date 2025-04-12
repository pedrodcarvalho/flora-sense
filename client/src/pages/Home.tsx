import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar textColor="text-gray-700" />
      <div className="h-screen flex items-center justify-center">
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
