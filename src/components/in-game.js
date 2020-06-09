import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import GameBoard from './game-board/game-board';
import FactionReveal from './faction-reveal';
import SideBar from './sidebar';
// import MissionStatus from '../resources/mission-status';
import { Phase, stringifyPhase } from '../resources/phase';
import MissionSucceededModal from './modals/mission-succeeded-modal';
import MissionFailedModal from './modals/mission-failed-modal';
import ResistanceWinsModal from './modals/resistance-wins-modal';
import SpiesWinModal from './modals/spies-win-modal';
// import socket from '../socketConfig';
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
  setModalToDisplay,
  setNumFailVotes,
}
  from '../actions';

function mapStateToProps(reduxState) {
  return {
    gamePhase: reduxState.inGame.gamePhase,
    playerIDs: reduxState.inGame.playerIDs,
    lobbyPlayerID: reduxState.lobby.currentPlayerID,
    faction: reduxState.inGame.faction,
    sessionID: reduxState.lobby.sessionID,
    selectedPlayers: reduxState.inGame.selectedPlayers,
    numSelectedPlayers: reduxState.inGame.numSelectedPlayers,
    missionSize: reduxState.inGame.missionSize,
    modalToDisplay: reduxState.inGame.modalToDisplay,
    numFailVotes: reduxState.inGame.numFailVotes,
  };
}

class InGame extends Component {
  closeEndGameModal = () => {
    this.props.setModalToDisplay('');
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
        <MissionSucceededModal show={this.props.modalToDisplay === 'SUCCEEDED'} closeModal={() => this.props.setModalToDisplay('')} />
        <MissionFailedModal show={this.props.modalToDisplay === 'FAILED'} numFailVotes={this.props.numFailVotes} closeModal={() => this.props.setModalToDisplay('')} />
        <ResistanceWinsModal show={this.props.modalToDisplay === 'RESISTANCE'} faction={this.props.faction} closeModal={() => this.closeEndGameModal()} />
        <SpiesWinModal show={this.props.modalToDisplay === 'SPY'} faction={this.props.faction} closeModal={() => this.closeEndGameModal()} />
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
  setModalToDisplay,
  setNumFailVotes,
})(InGame));
