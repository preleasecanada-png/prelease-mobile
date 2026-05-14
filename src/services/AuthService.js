import api, { setAuthToken, clearAuthToken } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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

  configureGoogleSignIn: () => {
    GoogleSignin.configure({
      webClientId: '671460098256-9185q5ps7m533u9nmr6hivvk8pksvhnv.apps.googleusercontent.com',
      offlineAccess: false,
    });
  },

  googleSignIn: async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo?.idToken;
    if (!idToken) throw new Error('No ID token received from Google');
    const res = await api.post('/google-login', { token: idToken });
    if (res?.token) {
      setAuthToken(res.token);
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, res.token);
      await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
    }
    return res;
  },

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
