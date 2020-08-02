import api from '../api/api';

const execute = async ({ id }) => {
  const { status } = await api.delete(`/videosbycategory/${id}`);
  return status;
};

export default {
  execute,
};
