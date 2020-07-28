import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import logo from '../../../assets/logo.png';
import './styles.css';
import { Link } from 'react-router-dom';
import ButtonLink from '../../ButtonLink';

const Header = () => {
  const [noHeaderBackground, setNoHeaderBackground] = useState(true);
  const [headerHidden, setHeaderHidden] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', changeHeaderBackground, false);
  }, []);

  const changeHeaderBackground = () => {
    if (window.scrollY > 0) {
      setNoHeaderBackground(false);
    } else {
      setNoHeaderBackground(true);
    }
  };

  const handleHideHeader = () => {
    setHeaderHidden(!headerHidden);
  };

  return (
    <>
      <header
        className={`page-header ${
          (noHeaderBackground && 'no-header-background') || 'header-background'
        } ${(headerHidden && 'header-hidden') || ''}
        }`}
      >
        <nav className="main-navbar">
          <Link className="nav-logo-link" to="/">
            <img alt="chopperflix logo" className="nav-logo" src={logo} />
          </Link>
          <ButtonLink to="/newvideo">
            <span role="img" aria-label="Sinal de mais">
              <FaPlus size={'1.2rem'} />
            </span>
            <p>UPLOAD</p>
          </ButtonLink>
        </nav>
      </header>
      <button onClick={handleHideHeader} className="hide-header-button">
        {(!headerHidden && (
          <IoIosArrowUp className="up-arrow" size={'2rem'} />
        )) || <IoIosArrowDown className="down-arrow" size={'2rem'} />}
      </button>
    </>
  );
};

export default Header;
