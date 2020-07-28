import styled from 'styled-components';

const StyledSection = styled.section`
  min-height: calc(100vh - var(--footerHeight));
  height: auto;
  padding-top: ${({ firstSection }) => (firstSection && '0') || '1vh'};
  padding-left: ${({ firstSection }) => (firstSection && '0') || '2vw'};
  padding-right: ${({ firstSection }) => (firstSection && '0') || '2vw'};
  margin-bottom: ${({ firstSection }) => (firstSection && '3rem') || '2vw'};
  width: 100%;
`;

export default StyledSection;
