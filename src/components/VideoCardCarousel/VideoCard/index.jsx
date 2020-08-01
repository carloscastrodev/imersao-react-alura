import React, { useState, useEffect } from 'react';
import YTApiMessages from '../../../services/YTApiMessages';
import './styles.css';
import useWindowDimensions from '../../hooks/windowDimensions';
import useOnMount from '../../hooks/onMount';

const CarouselVideoCard = ({ videoInfo, handleChangeHighlightedVideo }) => {
  const { videoId, title } = videoInfo;
  const [isFocused, setIsFocused] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  let timeoutId = null;
  const previewRef = React.createRef();
  const cardRef = React.createRef();
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;

  useOnMount(() => {
    cardRef.current.addEventListener('mouseenter', setFocus, false);
    cardRef.current.addEventListener('mouseleave', setUnfocus, false);
  });

  useEffect(() => {
    if (previewRef.current) {
      if (shouldPlayVideo) {
        const playMessage = YTApiMessages.play();
        const { contentWindow } = previewRef.current;
        contentWindow.postMessage(playMessage, '*');
      }
    }
  }, [shouldPlayVideo]);

  const setFocus = () => {
    setIsFocused(true);
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        setShouldPlayVideo(true);
      }, 2000);
    }
  };

  const setUnfocus = () => {
    setIsFocused(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    setShouldPlayVideo(false);
  };

  const onCardClick = videoInfo => {
    handleChangeHighlightedVideo(videoInfo);
  };

  return (
    <div
      ref={cardRef}
      className="card-wrapper"
      onClick={() => {
        onCardClick(videoInfo);
      }}
      onMouseDown={e => e.preventDefault()}
    >
      <img
        alt="video thumbnail"
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        className={`video-card-image ${
          (!isMobile && shouldPlayVideo && 'no-opacity') || ''
        }`}
      />
      <div className="hide-overflow">
        <div
          className={`video-title-wrapper ${
            (isFocused && 'show-card-title') || 'hide-card-title'
          }
            ${(!isMobile && shouldPlayVideo && 'no-opacity') || ''}`}
        >
          <h2 className="card-title">{title}</h2>
        </div>
      </div>
      {!isMobile && isFocused && (
        <div className="preview-wrapper">
          <iframe
            ref={previewRef}
            title="preview-iframe"
            id="preview-iframe"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&start=0&disablekb=0&rel=0&modestbranding=1&autohide=1&controls=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            className={`yt-iframe-preview`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default CarouselVideoCard;
