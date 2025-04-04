import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

import './App.css';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="bg-gradient-to-r from-primary-light to-primary">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Welcome />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
