import React, { PropTypes } from 'react';

const PlayerCard = ({ player }) => (
  <div>
    <h3>{player}</h3>
  </div>
);


PlayerCard.propTypes = {
  player: PropTypes.string,
};

export default PlayerCard;
