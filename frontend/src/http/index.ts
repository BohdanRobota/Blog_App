import axios from "axios";
import { API_URL } from "../const";
import { AuthResponse } from "../models/AuthResponse";
import { AUTH_ROUTES } from "../enum";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
})

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error?.response?.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<AuthResponse>(API_URL + AUTH_ROUTES.REFRESH, { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalRequest);
    } catch (e) {
      console.log('Not Authorized');
    }
  }
  throw error;
})

export default $api;