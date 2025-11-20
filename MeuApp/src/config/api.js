import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // coloque sua API aqui
});

export default api;
