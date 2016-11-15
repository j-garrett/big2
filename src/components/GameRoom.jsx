import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Access socket emitters directly since they don't pass to reducers
import * as a from './../actions';
import CardGroup from './CardGroup';
import GamePot from './GamePot';

const mapStateToProps = state => ({
  user: state.username,
  room: state.room,
  pot: state.cardsInPot,
  playerHand: state.playerHand,
  selectedCards: state.selectedCards,
});
const mapDispatchToProps = dispatch => ({
  addCardToSelection: card => (
    dispatch(a.addCardToSelection(card))
  ),
  clearCardsFromSelection: () => (
    dispatch(a.clearCardsFromSelection())
  ),
});

// Export class so it can be tested w/o store
export const GameRoom = ({
  user,
  room,
  pot,
  playerHand,
  selectedCards,
  addCardToSelection,
  clearCardsFromSelection,
}) => (
  <div>
    <h3>Big 2</h3>
    <button
      onClick={() => {
        console.log('game start button clicke for room: ', room);
        a.beginGame(room);
      }}
    >
      Start Game
    </button>
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
      <button
        onClick={() => {
          // console.log('submit selection clicked with selection: ', selectedCards);
          clearCardsFromSelection();
          a.playSelectedCards(user, room, selectedCards);
        }}
      >
        Play Hand
      </button>
      <button
        onClick={() => {
          console.log('user passed');
          clearCardsFromSelection();
          a.playSelectedCards(user, room, []);
        }}
      >
        Pass
      </button>
      <button
        onClick={() => {
          console.log('user taking back hand');
          clearCardsFromSelection();
          a.undoPlayedHand(user, room);
        }}
      >
        Undo Played Hand
      </button>
      <GamePot
        pot={pot}
      />
    </div>
  </div>
);

GameRoom.propTypes = {
  user: PropTypes.string,
  room: PropTypes.string,
  pot: PropTypes.array,
  playerHand: PropTypes.array,
  selectedCards: PropTypes.array,
  addCardToSelection: PropTypes.func,
  playSelectedCards: PropTypes.func,
  clearCardsFromSelection: PropTypes.func,
};

const GameRoomContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameRoom);

export default GameRoomContainer;
