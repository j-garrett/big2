import React, { PropTypes } from 'react';

const Card = ({ value, type, onClick, selected }) => (
  <li
    className={
      (selected ? 'card selected-card' : 'card')
    }
    onClick={() => {
      onClick();
    }}
  >
    <img
      src={`./images/cards/${value}.png`}
      alt={value}
    />
  </li>
);

Card.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Card;
