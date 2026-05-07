import api from './api';

const SupportService = {
  list: () => api.get('/support'),

  get: (id) => api.get(`/support/${id}`),

  create: (data) => api.post('/support', data),
};

export default SupportService;
