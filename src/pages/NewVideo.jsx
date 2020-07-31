import React from 'react';
import UploadForm from '../components/UploadForm';
import StyledSection from '../components/styled/StyledSection';
import bgchopper from '../assets/upload-chopper.png';
import StyledFormWrapper from '../components/styled/StyledFormWrapper';
import CreateVideoService from '../services/CreateVideoService';

const uploadFields = [
  { placeholder: 'Nome do Anime', required: true, dbKey: 'category' },
  {
    placeholder: 'ID do Vídeo',
    required: true,
    dbKey: 'videoId',
    pattern: '^[a-zA-Z0-9_-]{11}$',
    warningText: 'ID do vídeo precisa ter 11 caractéres',
  },
  { placeholder: 'Título do Vídeo', required: true, dbKey: 'title' },
];

const createNewVideo = async ({ videoData }) => {
  const test = await CreateVideoService.execute({ videoData });
  return test;
};

const NewVideo = () => {
  return (
    <StyledSection className="section-header-padding" bgimg={bgchopper}>
      <StyledFormWrapper formTitle={'Cadastrar Novo Vídeo'}>
        <UploadForm fields={uploadFields} submitCallback={createNewVideo} />
      </StyledFormWrapper>
    </StyledSection>
  );
};

export default NewVideo;
