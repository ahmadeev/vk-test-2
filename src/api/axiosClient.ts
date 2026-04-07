import axios, { type AxiosInstance } from 'axios';

export const axiosClient: AxiosInstance = axios.create({
    // baseURL: 'https://jsonplaceholder.typicode.com',
    // baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        config.headers['x-api-key'] = 'live_AwZl1hEhiEslGuGTUOONIN7QSTXbVmbzMrghJbrUs2DwkEufYAkmYcYYAZZwW1FY';

        return config;
    },
);
