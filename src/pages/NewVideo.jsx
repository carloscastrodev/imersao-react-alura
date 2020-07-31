import React from 'react';
import UploadForm from '../components/UploadForm';
import StyledSection from '../components/styled/StyledSection';
import bgchopper from '../assets/upload-chopper.png';
import StyledFormWrapper from '../components/styled/StyledFormWrapper';

const uploadFields = [
  { placeholder: 'Categoria do Vídeo', required: true, dbKey: 'category' },
  {
    placeholder: 'ID do Vídeo',
    required: true,
    dbKey: 'videoId',
    pattern: '^[a-z0-9_-]{11}$',
    warningText: 'ID do vídeo precisa ter 11 caractéres',
  },
  { placeholder: 'Título do Vídeo', required: true, dbKey: 'title' },
];

const NewVideo = () => {
  return (
    <StyledSection className="section-header-padding" bgimg={bgchopper}>
      <StyledFormWrapper formTitle={'Cadastrar Novo Vídeo'}>
        <UploadForm fields={uploadFields} />
      </StyledFormWrapper>
    </StyledSection>
  );
};

export default NewVideo;
