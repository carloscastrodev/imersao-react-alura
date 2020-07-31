import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './styles.css';

const CustomSliderControls = ({ next, previous }) => {
  return (
    <div className="custom-slider-controls">
      <button className="slider-control previous-button" onClick={previous}>
        <IoIosArrowBack size={34} />
      </button>
      <button className="slider-control next-button" onClick={next}>
        <IoIosArrowForward size={34} />
      </button>
    </div>
  );
};

export default CustomSliderControls;
