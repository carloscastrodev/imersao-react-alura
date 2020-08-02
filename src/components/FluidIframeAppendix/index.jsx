import React from 'react';
import styled from 'styled-components';

const StyledAppendix = styled.div`
  position: absolute;
  top: ${({ t }) => `${t + 15}px` || 0};
  width: ${({ w }) => `${w}px` || '100%'};
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

const FluidIframeAppendix = ({ iframeHeight, iframeWidth, children }) => {
  return (
    <StyledAppendix
      t={iframeHeight > 300 ? iframeHeight : 300}
      w={iframeWidth > 400 ? iframeWidth : 400}
    >
      {children}
    </StyledAppendix>
  );
};

export default FluidIframeAppendix;
