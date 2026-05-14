import api from './api';

const AIAssistantService = {
  chat: (message) =>
    api.post('/ai-assistant/chat', { message }),
  suggestions: () => api.get('/ai-assistant/suggestions'),
  history: () => api.get('/ai-assistant/history'),
  clearHistory: () => api.delete('/ai-assistant/history'),
};

export default AIAssistantService;
