import api from '../api/api';

const execute = async () => {
  const videosByCategory = await api.get('/videosbycategory?_sort=category');
  return videosByCategory;
};

export default {
  execute,
};
