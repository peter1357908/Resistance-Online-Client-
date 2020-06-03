import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router';

import socket from '../socketConfig';
import { setPlayerIDs, setCreatorID } from '../actions';

function mapStateToProps(reduxState) {
  return {
    sessionID: reduxState.lobby.sessionID,
    playerIDs: reduxState.lobby.playerIDs,
    currentPlayerID: reduxState.lobby.currentPlayerID,
    creatorID: reduxState.lobby.creatorID,
  };
}

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      failed: false,
      failMessage: '',
    };
  }

  componentDidMount() {
    socket.on('lobby', (result) => {
      switch (result.action) {
        case 'gameStarted':
          this.props.history.push(`/in-game/${this.props.sessionID}`);
          break;
        case 'someoneQuit':
          this.props.setPlayerIDs(result.playerIDs);
          this.props.setCreatorID(result.creatorID);
          break;
        case 'someoneJoined':
          this.props.setPlayerIDs(result.playerIDs);
          this.props.setCreatorID(result.creatorID);
          break;
        case 'quitAcknowledged':
          this.props.history.push('/');
          break;
        case 'fail':
          this.setState({ failed: true, failMessage: result.failMessage });
          break;
        default:
          console.log(`unknown action received from server: ${result.action}`);
          break;
      }
    });
  }

  // Relies on the backend to discard illegal startGame requests
  // TODO: authentication
  onClickStart = (event) => {
    this.setState({ failed: false });
    socket.emit('lobby', { action: 'startGame' });
  }

  onClickQuit = (event) => {
    socket.emit('lobby', { action: 'quitLobby' });
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

    // NOTE: back-end ensures that the playerIDs are unique, so they can be used as keys
    const players = playerIDs.map((playerID, index) => {
      // render each player's name
      if (index < numPlayers) {
        if (this.props.creatorID === playerID) {
          return (
            <div className="creatorPlayerID" key={playerID}>
              {playerID}
            </div>
          );
        }
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
          {this.state.failed ? <Alert variant="danger">{this.state.failMessage}</Alert> : <></>}
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

export default withRouter(connect(mapStateToProps, { setPlayerIDs, setCreatorID })(Lobby));
