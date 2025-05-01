import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import Charts from './Charts';

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="h-screen flex flex-col flex-1 mx-5">
      <h1 className="font-bold text-5xl text-gray-950 mb-4">
        Bem-vindo, {user?.firstName} {user?.lastName}!
      </h1>
      <Charts />
    </div>
  );
};

export default Dashboard;
