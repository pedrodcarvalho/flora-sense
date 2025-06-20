import { Box } from '@mui/material';
import Charts from './Charts';

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mx: 2.5,
        mt: 5,
      }}
    >
      <Charts />
    </Box>
  );
};

export default Dashboard;
