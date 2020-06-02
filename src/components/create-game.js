// basically a more advanced version of JoinGame
// TODO: add in settings

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { setSessionID, setCurrentPlayerID, setCreatorID } from '../actions';

import socket from '../socketConfig';

class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionID: '',
      password: '',
      playerID: '',
      failed: false,
    };
  }

  componentDidMount() {
    socket.on('createGame', (result) => {
      // console.log(result);
      if (result.playerID === null) {
        this.setState({ failed: true });
      } else {
        this.props.setSessionID(this.state.sessionID);
        this.props.setCurrentPlayerID(result.playerID);
        this.props.setCreatorID(result.creatorID);
        this.props.history.push('/lobby');
      }
    });
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

  render() {
    return (
      <div className="vertical-flex create-game-container">
        {/* alert is probably not the best choice for notification of failure here */}
        {this.state.failed ? <Alert variant="danger">Create attempt failed.</Alert> : <></>}
        <div className="title-text">
          Create a Game
        </div>
        <div className="input-container">
          <Form.Control type="input" onChange={this.onChangeSessionID} value={this.state.sessionID} placeholder="Session ID" />
          <Form.Control type="input" onChange={this.onChangePassword} value={this.state.password} placeholder="Session Password" />
          <Form.Control type="input" onChange={this.onChangePlayerID} value={this.state.playerID} placeholder="playerID (this will be your name in the game)" />
        </div>
        <div className="horizontal-flex-center bottom-navigation">
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

export default withRouter(connect(null, { setSessionID, setCurrentPlayerID, setCreatorID })(CreateGame));
