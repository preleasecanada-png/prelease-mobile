import api from './api';

const ChatService = {
  conversations: () => api.get('/chats/conversations'),
  getChats: () => api.get('/chats'),
  getChat: userId => api.get(`/chats?user_id=${userId}`),
  sendMessage: (receiverId, message) =>
    api.post('/send-message', {
      received_id: receiverId,
      message: message,
    }),
  unreadCount: () => api.get('/chats/unread-count'),
  markRead: userId => api.post('/chats/mark-read', {user_id: userId}),
  getUsers: () => api.get('/users'),
  getUserDetail: userId => api.get(`/user-detail/${userId}`),
  markAsUnread: userId => api.post('/chats/mark-unread', {user_id: userId}),
  pinConversation: userId => api.post('/chats/pin', {user_id: userId}),
  deleteConversation: userId =>
    api.post('/chats/conversation/delete', {user_id: userId}),
};

export default ChatService;
