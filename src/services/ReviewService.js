import api from './api';

const ReviewService = {
  list: () => api.get('/reviews'),
  create: data => api.post('/reviews', data),
  propertyReviews: propertyId => api.get(`/reviews/property/${propertyId}`),
  userReviews: userId => api.get(`/reviews/user/${userId}`),
};

export default ReviewService;
