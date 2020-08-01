import React from 'react';
import scaredChopper from '../../assets/scaredchopper.png';
import './styles.css';

const NoItemsFilter = () => {
  return (
    <div className="no-items-found">
      <p className="no-items-found-warning">
        Não há animes para essa pesquisa.
      </p>
      <img alt="scared chopper" src={scaredChopper} />
    </div>
  );
};

export default NoItemsFilter;
