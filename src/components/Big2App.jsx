import React, { PropTypes } from 'react';
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
  changeRoom: room => (
    dispatch(a.changeRoom(room))
  ),
});

// Export class so it can be tested w/o store
export class Big2App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
      username: props.username,
      changeUsername: props.changeUsername,
      changeRoom: props.changeRoom,
      connectToRoom: props.connectToRoom,
    };
  }
  render() {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('username: ', this.state.username);
            console.log('room: ', this.state.room);
            // console.log('e target: ', e.target);
            this.state.changeUsername(this.state.username);
            this.state.changeRoom(this.state.room);
            a.connectToRoom(this.state.username, this.state.room);
          }}
        >
          <label
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            onChange={(e) => {
              // console.log('on change event: ', e.target.value);
              this.setState({ username: e.target.value });
            }}
          />
          <label
            htmlFor="roomname"
          >
            Room
          </label>
          <input
            id="roomname"
            type="text"
            onChange={(e) => {
              // console.log('on change event: ', e.target.value);
              this.setState({ room: e.target.value });
            }}
          />
          <button
            type="submit"
          >
            Enter Room
          </button>
        </form>
        <div>
          <h2>Hi {this.state.username}</h2>
          <GameRoomContainer />
        </div>
      </div>
    );
  }
}

Big2App.propTypes = {
  username: PropTypes.string,
  changeUsername: PropTypes.func,
  connectToRoom: PropTypes.func,
};

const Big2AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Big2App);

export default Big2AppContainer;
