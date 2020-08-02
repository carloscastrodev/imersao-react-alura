import React from 'react';
import './styles.css';
import Slider from 'react-slick';
import carouselSettings from './carouselConfig';
import CustomSliderControls from '../CustomSliderControls';
import useWindowDimensions from '../hooks/windowDimensions';
import CategoryNavCard from './CategoryNavCard';

const CategoryNavCarousel = ({
  categoriesData,
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
    } else if (width > 680) {
      return 3;
    } else if (width > 505) {
      return 2;
    } else {
      return 1;
    }
  };

  const isSlideInfinite = getSlidesToShow() < categoriesData.length;

  return (
    <nav className="categories-nav">
      <Slider
        ref={sliderRef}
        {...carouselSettings}
        slidesToShow={getSlidesToShow()}
        infinite={isSlideInfinite}
        className="categories-nav-list"
      >
        {categoriesData.map((category, index) => (
          <li key={AnimationEvent} data-index={index}>
            <CategoryNavCard
              handleChangeHighlightedCategory={handleChangeHighlightedCategory}
              categoryTitle={category.categoryTitle}
              highlightedCategory={highlightedCategory}
              thumbImgVideoId={category.thumbImgVideoId}
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
