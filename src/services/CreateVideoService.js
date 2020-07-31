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
    const videosTitles = videos.map(video => video.title);
    const videosIds = videos.map(video => video.videoId);
    console.log('titles', videosTitles);
    console.log('ids', videosIds);
    console.log('includes', videosTitles.includes(videoData.title));

    if (
      videosTitles.includes(videoData.title) ||
      videosIds.includes(videoData.videoId)
    ) {
      console.log('got into if');
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
    console.log(videoInserted);
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
    console.log(createdCategory);
    return { isNewCategory: true, responseInfo: createdCategory };
  }
};

export default {
  execute,
};
