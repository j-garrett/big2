import React from 'react';
import { connect } from 'react-redux';

import * as a from './../actions';

const mapStateToProps = state => ({
  username: state.username,
});
const mapDispatchToProps = dispatch => ({
  changeUsername: newUsername => (
    dispatch(a.changeUsername(newUsername))
  ),
});

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
      <h2>Hi {this.state.username}</h2>
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
