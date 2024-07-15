import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token')
    if(!token && window.location.pathname !== '/login') window.location.replace('/login')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default axiosClient