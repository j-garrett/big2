import React, { PropTypes } from 'react';
import Card from './Card';

const PlayerHand = ({ cards, onCardClick }) => (
  <ul>
    {cards.map(card =>
      <Card
        key={card}
        value={card}
        onClick={() => onCardClick(card)}
      />
    )}
  </ul>
)

PlayerHand.propTypes = {
  onClick: PropTypes.func,
  cards: PropTypes.array.isRequired,
}

export default PlayerHand;
