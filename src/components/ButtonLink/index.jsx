import React from 'react';
import StyledLink from '../styled/StyledLink.jsx';

const ButtonLink = ({ to, bgColor, color, children }) => {
  return (
    <StyledLink to={to} bg={bgColor} color={color}>
      {children}
    </StyledLink>
  );
};

export default ButtonLink;
