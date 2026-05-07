import api, { setAuthToken, clearAuthToken } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = '@prelease_token';
const AUTH_USER_KEY = '@prelease_user';

const AuthService = {
  login: async (email, password) => {
    const res = await api.post('/login', { email, password });
    if (res?.token) {
      setAuthToken(res.token);
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, res.token);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
    }
    return res;
  },

  register: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    const res = await api.post('/register', formData);
    return res;
  },

  logout: async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      console.log('Logout API error (ignored):', e);
    }
    clearAuthToken();
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  },

  forgotPassword: (email) => api.post('/forgot-password', { email }),

  resetPassword: (data) => api.post('/reset-password', data),

  getProfile: () => api.get('/user'),

  updateProfile: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return api.post('/profile-update', formData);
  },

  restoreSession: async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    const userStr = await AsyncStorage.getItem(AUTH_USER_KEY);
    if (token && userStr) {
      setAuthToken(token);
      return { token, user: JSON.parse(userStr) };
    }
    return null;
  },
};

export default AuthService;
