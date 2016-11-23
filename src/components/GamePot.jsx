import React, { PropTypes } from 'react';

import CardGroup from './CardGroup';

const GamePot = ({ pot }) => {
  console.log('pot: ', pot);
  return (
    <div
      className={'game-pot'}
    >
      {pot.map((round, index) => (
        round.cards.length > 0 ?
          <div
            className={'round'}
          >
            <p>Round {index} - {round.user} played:</p>
            <CardGroup
              key={round.cards}
              cards={round.cards}
              onCardClick={() => {}}
            />
          </div>
          :
          null
        ))
      }
    </div>
  );
};

GamePot.propTypes = {
  pot: PropTypes.array,
};

export default GamePot;
