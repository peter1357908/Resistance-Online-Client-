import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import socket from '../socketConfig';
import { setPlayers } from '../actions';

function mapStateToProps(reduxState) {
  return {
    sessionID: reduxState.preGame.sessionID,
    players: reduxState.preGame.players,
    currentPlayer: reduxState.preGame.currentPlayer,
  };
}

class PreGame extends Component {
  componentDidMount() {
    socket.on(this.props.sessionID, setPlayers);
  }

  // Relies on the backend to discard illegal startGame requests
  // TODO: authentication
  onClickStart = (event) => {
    socket.emit('startGame', this.props.sessionID, this.props.currentPlayer);
    this.props.history.push('/in-game');
  }

  onClickQuit = (event) => {
    socket.emit('quitGame', this.props.sessionID, this.props.currentPlayer);
    this.props.history.push('/join-game');
  }

  // TODO: highlight the session creator's playerID
  render() {
    const players = this.props.players.map((player) => {
      return (
        // assumes that each playerID is unique within a session
        <div key={player}>
          {player}
        </div>
      );
    });

    return (
      <div className="vertical-flex pre-game-container">
        <div className="title-text">
          Players
        </div>
        <div className="vertical-flex">
          {players}
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

export default withRouter(connect(mapStateToProps, { setPlayers })(PreGame));
