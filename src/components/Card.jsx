import React, { PropTypes } from 'react';

const Card = ({ value, onClick }) => (
  <li
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
