import React, { PropTypes } from 'react';

const PlayerCard = ({ currentPlayer, player }) => (
  <div>
    <h3 className={(currentPlayer === player ? 'currentPlayer' : '')}>{player}</h3>
  </div>
);


PlayerCard.propTypes = {
  currentPlayer: PropTypes.string,
  player: PropTypes.string,
};

export default PlayerCard;
