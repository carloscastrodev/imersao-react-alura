import api from '../mockApi/api';

const requestConfig = {
  headers: { 'Content-Type': 'application/json' },
};

const execute = async ({ videoData }) => {
  const { data } = await api.get(
    `/videosbycategory?category=${videoData.category}`,
  );
  const categoryExists = data.length > 0;

  if (categoryExists) {
    const categoryEntry = data[0];
    const { videos } = categoryEntry;
    const newVideoId = videos.length + 1;
    const newVideoData = {
      id: newVideoId,
      videoId: videoData.videoId,
      title: videoData.title,
    };
    const updatedVideos = [...videos, newVideoData];
    const updatedCategory = {
      category: categoryEntry.category,
      videos: updatedVideos,
    };
    const videoInserted = await api.put(
      `/videosbycategory/${categoryEntry.id}`,
      updatedCategory,
      requestConfig,
    );
    console.log(videoInserted);
    return videoInserted;
  } else {
    const categoryToCreate = {
      category: videoData.category,
      videos: [{ id: 1, videoId: videoData.videoId, title: videoData.title }],
    };
    const createdCategory = await api.post(
      '/videosbycategory',
      categoryToCreate,
      requestConfig,
    );
    console.log(createdCategory);
    return createdCategory;
  }
};

export default {
  execute,
};
