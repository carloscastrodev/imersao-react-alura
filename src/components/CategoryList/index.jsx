import React, { useState } from 'react';
import CategoryItem from './CategoryItem';
import SearchBar from '../SearchBar';
import useOnMount from '../hooks/onMount';
import './styles.css';
import NoItemsFilter from '../NoItemsFilter';

const CategoryList = ({ categories, setCategory }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);

  useOnMount(() => {
    setFilteredCategories(categories);
  });

  return (
    <div className="category-list-wrapper">
      <ul className="category-list">
        <div className="search-bar">
          {' '}
          <SearchBar
            placeholder="Nome do Anime"
            all={categories}
            setFiltered={setFilteredCategories}
          />
        </div>
        {(filteredCategories.length > 0 &&
          filteredCategories.map(category => (
            <CategoryItem
              key={category}
              categoryName={category}
              setCategory={setCategory}
            />
          ))) || <NoItemsFilter />}
      </ul>
    </div>
  );
};

export default CategoryList;
