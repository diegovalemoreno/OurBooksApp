import axios from 'axios';

const api = axios.create({
  baseURL: 'https://our-home-library.herokuapp.com',
});

export default api;
