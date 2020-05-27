import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { setSessionID, setCurrentPlayerID } from '../actions';

import socket from '../socketConfig';

class JoinGame extends Component {
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
    socket.on('joinGame', (result) => {
      if (result.playerID === null) {
        this.setState({ failed: true });
      } else {
        this.props.setSessionID(this.state.sessionID);
        this.props.setCurrentPlayerID(result.playerID);
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

  onClickJoin = (event) => {
    const sessionInfo = {
      sessionID: this.state.sessionID,
      password: this.state.password,
      playerID: this.state.playerID,
      failed: false,
    };
    socket.emit('joinGame', sessionInfo);
  }

  onClickBack = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="vertical-flex join-game-container">
        {/* alert is probably not the best choice for notification of failure here */}
        {this.state.failed ? <Alert variant="danger">Join attempt failed.</Alert> : <></>}
        <div className="title-text">
          Join a Game
        </div>
        <Form.Control type="input" onChange={this.onChangeSessionID} value={this.state.sessionID} placeholder="Session ID" />
        <Form.Control type="input" onChange={this.onChangePassword} value={this.state.password} placeholder="Session Password" />
        <Form.Control type="input" onChange={this.onChangePlayerID} value={this.state.playerID} placeholder="PlayerID (this will be your in-game name)" />
        <div className="horizontal-flex">
          <Button variant="primary" onClick={this.onClickJoin}>
            Join
          </Button>
          <Button variant="primary" onClick={this.onClickBack}>
            Back
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { setSessionID, setCurrentPlayerID })(JoinGame));
