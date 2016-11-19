import React, { PropTypes } from 'react';

const Card = ({ value, onClick }) => (
  <li
    className={'card'}
    onClick={onClick}
  >
    {value}
  </li>
)

Card.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string.isRequired,
}

export default Card;
