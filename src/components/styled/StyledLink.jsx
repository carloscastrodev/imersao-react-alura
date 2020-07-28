import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: fit-content;
  height: 32px;
  padding: 8px;
  color: ${({ color }) => color || 'var(--secondary)'};
  background-color: ${({ bg }) => bg || 'var(--primary)'};
  font-size: 1.2rem;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  transition: all 0.4s ease-out;
  font-weight: 700;
  &:hover {
    letter-spacing: 2px;
  }
  span {
    display: flex;
  }
`;

export default StyledLink;
