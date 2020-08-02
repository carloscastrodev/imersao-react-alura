import React from 'react';
import './styles.css';
import manageChopper from '../../assets/manage-chopper.png';

const ChoiceNotMade = ({ text }) => {
  return (
    <div className="please-pick-one">
      <p className="no-choice-warning">{text}</p>
      <img alt="scared chopper" src={manageChopper} />
    </div>
  );
};

export default ChoiceNotMade;
