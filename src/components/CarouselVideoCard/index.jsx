import React from 'react';
import './styles.css';

const CarouselVideoCard = ({ videoInfo, handleChangeHighlightedVideo }) => {
  const { videoId } = videoInfo;

  const onCardClick = videoInfo => {
    handleChangeHighlightedVideo(videoInfo);
  };

  return (
    <div className="card-wrapper" onClick={() => onCardClick(videoInfo)}>
      <img
        alt="video thumbnail"
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        className="video-card-image"
      />
    </div>
  );
};

export default CarouselVideoCard;
