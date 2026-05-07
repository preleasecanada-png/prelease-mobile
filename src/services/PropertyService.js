import api from './api';

const PropertyService = {
  list: (params = '') => api.get(`/property/lists${params ? '?' + params : ''}`),
  detail: (slug, id) => api.get(`/property-detail/${slug}/${id}`),
  search: (query = '') => api.get(`/property/lists?search=${encodeURIComponent(query)}`),
  countries: () => api.get('/property/countries'),
  myProperties: () => api.get('/property/my-properties'),

  create: (formData) => api.post('/property/create', formData),
  update: (id, formData) => api.post(`/property/${id}/update`, formData),
  destroy: (id) => api.delete(`/property/${id}`),
  deleteImage: (imageId) => api.delete(`/property/image/${imageId}`),

  wishLists: () => api.get('/property/wish-lists'),
  wishListCreate: (propertyId) => api.post('/property/wish-list-create', { property_id: propertyId }),
  wishListDelete: (propertyId) => api.post('/property/wish-list-delete', { property_id: propertyId }),
};

export default PropertyService;
