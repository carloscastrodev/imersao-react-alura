import React, { useState } from 'react';
import './styles.css';
import useOnMount from '../../hooks/onMount';
import GetVideoIdService from '../../../services/GetVideoIdService';

const CategoryNavCard = ({
  handleChangeHighlightedCategory,
  categoryTitle,
  highlightedCategory,
}) => {
  const [videoId, setVideoId] = useState(null);
  const isHighlighted = highlightedCategory === categoryTitle;

  useOnMount(() => {
    GetVideoIdService.execute({ categoryTitle }).then(response => {
      setVideoId(response);
    });
  });
  const handleClickOnCard = () => {
    handleChangeHighlightedCategory(categoryTitle);
  };

  return (
    <button onClick={handleClickOnCard} className="category-card">
      {videoId && (
        <img
          alt="anime thumbnail"
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          className={`anime-thumbnail-img ${
            (isHighlighted && 'category-card-highlight') ||
            'category-card-normal'
          }`}
        />
      )}
      <h2 className="anime-title">{categoryTitle}</h2>
    </button>
  );
};

export default CategoryNavCard;
