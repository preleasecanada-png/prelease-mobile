import api from './api';

const NotificationService = {
  list: () => api.get('/notifications'),
  unreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: id => api.post(`/notifications/${id}/read`),
  markAllAsRead: () => api.post('/notifications/mark-all-read'),
  destroy: id => api.delete(`/notifications/${id}`),
};

export default NotificationService;
