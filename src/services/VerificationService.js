import api from './api';

const VerificationService = {
  list: () => api.get('/verification'),

  status: () => api.get('/verification/status'),

  submit: (verificationType, documentType, file) => {
    const formData = new FormData();
    formData.append('verification_type', verificationType);
    formData.append('document_type', documentType);
    formData.append('document', {
      uri: file.uri,
      type: file.type || 'image/jpeg',
      name: file.name || 'document.jpg',
    });
    return api.post('/verification/submit', formData);
  },
};

export default VerificationService;
