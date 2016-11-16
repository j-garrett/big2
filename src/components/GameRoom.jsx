import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Access socket emitters directly since they don't pass to reducers
import * as a from './../actions';
import CardGroup from './CardGroup';
import GamePot from './GamePot';
import ConnectedPlayers from './ConnectedPlayers';

const mapStateToProps = state => ({
  user: state.username,
  connectedPlayers: state.connectedPlayers,
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
  connectedPlayers,
  room,
  pot,
  playerHand,
  selectedCards,
  addCardToSelection,
  clearCardsFromSelection,
}) => (
  <div>
    <h3>Big 2</h3>
    <ConnectedPlayers
      players={connectedPlayers}
      room={room}
    />
    <button
      onClick={() => {
        clearCardsFromSelection();
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
          addCardToSelection(event);
        }}
      />
      <h4>Selected Cards</h4>
      <CardGroup
        cards={selectedCards}
        onCardClick={(event) => {
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
          clearCardsFromSelection();
          a.playSelectedCards(user, room, []);
        }}
      >
        Pass
      </button>
      <button
        onClick={() => {
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
  connectedPlayers: PropTypes.array,
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
