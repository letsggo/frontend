import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://43.200.238.249:5000';
const REFRESH_TOKEN_URL = `${API_URL}/users/token`;

const useAxios = () => {
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    const response = await axios.post(REFRESH_TOKEN_URL, { token: refreshToken });

                    if (response.status === 200) {
                        const { accessToken } = response.data;

                        localStorage.setItem('token', accessToken);

                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                        return axiosInstance(originalRequest);
                    }
                } catch (err) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    navigate('/login');
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxios;
