import React, { useEffect, useState, useRef } from 'react';
import UploadForm from '../components/UploadForm';
import StyledSection from '../components/styled/StyledSection';
import bgchopper from '../assets/upload-chopper.png';
import StyledFormWrapper from '../components/styled/StyledFormWrapper';
import CreateVideoService from '../services/CreateVideoService';
import GetCategoriesNamesService from '../services/GetCategoriesNamesService';
import Loading from '../components/Loading';
import Toast from '../components/Toast';

const uploadFields = [
  {
    placeholder: 'Nome do Anime*',
    required: true,
    dbKey: 'category',
    primary: true,
  },
  {
    placeholder: 'ID do Vídeo*',
    required: true,
    dbKey: 'videoId',
    pattern: '^[a-zA-Z0-9_-]{11}$',
    warningText: 'Esse não parece ser um ID de vídeo válido 🤔',
  },
  { placeholder: 'Título do Vídeo*', required: true, dbKey: 'title' },
];

const NewVideo = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  let timeoutId = useRef();

  useEffect(() => {
    if (errorMessage !== '') {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
      setShowErrorToast(true);
      timeoutId.current = setTimeout(() => {
        setErrorMessage('');
        setShowErrorToast(false);
      }, 4000);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage !== '') {
      if (timeoutId) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
      setShowSuccessToast(true);
      timeoutId.current = setTimeout(() => {
        setSuccessMessage('');
        setShowSuccessToast(false);
      }, 4000);
    }
  }, [successMessage]);

  const handleCloseSuccessToast = () => {
    setShowSuccessToast(false);
    setSuccessMessage('');
  };

  const handleCloseErrorToast = () => {
    setShowErrorToast(false);
    setErrorMessage('');
  };

  const createNewVideo = async ({ videoData }) => {
    const { isNewCategory, responseInfo } = await CreateVideoService.execute({
      videoData,
    });
    const responseStatus = responseInfo.status;

    if (responseStatus < 200 || responseStatus >= 300) {
      const failure = false;
      if (responseStatus === 409) {
        setErrorMessage('Vídeo já cadastrado.');
      } else {
        setErrorMessage('Não foi possível cadastrar o vídeo.');
      }
      return failure;
    } else if (responseStatus >= 200 && responseStatus < 300) {
      const success = true;
      setSuccessMessage('Vídeo cadastrado com sucesso');
      if (isNewCategory) {
        const categoryTitle = responseInfo.data.category;
        setAllCategories([...allCategories, categoryTitle]);
      }
      return success;
    }
  };

  useEffect(() => {
    GetCategoriesNamesService.execute().then(response => {
      setAllCategories(response);
    });
  }, []);

  return (
    <>
      {(allCategories.length > 0 && (
        <StyledSection className="section-header-padding" bgimg={bgchopper}>
          <StyledFormWrapper formTitle={'Cadastrar Novo Vídeo'}>
            <UploadForm
              fields={uploadFields}
              submitCallback={createNewVideo}
              categoriesTitles={allCategories}
            />
          </StyledFormWrapper>
          {showSuccessToast && (
            <Toast
              text={successMessage}
              show={showSuccessToast}
              setShow={handleCloseSuccessToast}
            />
          )}
          {showErrorToast && (
            <Toast
              text={errorMessage}
              show={showErrorToast}
              setShow={handleCloseErrorToast}
              warning={true}
            />
          )}
        </StyledSection>
      )) || <Loading />}
    </>
  );
};

export default NewVideo;
