import React from 'react';
import VideoVerticalCard from './VideoVerticalCard';
import './styles.css';

const VerticalCardSlider = ({
  videos,
  highlightedCategory,
  highlightedVideo,
  setHighlightedVideo,
}) => {
  return (
    <aside className="vertical-card-slider">
      <h2 className="slider-header-title">Anime: {highlightedCategory}</h2>
      <ul className="vertical-card-list">
        {videos.map((video, index) => (
          <li
            className="vertical-card-wrapper"
            key={video.id}
            data-index={index}
          >
            <VideoVerticalCard
              video={video}
              highlightedVideo={highlightedVideo}
              setHighlightedVideo={setHighlightedVideo}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default VerticalCardSlider;
