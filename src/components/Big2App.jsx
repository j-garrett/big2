import React from 'react';
import { connect } from 'react-redux';
import * as a from './../actions';
import GameRoomContainer from './GameRoom';

const mapStateToProps = state => ({
  username: state.username,
});
const mapDispatchToProps = dispatch => ({
  changeUsername: newUsername => (
    dispatch(a.changeUsername(newUsername))
  ),
});

// Export class so it can be tested w/o store
export class Big2App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      changeUsername: props.changeUsername,
    };
  }
  render() {
    return (
      <div>
        <h2>Hi {this.state.username}</h2>
        <GameRoomContainer />
      </div>
    );
  }
}

Big2App.propTypes = {
  username: React.PropTypes.string,
  changeUsername: React.PropTypes.func,
};

const Big2AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Big2App);

export default Big2AppContainer;
