import api from '../api/api';
import DeleteCategoryService from './DeleteCategoryService';

const requestConfig = {
  headers: { 'Content-Type': 'application/json' },
};

const execute = async ({ videoData, categoryTitle }) => {
  const categoriesFound = await api.get(
    `/videosbycategory?category=${categoryTitle}`,
  );
  const categoryEntry = categoriesFound.data[0];
  const { id, category, videos } = categoryEntry;

  const videoExists = videos.find(video => video.videoId === videoData.videoId);
  if (!videoExists) {
    return { status: 404 };
  } else {
    if (videos.length === 1) {
      await DeleteCategoryService.execute({ id });
      return { status: 207, videos: [], deletedCategoryTitle: category };
    } else {
      const updatedVideos = videos.filter(
        video => video.videoId !== videoData.videoId,
      );
      const updatedCategory = {
        category,
        videos: updatedVideos,
      };
      const videoDeleted = await api.put(
        `/videosbycategory/${id}`,
        updatedCategory,
        requestConfig,
      );
      if (videoDeleted.statusText === 'OK') {
        return { status: 204, videos: updatedVideos };
      } else {
        return { status: 500 };
      }
    }
  }
};

export default {
  execute,
};
