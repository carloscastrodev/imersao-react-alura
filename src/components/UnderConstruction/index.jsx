import React, { useState } from 'react';
import './styles.css';
import StyledSection from '../styled/StyledSection';
import ButtonLink from '../ButtonLink';
import { FaArrowLeft } from 'react-icons/fa';
import useOnMount from '../hooks/onMount';

const UnderConstruction = ({ customText }) => {
  const [imageToRender, setImageToRender] = useState('');

  useOnMount(() => {
    const imgNumber = Math.round(3 * Math.random());
    switch (imgNumber) {
      case 0:
        import('../../assets/choppersvg.png').then(img =>
          setImageToRender(img.default),
        );
        break;
      case 1:
        import('../../assets/choppersvg1.png').then(img =>
          setImageToRender(img.default),
        );
        break;
      case 2:
        import('../../assets/choppersvg2.png').then(img =>
          setImageToRender(img.default),
        );
        break;
      default:
        import('../../assets/choppersvg3.png').then(img =>
          setImageToRender(img.default),
        );
        break;
    }
  });

  return (
    <StyledSection firstSection={true} className="column-flex center">
      <p className="under-construction-warning">
        {customText
          ? customText
          : 'Essa página não existe ou ainda está sendo construida.'}
      </p>
      <ButtonLink to={'/'}>
        <span role="img" aria-label="Flecha p/ esquerda">
          <FaArrowLeft />
        </span>
        Voltar
      </ButtonLink>
      <div className="image-wrapper">
        {(imageToRender && (
          <img
            alt="Tony Tony Chopper"
            src={imageToRender}
            className="aside-image"
          />
        )) || <div />}
      </div>
    </StyledSection>
  );
};

export default UnderConstruction;
