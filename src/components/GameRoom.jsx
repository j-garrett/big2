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
    dispatch(a.addCardToSelection(card))
  ),
  playSelectedCards: cards => (
    dispatch(a.playSelectedCards(cards))
  ),
})

// Export class so it can be tested w/o store
export class GameRoom extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Big 2</h3>
        <div>
          <h4>Player Hand</h4>
          <ul>
            <li>FAKE CARD</li>
          </ul>
        </div>
        <div>
          <h4>Cards Played</h4>
          <ul>
            <li>3 of CLUBS</li>
          </ul>
        </div>
      </div>
    )
  }
}

GameRoom.propTypes = {
  pot: React.PropTypes.array,
  playerHand: React.PropTypes.array,
  selectedCards: React.PropTypes.array,
}

const GameRoomContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameRoom);

export default GameRoomContainer;
