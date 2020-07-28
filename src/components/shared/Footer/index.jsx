import React from 'react';
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import './styles.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <article className="alura-credits">
        Desenvolvido durante a{' '}
        <span className="link-wrapper">
          <a
            href="https://www.alura.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="outer-link"
          >
            Imersão React da Alura
          </a>
        </span>
      </article>
      <article className="social-links">
        <ul className="social-links-list">
          <li className="social-links-item">
            <a
              href="https://github.com/AdmiralChopper"
              target="_blank"
              rel="noopener noreferrer"
              className="outer-link"
            >
              <FaGithubSquare size={'2.5rem'} />
            </a>
          </li>
          <li className="social-links-item">
            <a
              href="https://www.linkedin.com/in/carlos-castro-6623581a8/"
              target="_blank"
              rel="noopener noreferrer"
              className="outer-link"
            >
              <FaLinkedin size={'2.5rem'} />
            </a>
          </li>
        </ul>
      </article>
    </footer>
  );
};

export default Footer;
