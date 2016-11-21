import React, { PropTypes } from 'react';

import CardGroup from './CardGroup';

const GamePot = ({ pot }) => (
  <div
    className={'game-pot'}
  >
    <div
      className={'current-round'}
    >
      <h5>Current Round</h5>
      <p>{pot[1].user} played:</p>
      <CardGroup
        cards={pot[1].cards}
        onCardClick={() => {}}
      />
    </div>
    <div
      className={'previous-round'}
    >
      <h5>Previous Round</h5>
      <p>{pot[0].user} played:</p>
      <CardGroup
        cards={pot[0].cards}
        onCardClick={() => {}}
      />
    </div>
  </div>
);

GamePot.propTypes = {
  pot: PropTypes.array,
};

export default GamePot;
