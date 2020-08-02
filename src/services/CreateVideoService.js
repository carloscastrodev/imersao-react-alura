import api from '../api/api';

const requestConfig = {
  headers: { 'Content-Type': 'application/json' },
};

const execute = async ({ videoData }) => {
  for (let key of Object.keys(videoData)) {
    videoData[key] = videoData[key].replace(/\s+$/, '');
  }
  const { data } = await api.get(
    `/videosbycategory?category=${videoData.category}`,
  );
  const categoryExists = data.length > 0;

  if (categoryExists) {
    const categoryEntry = data[0];
    const { videos } = categoryEntry;
    const videosTitles = videos.map(video => video.title);
    const videosIds = videos.map(video => video.videoId);

    if (
      videosTitles.includes(videoData.title) ||
      videosIds.includes(videoData.videoId)
    ) {
      return {
        isNewCategory: false,
        responseInfo: {
          status: 409,
        },
      };
    }

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
    return { isNewCategory: false, responseInfo: videoInserted };
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
    return { isNewCategory: true, responseInfo: createdCategory };
  }
};

export default {
  execute,
};
