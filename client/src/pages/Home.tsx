import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar textColor="text-gray-700" />
      <div className="flex-1 flex flex-col min-h-0">
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
