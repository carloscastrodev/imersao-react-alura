import React from 'react';
import './styles.css';

const VideoVerticalCard = ({
  video,
  highlightedVideo,
  setHighlightedVideo,
}) => {
  const { videoId, title } = video;
  const isHighlighted = highlightedVideo
    ? highlightedVideo.videoId === videoId
    : false;

  const handleClickOnCard = () => {
    setHighlightedVideo(video);
  };

  return (
    <button className="vertical-card-item" onClick={handleClickOnCard}>
      <img
        alt="video thumbnail"
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        className={`vertical-card-img ${
          (isHighlighted && 'vertical-card-highlight') || 'vertical-card-normal'
        }`}
      />
      <h2 className="video-title">{title}</h2>
    </button>
  );
};

export default VideoVerticalCard;
