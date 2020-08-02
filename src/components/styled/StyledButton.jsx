import styled from 'styled-components';

const StyledButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  gap: 5px;
  width: fit-content;
  min-width: 40px;
  height: 32px;
  padding: 8px;
  color: ${({ color }) => color || 'var(--secondary)'};
  background-color: ${({ bg }) => bg || 'var(--primary)'};
  font-size: 1.2rem;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  border: 2px var(--grayLight) solid;
  transition: all 0.4s ease-out;
  font-weight: 700;
  &:hover {
    letter-spacing: 2px;
    cursor: pointer;
  }
  span {
    display: flex;
  }
  @media (max-width: 450px) {
    font-size: 1rem;
  }
`;

export default StyledButton;
