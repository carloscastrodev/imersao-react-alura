import api from '../mockApi/api';

const execute = async () => {
  const videosByCategory = await api.get('/videosbycategory');
  return videosByCategory;
};

export default {
  execute,
};
