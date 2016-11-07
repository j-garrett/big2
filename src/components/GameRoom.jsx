import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as a from './../actions';
import CardGroup from './CardGroup';

const mapStateToProps = state => ({
  pot: state.pot,
  playerHand: state.playerHand,
  selectedCards: state.selectedCards,
});
const mapDispatchToProps = dispatch => ({
  addCardToSelection: card => (
    dispatch(a.addCardToSelection(card))
  ),
  playSelectedCards: cards => (
    dispatch(a.playSelectedCards(cards))
  ),
})

// Export class so it can be tested w/o store
export const GameRoom = ({ pot, playerHand, selectedCards, addCardToSelection }) => {
  return (
    <div>
      <h3>Big 2</h3>
      <div>
        <h4>Player Hand</h4>
        <CardGroup
          cards={playerHand}
          onCardClick={(event) => {
            console.log('onCardClick event: ', event);
            addCardToSelection(event);
          }}
        />
        <h4>Selected Cards</h4>
        <CardGroup
          cards={selectedCards}
          onCardClick={(event) => {
            console.log('onCardClick event: ', event);
            addCardToSelection(event);
          }}
        />
      </div>
      <div>
        <h4>Cards Played</h4>
        <ul>
          <li>3 of CLUBS</li>
        </ul>
      </div>
    </div>
  );
};

GameRoom.propTypes = {
  pot: PropTypes.array,
  playerHand: PropTypes.array,
  selectedCards: PropTypes.array,
  addCardToSelection: PropTypes.func,
}

const GameRoomContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameRoom);

export default GameRoomContainer;
