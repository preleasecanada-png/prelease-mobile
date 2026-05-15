import api from './api';

const ApplicationService = {
  list: (role = 'renter') => api.get(`/applications?role=${role}`),

  get: id => api.get(`/applications/${id}`),

  create: data => api.post('/applications', data),

  updateStatus: (id, status, notes = '') =>
    api.post(`/applications/${id}/status`, {
      status,
      landlord_notes: notes,
    }),

  withdraw: id => api.post(`/applications/${id}/withdraw`),

  uploadDocument: (applicationId, documentType, file) => {
    const formData = new FormData();
    formData.append('rental_application_id', applicationId);
    formData.append('document_type', documentType);
    formData.append('document', {
      uri: file.uri,
      type: file.type || 'application/pdf',
      name: file.name || 'document.pdf',
    });
    return api.post('/applications/upload-document', formData);
  },
};

export default ApplicationService;
