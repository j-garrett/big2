import React, { PropTypes } from 'react';

import PlayerCard from './PlayerCard';

const ConnectedPlayers = ({ currentPlayer, players, room }) => (
  <div>
    <h3>You are in the {room} room with</h3>
    {players.map(player => (
      <PlayerCard
        key={player}
        player={player}
        currentPlayer={currentPlayer}
      />
      )
    )}
  </div>
);


ConnectedPlayers.propTypes = {
  currentPlayer: PropTypes.string,
  players: PropTypes.array,
  room: PropTypes.string,
};

export default ConnectedPlayers;
