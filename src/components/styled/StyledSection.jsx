import styled from 'styled-components';

const StyledSection = styled.section`
  position: relative;
  min-height: calc(100vh - var(--footerHeight));
  height: auto;
  padding: 0;
  width: 100%;
  background-image: url(${({ bgimg }) => bgimg || ''});
  background-repeat: no-repeat;
  background-size: min(40vw, 500px);
  background-position-y: 100%;
  background-position-x: 5vw;
  @media (max-width: 756px) {
    background-size: min(80vw, 40vh);
  }
`;

export default StyledSection;
