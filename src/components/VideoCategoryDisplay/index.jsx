import React from 'react';
import './styles.css';
import CarouselVideoCard from '../CarouselVideoCard';

const VideoCategoryDisplay = ({
  category,
  videoList,
  handleChangeHighlightedVideo,
}) => {
  return (
    <section id={`${category}-section`} className="video-category-section">
      <h2 className="category-title">{category}</h2>
      <ul className="category-videos-list scroll-carousel">
        {videoList.map(video => (
          <li key={video.videoId}>
            <CarouselVideoCard
              handleChangeHighlightedVideo={handleChangeHighlightedVideo}
              videoInfo={video}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VideoCategoryDisplay;
