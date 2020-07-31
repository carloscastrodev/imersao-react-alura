import React from 'react';
import './styles.css';
import { FaTimes } from 'react-icons/fa';

const Toast = ({ text, show, setShow, warning = false }) => {
  return (
    <div className={`toast-wrapper ${(show && 'show-toast') || 'hide-toast'}`}>
      <p className={`${(warning && 'toast-warning') || 'toast-success'} toast`}>
        {text}
      </p>
      <span className="close-button-wrapper">
        <button className="close-toast-button" onClick={() => setShow(false)}>
          <FaTimes size={'3rem'} />
        </button>
      </span>
    </div>
  );
};

export default Toast;
