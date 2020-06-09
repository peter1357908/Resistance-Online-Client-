// basically a more advanced version of JoinGame
// TODO: add in settings

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router';
import {
  setSessionID, setCurrentPlayerID, setCreatorID, setPlayerID,
} from '../actions';
import socket from '../socketConfig';

function isEmptyOrSpaces(str) {
  return str === null || str === undefined || str === '' || str.match(/^ *$/) !== null;
}

class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionID: '',
      password: '',
      playerID: '',
      failed: false,
      failMessage: '',
    };
  }

  componentDidMount() {
    socket.on('createGame', (result) => {
      if (result.playerID === null) {
        this.setState({ failed: true, failMessage: result.failMessage });
      } else {
        this.props.setSessionID(result.sessionID);
        this.props.setCurrentPlayerID(result.playerID);
        this.props.setPlayerID(result.playerID);
        this.props.history.push('/lobby');
      }
    });
  }

  componentWillUnmount() {
    socket.off('createGame');
  }

  onChangeSessionID = (event) => {
    this.setState({ sessionID: event.target.value });
  }

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onChangePlayerID = (event) => {
    this.setState({ playerID: event.target.value });
  }

  onClickCreate = (event) => {
    const sessionInfo = {
      sessionID: this.state.sessionID,
      playerID: this.state.playerID,
      password: this.state.password,
    };
    socket.emit('createGame', sessionInfo);
  }

  onClickBack = (event) => {
    this.props.history.push('/');
  }

  renderCreateButton = () => {
    if (isEmptyOrSpaces(this.state.sessionID) || isEmptyOrSpaces(this.state.password) || isEmptyOrSpaces(this.state.playerID)) {
      return (
        <Button variant="primary" onClick={this.onClickCreate} disabled>
          Create
        </Button>
      );
    }
    return (
      <Button variant="primary" onClick={this.onClickCreate}>
        Create
      </Button>
    );
  }

  render() {
    return (
      <div className="vertical-flex create-game-container">
        {/* alert is probably not the best choice for notification of failure here */}
        {this.state.failed ? <Alert variant="danger">{this.state.failMessage}</Alert> : <></>}
        <div className="title-text">
          Create a Game
        </div>
        <div className="input-container">
          <Form.Control type="input" onChange={this.onChangeSessionID} value={this.state.sessionID} placeholder="Session ID" />
          <Form.Control type="input" onChange={this.onChangePassword} value={this.state.password} placeholder="Session Password" />
          <Form.Control type="input" onChange={this.onChangePlayerID} value={this.state.playerID} placeholder="playerID (this will be your name in the game)" />
        </div>
        <div className="horizontal-flex-center bottom-navigation">
          {this.renderCreateButton()}
          <Button variant="primary" onClick={this.onClickBack}>
            Back
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, {
  setSessionID, setCurrentPlayerID, setCreatorID, setPlayerID,
})(CreateGame));
