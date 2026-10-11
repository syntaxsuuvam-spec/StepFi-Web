import axios from 'axios';
import { API_BASE_URL, PUBLIC_API_BASE_URL } from '@/constants/config';

export const publicApi = axios.create({
  baseURL: PUBLIC_API_BASE_URL || API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor unwraps payload without touching user store or auth redirects
publicApi.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || error.message || 'Public API request failed';
    return Promise.reject(new Error(message));
  }
);