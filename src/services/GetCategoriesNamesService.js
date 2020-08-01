import api from '../api/api';

const execute = async () => {
  const videosByCategory = await api.get('/videosbycategory?_sort=category');
  const categoriesNames = videosByCategory.data.map(
    categoryEntry => categoryEntry.category,
  );
  return categoriesNames;
};

export default {
  execute,
};
