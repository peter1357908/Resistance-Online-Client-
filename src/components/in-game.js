/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import GameBoard from './game-board';
import TeamReveal from './team-reveal';
import Chat from './chat';
import Phase from '../resources/phase';
import socket from '../socketConfig';
import { setPlayerIDs, setSpies } from '../actions';

function mapStateToProps(reduxState) {
  return {
    gamePhase: reduxState.inGame.gamePhase,
    playerIDs: reduxState.inGame.playerIDs,
  };
}

class InGame extends Component {
  componentDidMount() {
    socket.on('inGame', (result) => {
      console.log('ingame action: ', result.action);
      switch (result.action) {
        case 'begin':
          this.props.setPlayerIDs(result.playerIDs);
          break;
        case 'setspy':
          this.props.setSpies(result.spies);
          break;
        default:
          console.log('unknown action received from server: ', result.action);
          break;
      }
      console.log('result: ', result);
    });
  }

  render() {
    if (this.props.gamePhase === Phase.VIEWING_TEAM) {
      return (
        <div className="in-game-container">
          <TeamReveal />
        </div>
      );
    }
    return (
      <div className="in-game-container">
        <Chat />
        <GameBoard />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { setSpies, setPlayerIDs })(InGame));
