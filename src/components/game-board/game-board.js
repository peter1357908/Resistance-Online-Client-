import React, { Component } from 'react';
/* eslint-disable no-nested-ternary */
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateSelectedPlayers } from '../../actions';
import MissionStatus from '../../resources/mission-status';
import BottomButtons from './bottom-buttons';
import TopText from './top-text';
import { Phase } from '../../resources/phase';

function mapStateToProps(reduxState) {
  return {
    playerID: reduxState.lobby.currentPlayerID,
    currentLeader: reduxState.inGame.currentLeader,
    missionStatuses: reduxState.inGame.missionStatuses,
    playerIDs: reduxState.inGame.playerIDs,
    currentRound: reduxState.inGame.currentRound,
    selectedPlayers: reduxState.inGame.selectedPlayers,
    numSelectedPlayers: reduxState.inGame.numSelectedPlayers, // I'm using this to force a refresh when selectedPlayers changes (ask Will for details)
    currentMission: reduxState.inGame.currentMission,
    gamePhase: reduxState.inGame.gamePhase,
    votes: reduxState.inGame.votes,
  };
}

class GameBoard extends Component {
  cardClicked = (ID) => {
    if (this.props.currentLeader === this.props.playerID && this.props.gamePhase === Phase.SELECTING_TEAM) {
      if (this.props.selectedPlayers.includes(ID)) {
        const selectedPlayers = this.props.selectedPlayers.filter((e) => e !== ID);
        this.props.updateSelectedPlayers(selectedPlayers);
      } else {
        this.props.selectedPlayers.push(ID);
        this.props.updateSelectedPlayers(this.props.selectedPlayers);
      }
    }
  }

  renderPlayerVote = (ID) => {
    const vote = this.props.votes[this.props.playerIDs.indexOf(ID)];
    const className = `player-vote ${vote}`;

    return (
      <div className={className}>
        {vote}
      </div>
    );
  }

  render() {
    const missions = this.props.missionStatuses.map((status, index) => {
      const key = index + 1; // note that key isn't allowed to be index

      const currentString = (index + 1) === this.props.currentMission ? 'current' : '';
      const statusString = status === MissionStatus.SUCCEEDED ? 'succeeded'
        : status === MissionStatus.FAILED ? 'failed'
          : status === MissionStatus.TBD ? '' : 'something-went-wrong';
      const className = `mission ${statusString} ${currentString}`;

      return (
        <div key={key} className={className}>
          Mission-<span>{index + 1}</span>
        </div>
      );
    });

    const players = this.props.playerIDs.map((ID) => {
      const className = this.props.selectedPlayers.includes(ID) ? 'player-card selected' : 'player-card not-selected';
      return (
        <div role="button" tabIndex="0" key={ID} className={className} onClick={() => this.cardClicked(ID)}>
          <div className="playerID">
            {ID}
          </div>
          {this.props.gamePhase === Phase.VIEWING_VOTES && this.renderPlayerVote(ID)}
        </div>
      );
    });

    return (
      <div className="game-board-container">
        <div className="shade">
          <TopText />
          <div className="missions">
            {missions}
          </div>
          <div className="failed-votes">
            Failed votes: <span>{this.props.currentRound - 1}</span>
          </div>
          <div className="player-cards">
            {players}
          </div>
          <BottomButtons />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { updateSelectedPlayers })(GameBoard));