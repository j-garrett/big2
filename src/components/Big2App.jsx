import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as a from './../actions';
import GameRoomContainer from './GameRoom';

const mapStateToProps = state => ({
  user: state.username,
  room: state.room,
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
// TODO: inRoom needs to be set to false at load for prod
export class Big2App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inRoom: false,
      room: props.room,
      user: props.user,
      changeUsername: props.changeUsername,
      changeRoom: props.changeRoom,
      connectToRoom: props.connectToRoom,
    };
  }
  render() {
    return (
      <div
        className={'big2-app'}
      >
        <div
          className={'nav-bar'}
        >
          <h1>Big 2</h1>
          <div
            className={'nav-bar-user-room-info'}
          >
            {this.state.inRoom ?
              <p>
                <strong>{this.state.user}</strong> is in the <strong>{this.state.room}</strong> room with...
              </p>
              :
              null
            }
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.state.changeUsername(this.state.user);
              this.state.changeRoom(this.state.room);
              this.setState({ inRoom: true });
              a.connectToRoom(this.state.user, this.state.room);
            }}
          >
            <label
              htmlFor="user"
            >
              Username
            </label>
            <input
              id="user"
              type="text"
              onChange={(e) => {
                this.setState({ user: e.target.value });
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
                this.setState({ room: e.target.value });
              }}
            />
            <button
              type="submit"
            >
              Enter Room
            </button>
          </form>
        </div>
        {this.state.inRoom ?
          <GameRoomContainer />
          :
          null
        }
      </div>
    );
  }
}

Big2App.propTypes = {
  room: PropTypes.string,
  user: PropTypes.string,
  changeUsername: PropTypes.func,
  connectToRoom: PropTypes.func,
};

const Big2AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Big2App);

export default Big2AppContainer;
