// API client using axios with interceptors

import axios from 'axios';

// Read backend URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add Authorization header from localStorage
apiClient.interceptors.request.use(
  (config) => {
    // Only add token in browser (not during SSR)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token invalid or expired
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

// API methods (auth is handled by Clerk; no /auth/signup or /auth/login)
export const api = {
  // Assessment endpoints
  async createAssessment(assessmentData: any) {
    const response = await apiClient.post('/assessments', assessmentData);
    return response.data;
  },

  async getLatestAssessment() {
    try {
      const response = await apiClient.get('/assessments/latest');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return { assessment: null }; // No assessment found
      }
      throw error;
    }
  },

  async getAssessmentHistory() {
    const response = await apiClient.get('/assessments/history');
    return response.data;
  },

  // Health check
  async healthCheck() {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default apiClient;
