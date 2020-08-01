import React, { useState, useEffect, useCallback } from 'react';
import StyledSection from '../components/styled/StyledSection';
import HighlightVideoPlayer from '../components/HighlightVideoPlayer';
import useWindowDimensions from '../components/hooks/windowDimensions';
import GetVideosService from '../services/GetVideosService';
import VideoCardCarousel from '../components/VideoCardCarousel';
import Shell from '../components/Shell';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';
import useOnMount from '../components/hooks/onMount';
import NoItemsFilter from '../components/NoItemsFilter';

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
  const [filteredList, setFilteredList] = useState([]);
  const [highlightedVideo, setHighlightedVideo] = useState(null);
  const { height } = useWindowDimensions();

  useOnMount(() => {
    GetVideosService.execute().then(response => {
      setVideosByCategoryList(response.data);
      setFilteredList(response.data);
    });
    setHighlightedVideo(getHighlightFromLocalStorage());
  });

  useEffect(() => {
    window.addEventListener('scroll', scrollPastHighlight, false);
  }, [shouldVideoPlay]);

  const scrollPastHighlight = useCallback(() => {
    if (window.scrollY > 0.4 * height && shouldVideoPlay === true) {
      window.removeEventListener('scroll', scrollPastHighlight);
      setShouldVideoPlay(false);
    } else if (window.scrollY <= 0.3 * height && shouldVideoPlay === false) {
      window.removeEventListener('scroll', scrollPastHighlight);
      setShouldVideoPlay(true);
    }
  }, [shouldVideoPlay, height]);

  const handleChangeHighlightedVideo = videoInfo => {
    if (highlightedVideo.videoId !== videoInfo.videoId) {
      setHighlightToLocalStorage(videoInfo);
      setHighlightedVideo(videoInfo);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      {(videosByCategoryList.length > 0 && (
        <>
          <StyledSection>
            {(highlightedVideo && (
              <HighlightVideoPlayer
                videoInfo={highlightedVideo}
                shouldVideoPlay={shouldVideoPlay}
              />
            )) || <Shell bg={'black'} />}
          </StyledSection>
          <StyledSection className="section-margin-top">
            <div className="category-section-container">
              <SearchBar
                scrollTo={true}
                header="Pesquisar por nome"
                placeholder="Naruto, Bleach, Shingeki no Kyojin..."
                all={videosByCategoryList}
                setFiltered={setFilteredList}
                propName={'category'}
              />
            </div>
            {(filteredList.length > 0 &&
              filteredList.map(({ category, videos }) => (
                <VideoCardCarousel
                  key={category}
                  category={category}
                  videoList={videos}
                  handleChangeHighlightedVideo={handleChangeHighlightedVideo}
                />
              ))) || (
              <div className="category-section-container">
                <NoItemsFilter />
              </div>
            )}
          </StyledSection>
        </>
      )) || <Loading />}
    </>
  );
};

export default Home;
