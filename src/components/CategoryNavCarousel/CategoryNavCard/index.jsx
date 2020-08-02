import React from 'react';
import './styles.css';

const CategoryNavCard = ({
  handleChangeHighlightedCategory,
  categoryTitle,
  highlightedCategory,
  thumbImgVideoId,
}) => {
  const isHighlighted = highlightedCategory === categoryTitle;

  const handleClickOnCard = () => {
    handleChangeHighlightedCategory(categoryTitle);
  };

  return (
    <button onClick={handleClickOnCard} className="category-card">
      <img
        alt="anime thumbnail"
        src={`https://img.youtube.com/vi/${thumbImgVideoId}/mqdefault.jpg`}
        className={`anime-thumbnail-img ${
          (isHighlighted && 'category-card-highlight') || 'category-card-normal'
        }`}
      />
      <h2 className="anime-title">{categoryTitle}</h2>
    </button>
  );
};

export default CategoryNavCard;
