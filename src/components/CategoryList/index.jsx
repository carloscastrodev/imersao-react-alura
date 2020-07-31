import React from 'react';
import CategoryItem from './CategoryItem';
import './styles.css';

const CategoryList = ({ categories, setCategory }) => {
  return (
    <div className="category-list-wrapper">
      <ul className="category-list">
        {categories.map(category => (
          <CategoryItem
            key={category}
            categoryName={category}
            setCategory={setCategory}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
