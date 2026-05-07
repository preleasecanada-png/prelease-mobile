import api from './api';

const AIAssistantService = {
  chat: (message, conversation = []) =>
    api.post('/ai-assistant/chat', { message, conversation }),
  suggestions: () => api.get('/ai-assistant/suggestions'),
};

export default AIAssistantService;
