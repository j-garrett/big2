import React, { PropTypes } from 'react';

const PlayerCard = ({ currentPlayer, player }) => (
  <div
    className={
      (currentPlayer === player ? 'flex-child player-card current-player' : 'flex-child player-card')
    }
  >
    <h3>{player}</h3>
  </div>
);


PlayerCard.propTypes = {
  currentPlayer: PropTypes.string,
  player: PropTypes.string,
};

export default PlayerCard;
