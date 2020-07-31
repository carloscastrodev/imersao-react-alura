import React from 'react';
import StyledSection from '../styled/StyledSection';
import './styles.css';

const Loading = () => {
  return (
    <StyledSection>
      <div className="loading-slider loading-slider-left" />
      <div className="loading-slider loading-slider-right" />
    </StyledSection>
  );
};

export default Loading;
