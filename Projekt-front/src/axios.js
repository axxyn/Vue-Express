import axios from 'axios';
import { getLocalAccessToken, getUsername } from './helpers/session.helper'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        const username = getUsername();
        if (token) {
            config.headers["x-access-token"] = token;
        }
        if (username) {
            config.headers["x-username"] = username;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);