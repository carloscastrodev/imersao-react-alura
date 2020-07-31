import React, { useState, useEffect } from 'react';
import StyledSection from '../components/styled/StyledSection';
import HighlightVideoPlayer from '../components/HighlightVideoPlayer';
import useWindowDimensions from '../components/hooks/windowDimensions';
import GetVideosService from '../services/GetVideosService';
import VideoCategoryDisplay from '../components/VideoCategoryDisplay';
import Shell from '../components/Shell';
import Loading from '../components/Loading';

const Home = () => {
  const getHighlightFromLocalStorage = () => {
    const videoInfo = JSON.parse(localStorage.getItem('chopperflix-hlvideo'));
    if (!videoInfo) {
      const defaultVideo = {
        videoId: 'kIfNZcCw4EI',
        videoTitle: 'One Piece AMV - Illusion (Chopper story)',
      };
      setHighlightToLocalStorage(defaultVideo);
      return defaultVideo;
    }
    return videoInfo;
  };

  const setHighlightToLocalStorage = videoInfo => {
    const stringified = JSON.stringify(videoInfo);
    localStorage.setItem('chopperflix-hlvideo', stringified);
  };

  const [shouldVideoPlay, setShouldVideoPlay] = useState(true);
  const [videosByCategoryList, setVideosByCategoryList] = useState([]);
  const [currentHighlightedVideo, setCurrentHighlightedVideo] = useState(null);
  const { height } = useWindowDimensions();

  useEffect(() => {
    GetVideosService.execute().then(response =>
      setVideosByCategoryList(response.data),
    );
    setCurrentHighlightedVideo(getHighlightFromLocalStorage());
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
    if (currentHighlightedVideo.videoId !== videoInfo.videoId) {
      setHighlightToLocalStorage(videoInfo);
      setCurrentHighlightedVideo(videoInfo);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      {(videosByCategoryList.length > 0 && (
        <>
          <StyledSection>
            {(currentHighlightedVideo && (
              <HighlightVideoPlayer
                videoInfo={currentHighlightedVideo}
                shouldVideoPlay={shouldVideoPlay}
              />
            )) || <Shell bg={'black'} />}
          </StyledSection>
          <StyledSection className="section-margin-top">
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
      )) || <Loading />}
    </>
  );
};

export default Home;
