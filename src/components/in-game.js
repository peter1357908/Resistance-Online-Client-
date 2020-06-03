/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import GameBoard from './game-board';
import TeamReveal from './team-reveal';
import Chat from './chat';
import Phase from '../resources/phase';
import socket from '../socketConfig';
import {
  setPlayerIDs, setSpies, setGamePhase, setCurrentLeader, setWaitingFor, setRound,
}
  from '../actions';

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
          this.props.setCurrentLeader(result.playerIDs[0]);
          break;
        case 'setSpy':
          this.props.setSpies(result.spies);
          break;
        case 'waitingFor':
          console.log('waiting for ', result.waitingFor);
          this.props.setWaitingFor(result.waitingFor);
          break;
        case 'everyoneJoined':
          console.log('waiting for is empty');
          this.props.setGamePhase(Phase.SELECTING_TEAM);
          this.props.setRound(this.props.playerIDs[result.currentLeaderIndex], result.currentMission, result.currentRound, result.missionSize);
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
    } else if (this.props.gamePhase === Phase.SELECTING_TEAM) {
      return (
        <div className="in-game-container">
          <Chat />
          <GameBoard />
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

export default withRouter(connect(mapStateToProps, {
  setSpies, setPlayerIDs, setGamePhase, setCurrentLeader, setWaitingFor, setRound,
})(InGame));
