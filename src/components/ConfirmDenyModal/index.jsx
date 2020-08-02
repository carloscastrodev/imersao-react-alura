import React from 'react';
import './styles.css';
import StyledButton from '../styled/StyledButton';
import { TiInputCheckedOutline, TiTimesOutline } from 'react-icons/ti';

const ConfirmDenyModal = ({ yesCallback, noCallback }) => {
  return (
    <div className="confirm-delete-wrapper">
      <h2 className="confirmation-warning">Você tem certeza disso?</h2>
      <div className="options-wrapper">
        <StyledButton className="option-yes" onClick={yesCallback}>
          <span role="img" aria-label="V de sim">
            <TiInputCheckedOutline size={'1.5rem'} />
          </span>
          <p>Sim</p>
        </StyledButton>
        <StyledButton className="option-no" onClick={noCallback}>
          <span role="img" aria-label="X de não">
            <TiTimesOutline size={'1.5rem'} />
          </span>
          <p>Não</p>
        </StyledButton>
      </div>
    </div>
  );
};

export default ConfirmDenyModal;
