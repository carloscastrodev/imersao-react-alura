import React from 'react';
import './styles.css';
import { FaTimes } from 'react-icons/fa';

const WarningToast = ({ warning, show, setShow }) => {
  return (
    <div className={`toast-wrapper ${(show && 'show-toast') || 'hide-toast'}`}>
      <p className="toast-warning">{warning}</p>
      <span className="close-button-wrapper">
        <button className="close-toast-button" onClick={() => setShow(false)}>
          <FaTimes size={'3rem'} />
        </button>
      </span>
    </div>
  );
};

export default WarningToast;
