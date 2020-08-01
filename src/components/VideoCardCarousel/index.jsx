import React from 'react';
import './styles.css';
import VideoCard from './VideoCard';
import Slider from 'react-slick';
import carouselSettings from './carouselConfig';
import CustomSliderControls from '../CustomSliderControls';
import useWindowDimensions from '../hooks/windowDimensions';

const VideoCardCarousel = ({
  category,
  videoList,
  handleChangeHighlightedVideo,
}) => {
  const { width } = useWindowDimensions();
  const sliderRef = React.createRef();

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  const getSlidesToShow = () => {
    if (width > 1366) {
      return 4;
    } else if (width > 1024) {
      return 3;
    } else if (width > 600) {
      return 2;
    } else {
      return 1;
    }
  };

  const isSlideInfinite = getSlidesToShow() < videoList.length;

  return (
    <section className="video-category-section">
      <h2 className="category-section-title">{category}</h2>
      <Slider
        ref={sliderRef}
        {...carouselSettings}
        slidesToShow={getSlidesToShow()}
        infinite={isSlideInfinite}
        className="category-videos-list"
      >
        {videoList.map(video => (
          <li key={video.videoId}>
            <VideoCard
              handleChangeHighlightedVideo={handleChangeHighlightedVideo}
              videoInfo={video}
            />
          </li>
        ))}
      </Slider>
      {isSlideInfinite && (
        <CustomSliderControls next={handleNext} previous={handlePrevious} />
      )}
    </section>
  );
};

export default VideoCardCarousel;
