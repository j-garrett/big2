import React, { PropTypes } from 'react';
import Card from './Card';

const CardGroup = ({ cards, type, onCardClick }) => (
  <ul
    className={'card-group'}
  >
    {cards.map(card =>
      <Card
        key={card}
        value={card}
        type={type}
        onClick={() => onCardClick(card)}
      />
    )}
  </ul>
);

CardGroup.propTypes = {
  onCardClick: PropTypes.func,
  cards: PropTypes.array.isRequired,
  type: PropTypes.string,
};

export default CardGroup;
