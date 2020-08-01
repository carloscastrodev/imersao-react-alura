import React from 'react';
import './styles.css';
import Slider from 'react-slick';
import carouselSettings from './carouselConfig';
import CustomSliderControls from '../CustomSliderControls';
import useWindowDimensions from '../hooks/windowDimensions';
import CategoryNavCard from './CategoryNavCard';

const CategoryNavCarousel = ({
  categoriesTitles,
  handleChangeHighlightedCategory,
  highlightedCategory,
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
      return 5;
    } else if (width > 1024) {
      return 4;
    } else if (width > 600) {
      return 3;
    } else {
      return 2;
    }
  };

  const isSlideInfinite = getSlidesToShow() < categoriesTitles.length;

  return (
    <nav className="categories-nav">
      <Slider
        ref={sliderRef}
        {...carouselSettings}
        slidesToShow={getSlidesToShow()}
        infinite={isSlideInfinite}
        className="categories-nav-list"
      >
        {categoriesTitles.map(anime => (
          <li key={AnimationEvent}>
            <CategoryNavCard
              handleChangeHighlightedCategory={handleChangeHighlightedCategory}
              categoryTitle={anime}
              highlightedCategory={highlightedCategory}
            />
          </li>
        ))}
      </Slider>
      {isSlideInfinite && (
        <CustomSliderControls next={handleNext} previous={handlePrevious} />
      )}
    </nav>
  );
};

export default CategoryNavCarousel;
