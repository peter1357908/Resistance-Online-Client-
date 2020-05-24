// basically a more advanced version of JoinGame
// TODO: add in settings

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { setSessionID, setCurrentlayer } from '../actions';

import socket from '../socketConfig';

class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionID: '',
      sessionPassword: '',
      playerID: '',
    };
  }

  onChangeSessionID = (event) => {
    this.setState({ sessionID: event.target.value });
  }

  onChangeSessionPassword = (event) => {
    this.setState({ sessionPassword: event.target.value });
  }

  onChangePlayerID = (event) => {
    this.setState({ playerID: event.target.value });
  }

  onClickCreate = (event) => {
    const sessionInfo = {
      sessionID: this.state.sessionID,
      sessionPassword: this.state.sessionPassword,
      playerID: this.state.playerID,
    };
    socket.emit('CreateGame', sessionInfo);

    this.props.setSessionID(this.state.sessionID);
    this.props.setCurrentlayer(this.state.playerID);

    this.props.history.push('/pre-game');
  }

  onClickBack = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="vertical-flex join-game-container">
        <div className="title-text">
          Join a Game
        </div>
        <Form.Control type="input" onChange={this.onChangeSessionID} value={this.state.sessionID} placeholder="Session ID" />
        <Form.Control type="input" onChange={this.onChangeSessionPassword} value={this.state.sessionPassword} placeholder="Session Password" />
        <Form.Control type="input" onChange={this.onChangePlayerID} value={this.state.playerID} placeholder="Player ID (this will be your in-game name)" />
        <div className="horizontal-flex">
          <Button variant="primary" onClick={this.onClickCreate}>
            Create
          </Button>
          <Button variant="primary" onClick={this.onClickBack}>
            Back
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { setSessionID, setCurrentlayer })(CreateGame));
