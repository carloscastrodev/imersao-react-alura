import mockApi from '../mockApi/videosAPI';

const execute = () => {
  const { videosByCategory } = mockApi;
  const categoriesNames = videosByCategory.map(({ category }) => category);
  return categoriesNames;
};

export default {
  execute,
};
