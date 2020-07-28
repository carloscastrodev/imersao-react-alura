import React, { useState, useEffect } from 'react';
import StyledSection from '../components/styled/StyledSection';
import HighlightVideoPlayer from '../components/HighlightVideoPlayer';
import useWindowDimensions from '../components/hooks/windowDimensions';
import GetVideosService from '../services/GetVideosService';
import VideoCategoryDisplay from '../components/VideoCategoryDisplay';

const Home = () => {
  const getHighlightFromLocalStorage = () => {
    const videoInfo = JSON.parse(localStorage.getItem('chopperflix-hlvideo'));
    if (!videoInfo) {
      const videoInfo = {
        videoId: 'kIfNZcCw4EI',
        videoTitle: 'One Piece AMV - Illusion (Chopper story)',
      };
      setHighlightToLocalStorage(videoInfo);
    }
    return videoInfo;
  };

  const setHighlightToLocalStorage = videoInfo => {
    const stringified = JSON.stringify(videoInfo);
    localStorage.setItem('chopperflix-hlvideo', stringified);
  };

  const [shouldVideoPlay, setShouldVideoPlay] = useState(true);
  const [videosByCategoryList, setVideosByCategoryList] = useState([]);
  const [currentHighlightedVideo, setCurrentHighlightedVideo] = useState(
    getHighlightFromLocalStorage(),
  );
  const { height } = useWindowDimensions();

  useEffect(() => {
    const videosByCategory = GetVideosService.execute();
    setVideosByCategoryList(videosByCategory);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scrollPastHighlight, false);
  }, [shouldVideoPlay]);

  const scrollPastHighlight = () => {
    if (window.scrollY > 0.4 * height && shouldVideoPlay === true) {
      window.removeEventListener('scroll', scrollPastHighlight);
      setShouldVideoPlay(false);
    } else if (window.scrollY <= 0.3 * height && shouldVideoPlay === false) {
      window.removeEventListener('scroll', scrollPastHighlight);
      setShouldVideoPlay(true);
    }
  };

  const handleChangeHighlightedVideo = videoInfo => {
    console.log(videoInfo);
    if (currentHighlightedVideo.videoId !== videoInfo.videoId) {
      setHighlightToLocalStorage(videoInfo);
      setCurrentHighlightedVideo(videoInfo);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <StyledSection firstSection={true}>
        <HighlightVideoPlayer
          videoInfo={currentHighlightedVideo}
          shouldVideoPlay={shouldVideoPlay}
        />
      </StyledSection>
      <StyledSection>
        {videosByCategoryList.map(({ category, videos }) => (
          <VideoCategoryDisplay
            key={category}
            category={category}
            videoList={videos}
            handleChangeHighlightedVideo={handleChangeHighlightedVideo}
          />
        ))}
      </StyledSection>
    </>
  );
};

export default Home;
