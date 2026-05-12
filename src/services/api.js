const BASE_URL = 'https://xa2g46fwr6.execute-api.us-east-1.amazonaws.com/api';
export const IMAGE_BASE_URL = 'https://prelease-storage-production.s3.us-east-1.amazonaws.com';

export const imageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${IMAGE_BASE_URL}/${path}`;
};

export const propertyImageUrl = (property) => {
  // Backend now returns full S3 URLs via image_url accessor
  const directUrl = property?.property_images?.[0]?.image_url;
  if (directUrl) return directUrl;
  // Fallback to old method for backward compatibility
  const path = property?.property_images?.[0]?.original;
  return imageUrl(path);
};

let _token = null;

export const setAuthToken = (token) => {
  _token = token;
};

export const getAuthToken = () => _token;

export const clearAuthToken = () => {
  _token = null;
};

const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  if (_token) {
    headers['Authorization'] = `Bearer ${_token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),

  post: (endpoint, body) => {
    const opts = { method: 'POST' };
    if (body instanceof FormData) {
      opts.body = body;
    } else {
      opts.body = JSON.stringify(body);
    }
    return request(endpoint, opts);
  },

  put: (endpoint, body) =>
    request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default api;
