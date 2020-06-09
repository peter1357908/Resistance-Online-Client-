import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import GameBoard from './game-board/game-board';
import FactionReveal from './faction-reveal';
import SideBar from './sidebar';
import MissionStatus from '../resources/mission-status';
import { Phase, stringifyPhase } from '../resources/phase';
import MissionSucceededModal from './modals/mission-succeeded-modal';
import MissionFailedModal from './modals/mission-failed-modal';
import ResistanceWinsModal from './modals/resistance-wins-modal';
import SpiesWinModal from './modals/spies-win-modal';
import socket from '../socketConfig';
import {
  setPlayerID,
  setPlayerIDs,
  setCurrentLeader,
  setCurrentMission,
  setMissionSize,
  setMissionSizes,
  setCurrentRound,
  setMissionStatuses,
  setMissionStatus,
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
    faction: reduxState.inGame.faction,
    sessionID: reduxState.lobby.sessionID,
  };
}

class InGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalToDisplay: 'RESISTANCE', // valid values are: 'SUCCEEDED', 'FAILED', 'RESISTANCE' (indicating resistance won), and 'SPY'
      numFailVotes: 0,
    };
  }

  componentDidMount() {
    socket.on('inGame', (result) => {
      console.log('ingame action: ', result.action);
      switch (result.action) {
        case 'gameStarted':
          this.props.setPlayerID(this.props.lobbyPlayerID); // move copy the playerID from lobby to in-game
          this.props.setPlayerIDs(result.playerIDs);
          this.props.setGamePhase(Phase.VIEWING_TEAM);
          this.props.setFaction('resistance'); // by default, you're on the resistance
          this.props.setMissionSizes(result.missionSizes);
          this.props.setActed(false);
          break;
        case 'youAreSpy':
          this.props.setFaction('spy');
          this.props.setSpies(result.spies);
          break;
        case 'waitingFor':
          this.props.setWaitingFor(result.waitingFor);
          // if (result.waitingFor.include(this.props.playerID)) {
          //   setActed(false);
          // }
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
          this.props.setActed(false);
          this.props.setSelectedPlayers(result.proposedTeam);
          this.props.setGamePhase(Phase.VOTING_ON_TEAM);
          break;
        case 'roundVotes':
          this.props.setActed(false);
          this.props.setGamePhase(Phase.VIEWING_VOTES);
          this.props.setVotes(this.props.playerIDs.map((ID) => result.voteComposition[ID]));
          this.props.setRoundOutcome(result.roundOutcome);
          this.props.setCurrentRound(result.concludedRound);
          break;
        case 'tooManyRounds':
          this.props.setMissionStatus(result.failedMission, MissionStatus.FAILED);
          break;
        case 'missionStarting':
          this.props.setActed(false);
          this.props.setGamePhase(Phase.MISSION);
          this.props.setSelectedPlayers(result.playersOnMission);
          this.props.setWaitingFor(result.playersOnMission);
          break;
        case 'teamSelectionStarting':
          this.props.setGamePhase(Phase.SELECTING_TEAM);
          this.props.setCurrentLeader(result.currentLeaderID);
          this.props.setCurrentMission(result.currentMission);
          this.props.setMissionSize(result.missionSize);
          this.props.setCurrentRound(result.currentRound);
          this.props.setSelectedPlayers([]);
          break;
        case 'missionVotes':
          this.setState({ modalToDisplay: result.missionOutcome });
          this.setState({ numFailVotes: result.numFailVotes });
          if (result.missionOutcome === 'SUCCEEDED') {
            this.props.setMissionStatus(result.concludedMission, MissionStatus.SUCCEEDED);
          } else if (result.missionOutcome === 'FAILED') {
            this.props.setMissionStatus(result.concludedMission, MissionStatus.FAILED);
          }
          break;
        case 'gameFinished':
          this.setState({ modalToDisplay: result.victoriousFaction });
          // TODO make this history.push stuff happen only once the modal is closed
          // this.props.history.push(`/post-game/${this.props.sessionID}`);
          break;
        default:
          console.log('unknown action received from server: ', result.action);
          break;
      }
      console.log('result: ', result);
    });
  }

  closeEndGameModal = () => {
    this.setState({ modalToDisplay: '' });
    this.props.history.push(`/post-game/${this.props.sessionID}`);
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
        <MissionSucceededModal show={this.state.modalToDisplay === 'SUCCEEDED'} closeModal={() => this.setState({ modalToDisplay: '' })} />
        <MissionFailedModal show={this.state.modalToDisplay === 'FAILED'} numFailVotes={this.state.numFailVotes} closeModal={() => this.setState({ modalToDisplay: '' })} />
        <ResistanceWinsModal show={this.state.modalToDisplay === 'RESISTANCE'} faction={this.props.faction} closeModal={() => this.closeEndGameModal()} />
        <SpiesWinModal show={this.state.modalToDisplay === 'SPY'} faction={this.props.faction} closeModal={() => this.closeEndGameModal()} />
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
  setMissionSizes,
  setCurrentRound,
  setMissionStatuses,
  setMissionStatus,
  setSelectedPlayers,
  setGamePhase,
  setWaitingFor,
  setFaction,
  setSpies,
  setVotes,
  setRoundOutcome,
  setActed,
})(InGame));
