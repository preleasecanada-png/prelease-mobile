import api from './api';

const DashboardService = {
  stats: () => api.get('/dashboard/stats'),
  landlordReport: () => api.get('/dashboard/landlord-report'),
};

export default DashboardService;
