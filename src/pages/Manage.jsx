import React, { useState, useEffect, useRef } from 'react';
import StyledSection from '../components/styled/StyledSection';
import GetVideosService from '../services/GetVideosService';
import Loading from '../components/Loading';
import CategoryNavCarousel from '../components/CategoryNavCarousel';
import VerticalCardSlider from '../components/VideoVerticalSlider';
import ChoiceNotMade from '../components/ChoiceNotMade';
import ManageVideoHighlight from '../components/ManageVideoHighlight';
import DeleteVideoService from '../services/DeleteVideoService';
import Toast from '../components/Toast';
import useOnMount from '../components/hooks/onMount';
import UnderConstruction from '../components/UnderConstruction';
import useWindowDimensions from '../components/hooks/windowDimensions';

const Manage = () => {
  const [videosByCategoryList, setVideosByCategoryList] = useState([]);
  const [chosenCategoryVideos, setChosenCategoryVideos] = useState([]);
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const [highlightedVideo, setHighlightedVideo] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [categoriesData, setCategoriesData] = useState([]);
  const { width, height } = useWindowDimensions();
  let timeoutId = useRef();

  useOnMount(() => {
    GetVideosService.execute().then(response => {
      setVideosByCategoryList(response.data);
      setCategoriesData(
        response.data.map(categoryEntry => {
          return {
            categoryTitle: categoryEntry.category,
            thumbImgVideoId: categoryEntry.videos[0].videoId,
          };
        }),
      );
    });
  });

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

  const handleChangeHighlightedVideo = videoInfo => {
    if (highlightedVideo) {
      if (highlightedVideo.videoId !== videoInfo.videoId) {
        setHighlightedVideo(videoInfo);
      }
    } else {
      setHighlightedVideo(videoInfo);
    }
  };

  const handleChangeHighlightedCategory = category => {
    if (highlightedCategory !== category) {
      const videosToShowArray = videosByCategoryList.filter(
        categoryEntry => categoryEntry.category === category,
      );
      const { videos } = videosToShowArray[0];
      setChosenCategoryVideos(videos);
      setHighlightedCategory(category);
      setHighlightedVideo(null);
    }
  };

  const handleCloseSuccessToast = () => {
    setShowSuccessToast(false);
    setSuccessMessage('');
  };

  const handleCloseErrorToast = () => {
    setShowErrorToast(false);
    setErrorMessage('');
  };

  const deleteVideo = async ({ videoData }) => {
    const {
      status,
      videos,
      deletedCategoryTitle,
    } = await DeleteVideoService.execute({
      videoData,
      categoryTitle: highlightedCategory,
    });

    if (status < 200 || status >= 300) {
      const failure = false;
      setErrorMessage('Ocorreu um erro, tente novamente depois 😢.');
      return failure;
    } else if (status >= 200 && status < 300) {
      const success = true;
      setHighlightedVideo(null);
      setChosenCategoryVideos(videos);
      if (status !== 207) {
        setSuccessMessage('Vídeo deletado com sucesso.');
      } else {
        if (deletedCategoryTitle) {
          const newCategoriesData = categoriesData.filter(
            category => category.categoryTitle !== deletedCategoryTitle,
          );
          setHighlightedCategory(null);
          setCategoriesData(newCategoriesData);
        }
        setSuccessMessage('Categoria removida na deleção do último vídeo.');
      }

      return success;
    }
  };

  return (
    <>
      {((width < 800 || height < 760) && (
        <UnderConstruction customText="Essa página não é otimizada para a sua tela 😢" />
      )) || (
        <>
          {(videosByCategoryList.length > 0 && (
            <div className="manage-page-container">
              <StyledSection className="section-header-padding full-view-section flex">
                {(chosenCategoryVideos.length > 0 && (
                  <VerticalCardSlider
                    videos={chosenCategoryVideos}
                    highlightedCategory={highlightedCategory}
                    highlightedVideo={highlightedVideo}
                    setHighlightedVideo={handleChangeHighlightedVideo}
                  />
                )) || <ChoiceNotMade text="Escolha um anime abaixo" />}
                {(highlightedVideo && (
                  <ManageVideoHighlight
                    highlightedVideo={highlightedVideo}
                    deleteVideoCallback={deleteVideo}
                  />
                )) ||
                  (highlightedCategory && (
                    <ChoiceNotMade text="Escolha um AMV ao lado" />
                  ))}
                <CategoryNavCarousel
                  categoriesData={categoriesData}
                  handleChangeHighlightedCategory={
                    handleChangeHighlightedCategory
                  }
                  highlightedCategory={highlightedCategory}
                />
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
            </div>
          )) || <Loading />}
        </>
      )}
    </>
  );
};

export default Manage;
