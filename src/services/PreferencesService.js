import api from './api';

const PreferencesService = {
  get: () => api.get('/preferences'),

  save: preferences => api.post('/preferences', preferences),

  searchMatching: () => api.get('/preferences/search'),
};

export default PreferencesService;
