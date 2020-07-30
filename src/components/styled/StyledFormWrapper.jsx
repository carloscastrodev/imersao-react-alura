import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: absolute;
  top: calc(var(--headerHeight) + 1rem);
  right: 5vw;
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
  width: 55vw;

  @media (max-width: 756px) {
    width: 90vw;
  }
`;

const StyledFormTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  width: 100%;
  color: var(--grayLight);
`;

const StyledFormWrapper = ({ formTitle, children }) => {
  return (
    <StyledWrapper>
      <StyledFormTitle>{formTitle}</StyledFormTitle>
      {children}
    </StyledWrapper>
  );
};

export default StyledFormWrapper;
