import styled from 'styled-components';

const StyledSection = styled.section`
  min-height: fit-content;
  min-height: calc(100vh - var(--footerHeight));
  height: fit-content;
  padding-top: ${({ firstSection }) => (firstSection && '0') || '1%'};
  padding-left: ${({ firstSection }) => (firstSection && '0') || '5%'};
  padding-right: ${({ firstSection }) => (firstSection && '0') || '5%'};
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0;
  }
`;

export default StyledSection;
