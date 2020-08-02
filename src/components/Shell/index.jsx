import React from 'react';
import styled from 'styled-components';

const Shell = ({ bg }) => {
  const StyledShell = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${({ bg }) => bg || 'black'};
    animation: pulsate 0.5s infinite;

    @keyframes pulsate {
      from {
        opacity: 1;
      }
      to {
        opacity: 0.1;
        background-color: rgba(40, 40, 40, 0.5);
      }
    }
  `;
  return <StyledShell bg={bg} />;
};

export default Shell;
