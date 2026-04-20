import client from './client';

export const authAPI = {
  register: (email, password) =>
    client.post('/auth/register', { email, password }),

  login: (email, password) =>
    client.post('/auth/login', { email, password }),
};
