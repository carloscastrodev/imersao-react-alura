import React from 'react';
import './styles.css';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ children, handleClose }) => {
  return (
    <div className="modal-overlay">
      <div className="content-wrapper">
        <button onClick={handleClose} className="close-modal-button">
          <FaTimes size={'2.5rem'} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
