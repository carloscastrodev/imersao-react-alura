import api from '../api/api';

/* gets a random single id of a video in a given category */

const execute = async ({ categoryTitle }) => {
  const { data } = await api.get(`/videosbycategory?category=${categoryTitle}`);
  const { videos } = data[0];
  const thumbnailIdx = Math.floor(videos.length * Math.random());
  const { videoId } = videos[thumbnailIdx];
  return videoId;
};

export default {
  execute,
};
