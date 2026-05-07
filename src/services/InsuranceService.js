import api from './api';

const InsuranceService = {
  list: () => api.get('/insurance'),
  get: (id) => api.get(`/insurance/${id}`),
  summary: () => api.get('/insurance/summary'),
};

export default InsuranceService;
