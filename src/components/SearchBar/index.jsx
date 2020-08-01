import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './styles.css';
const SearchBar = ({
  header = null,
  placeholder,
  all,
  setFiltered,
  propName = null,
  scrollTo = null,
}) => {
  const [filterToApply, setFilterInput] = useState('');

  const scrollToSearchBar = e => {
    if (scrollTo) {
      const searchBarWrapperHeight = 100.844;
      const offsetTop =
        e.target.getBoundingClientRect().top +
        window.scrollY -
        searchBarWrapperHeight;

      window.scrollTo(0, offsetTop);
    }
  };

  useEffect(() => {
    if (filterToApply === '') {
      setFiltered(all);
    } else {
      if (!propName) {
        setFiltered(
          all.filter(each =>
            each.toLowerCase().includes(filterToApply.toLowerCase()),
          ),
        );
      } else {
        setFiltered(
          all.filter(each =>
            each[propName].toLowerCase().includes(filterToApply.toLowerCase()),
          ),
        );
      }
    }
  }, [filterToApply]);

  const handleFilterChange = e => {
    const newFilter = e.target.value;
    setFilterInput(newFilter);
  };

  const handleClear = () => {
    setFilterInput('');
  };

  return (
    <div className="search-bar-wrapper">
      {header && <h2 className="search-bar-title">{header}</h2>}
      <div className="search-bar-input-row">
        <span className="search-bar-icon">
          <FaSearch size="70%" />
        </span>
        <input
          className="search-bar-input"
          value={filterToApply}
          onChange={handleFilterChange}
          placeholder={placeholder}
          onClick={scrollToSearchBar}
        />
        {filterToApply.length > 0 && (
          <button className="clear-input-value" onClick={handleClear}>
            <FaTimes size="2rem" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
