import React from 'react';
import { connect } from 'react-redux';

import * as a from './../actions';

const mapStateToProps = state => ({
  pot: state.pot,
  playerHand: state.playerHand,
  selectedCards: state.selectedCards,
});
const mapDispatchToProps = dispatch => ({
  addCardToSelection: card => (
    dispatch(a.addCardToSelection(card));
  ),
  playSelectedCards: cards => (
    dispatch(a.playSelectedCards(cards));
  ),
})