import React from 'react';
import './styles.css';
import CarouselVideoCard from '../CarouselVideoCard';
import Slider from 'react-slick';
import carouselSettings from './carouselConfig';
import CustomSliderControls from '../CustomSliderControls';
import useWindowDimensions from '../hooks/windowDimensions';

const VideoCategoryDisplay = ({
  category,
  videoList,
  handleChangeHighlightedVideo,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const sliderRef = React.createRef();

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <section className="video-category-section">
      <h2 className="category-title">{category}</h2>
      <Slider
        ref={sliderRef}
        {...carouselSettings}
        className="category-videos-list"
      >
        {videoList.map(video => (
          <li key={video.videoId}>
            <CarouselVideoCard
              handleChangeHighlightedVideo={handleChangeHighlightedVideo}
              videoInfo={video}
            />
          </li>
        ))}
      </Slider>
      <CustomSliderControls next={handleNext} previous={handlePrevious} />
    </section>
  );
};

export default VideoCategoryDisplay;
