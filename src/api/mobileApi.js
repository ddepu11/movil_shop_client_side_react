import axios from 'axios';

export const create = (formData) =>
  axios.post('/mobiles', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const listAll = () => axios.get('/mobiles');
