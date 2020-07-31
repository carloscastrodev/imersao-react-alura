import axios from 'axios';

const getBaseUrl = () => {
  if (
    window.location.hostname.includes('localhost') ||
    window.location.hostname.includes('192')
  ) {
    return 'http://localhost:8080';
  } else {
    return 'https://chopperflix-backend.herokuapp.com';
  }
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

export default api;
