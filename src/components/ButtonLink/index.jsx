import React from 'react';
import StyledButton from '../styled/StyledButton.jsx';
import { Link } from 'react-router-dom';

const ButtonLink = ({ to, bgColor, color, children }) => {
  return (
    <StyledButton as={Link} to={to} bg={bgColor} color={color}>
      {children}
    </StyledButton>
  );
};

export default ButtonLink;
