import api from './api';

const MaintenanceService = {
  list: () => api.get('/maintenance'),
  get: (id) => api.get(`/maintenance/${id}`),
  create: (data) => api.post('/maintenance', data),
  updateStatus: (id, status) => api.post(`/maintenance/${id}/status`, { status }),
};

export default MaintenanceService;
