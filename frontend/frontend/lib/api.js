import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080', // your API Gateway
});

export default API;