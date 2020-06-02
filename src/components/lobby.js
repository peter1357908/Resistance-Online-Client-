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
    creatorID: reduxState.lobby.creatorID,
  };
}

class Lobby extends Component {
  componentDidMount() {
    socket.on('lobby', (result) => {
      this.props.setPlayerIDs(result.playerIDs);
      if (result.action === 'gameStarted') {
        this.props.history.push(`/in-game/${this.props.sessionID}`);
      }
    });
  }

  // Relies on the backend to discard illegal startGame requests
  // TODO: authentication
  onClickStart = (event) => {
    // TODO eventually we'll check that there are the appropriate number of players
    socket.emit('lobby', { action: 'startGame' });
  }

  onClickQuit = (event) => {
    socket.emit('lobby', { action: 'quitLobby' });
    this.props.history.push('/');
  }

  renderMessage = () => {
    if (this.props.playerIDs.length < 5) {
      return <div className="message">Waiting for players to join</div>;
    } else if (this.props.creatorID === this.props.currentPlayerID) {
      return <div className="message">Ready to start game</div>;
    } else {
      return <div className="message">Waiting for {this.props.creatorID} to start the game</div>;
    }
  }

  renderBottom = () => {
    if (this.props.creatorID === this.props.currentPlayerID) {
      return (
        <div className="horizontal-flex-center bottom-navigation">
          <Button variant="primary" onClick={this.onClickStart}>
            Start
          </Button>
          <Button variant="primary" onClick={this.onClickQuit}>
            Quit
          </Button>
        </div>
      );
    } else {
      return (
        <div className="horizontal-flex-center bottom-navigation">
          <Button variant="primary" onClick={this.onClickQuit}>
            Quit
          </Button>
        </div>
      );
    }
  }

  // TODO: highlight the session creator's playerID
  // TODO: make it consistent with the Figma mock-up (different rendering for creators than joiners)
  render() {
    const placeholderIDs = ['Player 1',
      'Player 2',
      'Player 3',
      'Player 4',
      'Player 5',
      'Player 6 (optional)',
      'Player 7 (optional)',
      'Player 8 (optional)',
      'Player 9 (optional)',
      'Player 10 (optional)'];
    const numPlayers = this.props.playerIDs.length;
    const playerIDs = this.props.playerIDs.concat(placeholderIDs.slice(numPlayers, placeholderIDs.length));

    // NOTE: playerIDs must be unique or else there will be a "two elements have the same key" error
    const players = playerIDs.map((playerID, index) => {
      // render each player's name
      if (index < numPlayers) {
        return (
          <div className="playerID" key={playerID}>
            {playerID}
          </div>
        );
      // and render each placeholder name
      } else {
        return (
          <div className="placeholderID" key={playerID}>
            {playerID}
          </div>
        );
      }
    });

    return (
      <div className="lobby-container">
        <div className="shade">
          <div className="sessionID">
            Session ID: {this.props.sessionID}
          </div>
          <div className="title-text">
            Resistance
          </div>
          {this.renderMessage()}
          <div className="playerID-grid">
            <div className="playerID-column">
              {players.slice(0, 5)}
            </div>
            <div className="playerID-column">
              {players.slice(5, 10)}
            </div>
          </div>
          {this.renderBottom()}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { setPlayerIDs })(Lobby));
