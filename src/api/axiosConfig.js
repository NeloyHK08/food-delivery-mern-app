import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // This enables cookies to be sent and received
});

export default axiosInstance;
