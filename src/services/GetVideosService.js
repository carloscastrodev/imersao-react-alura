import mockApi from '../mockApi/videosAPI';

const execute = () => {
  const { videosByCategory } = mockApi;
  return videosByCategory;
};

export default {
  execute,
};
