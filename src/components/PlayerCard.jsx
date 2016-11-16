import React, { PropTypes } from 'react';

const PlayerCard = ({ player }) => (
  <div>
    <h1>{player}</h1>
  </div>
);


PlayerCard.propTypes = {
  player: PropTypes.string,
};

export default PlayerCard;
