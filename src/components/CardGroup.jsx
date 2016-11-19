import React, { PropTypes } from 'react';
import Card from './Card';

const CardGroup = ({ cards, onCardClick }) => (
  <ul
    className={'card-group'}
  >
    {cards.map(card =>
      <Card
        key={card}
        value={card}
        onClick={() => onCardClick(card)}
      />
    )}
  </ul>
);

CardGroup.propTypes = {
  onCardClick: PropTypes.func,
  cards: PropTypes.array.isRequired,
};

export default CardGroup;
