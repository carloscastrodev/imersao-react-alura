import React, { useState } from 'react';
import StyledSection from '../components/styled/StyledSection';
import GetVideosService from '../services/GetVideosService';
import Loading from '../components/Loading';
import useOnMount from '../components/hooks/onMount';
import CategoryNavCarousel from '../components/CategoryNavCarousel';

const Manage = () => {
  const [videosByCategoryList, setVideosByCategoryList] = useState([]);
  const [chosenCategoryVideos, setChosenCategoryVideos] = useState([]);
  const [categoriesTitles, setCategoriesTitles] = useState([]);
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const [highlightedVideo, setHighlightedVideo] = useState(null);

  useOnMount(() => {
    GetVideosService.execute().then(response => {
      setVideosByCategoryList(response.data);
      setCategoriesTitles(
        response.data.map(categoryEntry => categoryEntry.category),
      );
    });
  });

  const handleChangeHighlightedVideo = videoInfo => {
    if (highlightedVideo.videoId !== videoInfo.videoId) {
      setHighlightedVideo(videoInfo);
    }
  };

  const handleChangeHighlightedCategory = category => {
    if (highlightedCategory !== category) {
      setHighlightedCategory(category);
    }
  };

  return (
    <>
      {(videosByCategoryList.length > 0 && (
        <div className="manage-page-container">
          <StyledSection className="section-header-padding">
            <CategoryNavCarousel
              categoriesTitles={categoriesTitles}
              handleChangeHighlightedCategory={handleChangeHighlightedCategory}
              highlightedCategory={highlightedCategory}
            />
          </StyledSection>
        </div>
      )) || <Loading />}
    </>
  );
};

export default Manage;
