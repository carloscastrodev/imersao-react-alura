import React, { useState } from 'react';
import './styles.css';
import { MdDeleteForever } from 'react-icons/md';
import StyledButton from '../../styled/StyledButton';
import { FaSpinner } from 'react-icons/fa';
import Modal from '../../Modal';
import ConfirmDenyModal from '../../ConfirmDenyModal';
const ManageVideoAppendix = ({ videoInfo, deleteVideoCallback }) => {
  const [responseLoading, setResponseLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    setShowDeleteModal(false);
    setResponseLoading(true);
    await deleteVideoCallback({ videoData: videoInfo });
    setResponseLoading(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <article className="fluid-iframe-appendix">
        <h2>{videoInfo.title}</h2>
        <StyledButton
          color="#AA1010"
          className="delete-video-button"
          onClick={() => setShowDeleteModal(true)}
          disabled={responseLoading}
        >
          {(!responseLoading && (
            <>
              <span
                className="delete-button-icon"
                htmlFor="img"
                aria-label="Botão de deletar"
              >
                <MdDeleteForever size="2rem" />
              </span>
              <p>DELETAR VÍDEO</p>
            </>
          )) || (
            <span className="spinner" htmlFor="img" aria-label="carregando">
              <FaSpinner size="2rem" />
            </span>
          )}
        </StyledButton>
      </article>
      {showDeleteModal && (
        <Modal handleClose={handleCloseDeleteModal}>
          <ConfirmDenyModal
            yesCallback={handleDelete}
            noCallback={handleCloseDeleteModal}
          />
        </Modal>
      )}
    </>
  );
};

export default ManageVideoAppendix;
