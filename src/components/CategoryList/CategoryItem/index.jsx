import React from 'react';
import './styles.css';
import { FaCheck } from 'react-icons/fa';

const CategoryItem = ({ categoryName, setCategory }) => {
  return (
    <li className="category-item">
      <button
        className="choose-category-button"
        onClick={() => setCategory(categoryName)}
      >
        <span className="category-title-wrapper">
          <h2 className="category-title">{categoryName}</h2>
        </span>
        <span className="icon-wrapper">
          <FaCheck size={'1.5rem'} />
        </span>
      </button>
    </li>
  );
};

export default CategoryItem;
