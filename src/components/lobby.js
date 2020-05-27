import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import socket from '../socketConfig';
import { setPlayerIDs } from '../actions';

function mapStateToProps(reduxState) {
  return {
    sessionID: reduxState.lobby.sessionID,
    playerIDs: reduxState.lobby.playerIDs,
    currentPlayerID: reduxState.lobby.currentPlayerID,
  };
}

class Lobby extends Component {
  componentDidMount() {
    socket.on('lobby', (result) => {
      this.props.setPlayerIDs(result.playerIDs);
      if (result.currentLeader !== -1) {
        this.props.history.push('/in-game');
      }
    });
  }

  // Relies on the backend to discard illegal startGame requests
  // TODO: authentication
  onClickStart = (event) => {
    socket.emit('lobby', { action: 'startGame' });
  }

  onClickQuit = (event) => {
    socket.emit('lobby', { action: 'quitGame' });
    this.props.history.push('/');
  }

  // TODO: highlight the session creator's playerID
  // TODO: make it consistent with the Figma mock-up (different rendering for creators than joiners)
  render() {
    const playerIDs = this.props.playerIDs.map((playerID) => {
      return (
        // assumes that each playerID is unique within a session
        <div key={playerID}>
          {playerID}
        </div>
      );
    });

    return (
      <div className="vertical-flex lobby-container">
        <div className="title-text">
          PlayerIDs:
        </div>
        <div className="vertical-flex title-text">
          {playerIDs}
        </div>
        <div className="title-text">
          Session ID: {this.props.sessionID}
        </div>
        <div className="horizontal-flex">
          <Button variant="primary" onClick={this.onClickStart}>
            Start
          </Button>
          <Button variant="primary" onClick={this.onClickQuit}>
            Quit
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { setPlayerIDs })(Lobby));
