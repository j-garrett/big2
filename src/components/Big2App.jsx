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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('e target: ', e.target);
            this.state.changeUsername(this.state.username);
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
              console.log('on change event: ', e.target.value);
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
              console.log('on change event: ', e.target.value);
              this.setState({ username: e.target.value });
            }}
          />
          <button
            type="submit"
          >
            submit
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
};

const Big2AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Big2App);

export default Big2AppContainer;
