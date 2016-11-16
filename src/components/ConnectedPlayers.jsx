import React, { PropTypes } from 'react';

import PlayerCard from './PlayerCard';

const ConnectedPlayers = ({
  connectedPlayers,
  room,
}) => (
  <div>
    <h3>You are in the {room} room!</h3>
    {connectedPlayers.map(player => (
      <PlayerCard
        player={player}
      />
      )
    )}
  </div>
);


ConnectedPlayers.propTypes = {
  connectedPlayers: PropTypes.array,
  room: PropTypes.string,
};

export default ConnectedPlayers;
