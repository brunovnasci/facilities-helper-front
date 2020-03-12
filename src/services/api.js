import axios from 'axios';

const api = axios.create({
    // baseURL: "http://localhost:8080"
    baseURL: "http://10.0.10.98:8080"
});

export default api;