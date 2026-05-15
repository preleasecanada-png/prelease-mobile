import api from './api';

const LeaseService = {
  list: (role = 'renter') => api.get(`/leases?role=${role}`),

  get: id => api.get(`/leases/${id}`),

  createFromApplication: (applicationId, terms = {}) =>
    api.post('/leases/create-from-application', {
      rental_application_id: applicationId,
      ...terms,
    }),

  sign: id => api.post(`/leases/${id}/sign`),

  terminate: id => api.post(`/leases/${id}/terminate`),
};

export default LeaseService;
