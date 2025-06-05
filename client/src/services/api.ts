import axios from 'axios';

export const fetchSensorData = async () => {
  return await axios
    .get(`${process.env.REACT_APP_API_URL}/sensors`)
    .then((response) => {
      return response.data;
    });
};
