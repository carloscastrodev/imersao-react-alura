import React from 'react';
import styled from 'styled-components';

const Shell = ({ bg }) => {
  const StyledShell = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${({ bg }) => bg || 'black'};
  `;
  return <StyledShell bg={bg} />;
};

export default Shell;
