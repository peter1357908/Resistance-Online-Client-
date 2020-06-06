/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import GameBoard from './game-board/game-board';
import TeamReveal from './team-reveal';
import Chat from './chat';
import MissionStatus from '../resources/mission-status';
import { Phase, stringifyPhase } from '../resources/phase';
import socket from '../socketConfig';
import {
  setPlayerID,
  setPlayerIDs,
  setCurrentLeader,
  setCurrentMission,
  setMissionSize,
  setCurrentRound,
  setMissionStatuses,
  setSelectedPlayers,
  setGamePhase,
  setWaitingFor,
  setFaction,
  setSpies,
  // setVotes,
  setActed,
}
  from '../actions';

function mapStateToProps(reduxState) {
  return {
    gamePhase: reduxState.inGame.gamePhase,
    playerIDs: reduxState.inGame.playerIDs,
    lobbyPlayerID: reduxState.lobby.currentPlayerID,
  };
}

class InGame extends Component {
  componentDidMount() {
    socket.on('inGame', (result) => {
      console.log('ingame action: ', result.action);
      switch (result.action) {
        case 'begin':
          this.props.setPlayerID(this.props.lobbyPlayerID); // move copy the playerID from lobby to in-game
          this.props.setPlayerIDs(result.playerIDs);
          this.props.setGamePhase(Phase.VIEWING_TEAM);
          this.props.setFaction('resistance'); // by default, you're on the resistance
          break;
        case 'setSpy':
          this.props.setFaction('spy');
          this.props.setSpies(result.spies);
          break;
        case 'waitingFor':
          this.props.setWaitingFor(result.waitingFor);
          break;
        case 'everyoneJoined':
          this.props.setGamePhase(Phase.SELECTING_TEAM);
          this.props.setCurrentLeader(this.props.playerIDs[result.currentLeaderIndex]);
          this.props.setCurrentMission(result.currentMission + 1); // on the front-end, currentMission ranges from 1 to 5
          this.props.setMissionSize(result.missionSize);
          this.props.setCurrentRound(result.currentRound);
          this.props.setSelectedPlayers([]);
          this.props.setActed(false);
          this.props.setMissionStatuses([
            MissionStatus.TBD,
            MissionStatus.TBD,
            MissionStatus.TBD,
            MissionStatus.TBD,
            MissionStatus.TBD]);
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
    const gamePhaseWrapper = `${stringifyPhase(this.props.gamePhase)}-container`;
    return (
      <div className="in-game-container">
        <Chat />
        <div className={gamePhaseWrapper}>
          <GameBoard />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, {
  setPlayerID,
  setPlayerIDs,
  setCurrentLeader,
  setCurrentMission,
  setMissionSize,
  setCurrentRound,
  setMissionStatuses,
  setSelectedPlayers,
  setGamePhase,
  setWaitingFor,
  setFaction,
  setSpies,
  // setVotes,
  setActed,
})(InGame));
