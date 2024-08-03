import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8086/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
