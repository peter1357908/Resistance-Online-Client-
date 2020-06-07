import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import GameBoard from './game-board/game-board';
import FactionReveal from './faction-reveal';
import SideBar from './sidebar';
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
  setVotes,
  setRoundOutcome,
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
        case 'gameStarted':
          this.props.setPlayerID(this.props.lobbyPlayerID); // move copy the playerID from lobby to in-game
          this.props.setPlayerIDs(result.playerIDs);
          this.props.setGamePhase(Phase.VIEWING_TEAM);
          this.props.setFaction('resistance'); // by default, you're on the resistance
          this.props.setActed(false);
          break;
        case 'youAreSpy':
          this.props.setFaction('spy');
          this.props.setSpies(result.spies);
          break;
        case 'waitingFor':
          this.props.setWaitingFor(result.waitingFor);
          break;
        case 'everyoneViewedFaction':
          this.props.setGamePhase(Phase.SELECTING_TEAM);
          this.props.setCurrentLeader(result.currentLeaderID);
          this.props.setCurrentMission(result.currentMission);
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
        // case 'cardClicked':
        //   this.props.selectedPlayers.push(result.cardPlayerID);
        //   this.props.setSelectedPlayers(this.props.selectedPlayers);
        //   break;
        // case 'cardUnclicked':
        //   this.props.setSelectedPlayers(this.props.selectedPlayers.filter((e) => e !== result.cardPlayerID));
        //   break;
        case 'proposeTeam':
          this.props.setSelectedPlayers(result.proposedTeam);
          this.props.setGamePhase(Phase.VOTING_ON_TEAM);
          break;
        case 'roundVotes':
          this.props.setGamePhase(Phase.VIEWING_VOTES);
          this.props.setActed(false);
          this.props.setVotes(this.props.playerIDs.map((ID) => result.voteComposition[ID]));
          this.props.setRoundOutcome(result.roundOutcome);
          this.props.setCurrentRound(result.currentRound);
          break;
        case 'tooManyRounds':
          this.props.missionStatuses[result.currentMission - 1] = MissionStatus.FAILED;
          this.props.setMissionStatuses(this.props.missionStatuses);
          break;
        case 'missionStarting':
          this.props.setGamePhase(Phase.MISSION);
          this.props.setSelectedPlayers(result.playersOnMission);
          break;
        case 'teamSelectionStarting':
          this.props.setGamePhase(Phase.SELECTING_TEAM);
          this.props.setCurrentLeader(result.currentLeaderID);
          this.props.setCurrentMission(result.currentMission);
          break;
        case 'missionVotes':
          // TODO make a modal that displays the results of the mission vote
          if (result.missionStatus === 'SUCCEEDED') {
            this.props.missionStatuses[result.currentMission - 1] = MissionStatus.SUCCEEDED;
          } else if (result.missionStatus === 'FAILED') {
            this.props.missionStatuses[result.currentMission - 1] = MissionStatus.FAILED;
          }
          this.setMissionStatuses(this.props.missionStatuses);
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
        <div className="game-container">
          <FactionReveal />
        </div>
      );
    }
    const gamePhaseWrapper = `${stringifyPhase(this.props.gamePhase)}-container`;
    return (
      <div className="game-container">
        <SideBar />
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
  setVotes,
  setRoundOutcome,
  setActed,
})(InGame));
