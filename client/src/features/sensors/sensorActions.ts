import axios from 'axios';

import { fetchSensorData } from './sensorSlice';
import { AppDispatch } from '../../store/store';

export const getSensorData = () => async (dispatch: AppDispatch) => {
  dispatch(fetchSensorData());
  try {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/sensors`)
      .then((response) => {
        dispatch(fetchSensorData(response.data));
      });
  } catch (error: any) {
    console.error('Error fetching sensor data:', error);
    dispatch(fetchSensorData(error));
  }
};
