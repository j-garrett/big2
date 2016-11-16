import React, { PropTypes } from 'react';

import PlayerCard from './PlayerCard';

const ConnectedPlayers = ({ players, room }) => (
  <div>
    <h3>You are in the {room} room!</h3>
    {players.map(player => (
      <PlayerCard
        key={player}
        player={player}
      />
      )
    )}
  </div>
);


ConnectedPlayers.propTypes = {
  players: PropTypes.array,
  room: PropTypes.string,
};

export default ConnectedPlayers;
