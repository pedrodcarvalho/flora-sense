import axios from 'axios';

export async function fetchSensorData() {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/sensors`)
    .then((response) => {
      return response.data;
    });
}
