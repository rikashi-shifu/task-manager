import client from './client';

export const tasksAPI = {
  getAll: (params = {}) =>
    client.get('/tasks', { params }),

  getById: (id) =>
    client.get(`/tasks/${id}`),

  create: (taskData) =>
    client.post('/tasks', taskData),

  update: (id, taskData) =>
    client.put(`/tasks/${id}`, taskData),

  delete: (id) =>
    client.delete(`/tasks/${id}`),
};
