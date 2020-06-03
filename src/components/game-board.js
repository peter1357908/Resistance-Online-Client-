import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import socket from '../socketConfig';
import { updateSelectedPlayers } from '../actions';
import MissionStatus from '../resources/mission-status';

function mapStateToProps(reduxState) {
  return {
    playerID: reduxState.inGame.playerID,
    currentLeader: reduxState.inGame.currentLeader,
    missionStatuses: reduxState.inGame.missionStatuses,
    playerIDs: reduxState.inGame.playerIDs,
    currentRound: reduxState.inGame.currentRound,
    selectedPlayers: reduxState.inGame.selectedPlayers,
    numSelectedPlayers: reduxState.inGame.numSelectedPlayers, // I'm using this to force a refresh when selectedPlayers changes (ask Will for details)
    missionSize: reduxState.inGame.missionSize,
  };
}

class GameBoard extends Component {
  onDoneClicked = () => {
    socket.emit('inGame', { selectedPlayers: this.props.selectedPlayers });
  }

  renderButton = () => {
    if (this.props.selectedPlayers.length === this.props.missionSize && this.props.currentLeader === this.props.playerID) {
      return (
        <div className="horizontal-flex-center bottom-navigation">
          <Button variant="primary" onClick={this.onDoneClicked}>
            Done
          </Button>
        </div>
      );
    } else {
      return (
        <div className="horizontal-flex-center bottom-navigation">
          <Button variant="primary" className="hidden" onClick={this.thisMethodDoesNotExist} />
        </div>
      );
    }
  }

  cardClicked = (ID) => {
    if (this.props.currentLeader === this.props.playerID) {
      if (this.props.selectedPlayers.includes(ID)) {
        const selectedPlayers = this.props.selectedPlayers.filter((e) => e !== ID);
        this.props.updateSelectedPlayers(selectedPlayers);
      } else {
        this.props.selectedPlayers.push(ID);
        this.props.updateSelectedPlayers(this.props.selectedPlayers);
      }
    }
  }

  render() {
    const missions = this.props.missionStatuses.map((status, index) => {
      const key = index + 1; // note that key isn't allowed to be index

      if (status === MissionStatus.SUCCEEDED) {
        return (
          <div key={key} className="mission succeeded">
            Mission-<span>{index + 1}</span>
          </div>
        );
      } else if (status === MissionStatus.FAILED) {
        return (
          <div key={key} className="mission failed">
            Mission-<span>{index + 1}</span>
          </div>
        );
      } else if (status === MissionStatus.TBD) {
        return (
          <div key={key} className="mission">
            Mission-<span>{index + 1}</span>
          </div>
        );
      }
      return <div>Something went wrong</div>;
    });

    const players = this.props.playerIDs.map((ID) => {
      const className = this.props.selectedPlayers.includes(ID) ? 'player-card selected' : 'player-card';
      return (
        <div role="button" tabIndex="0" key={ID} className={className} onClick={() => this.cardClicked(ID)}>
          <div className="playerID">
            {ID}
          </div>
        </div>
      );
    });

    return (
      <div className="game-board-container">
        <div className="shade">
          <div className="directions">
            The current direction will go here
          </div>
          <div className="missions">
            {missions}
          </div>
          <div className="failed-votes">
            Failed votes: <span>{this.props.currentRound}</span>
          </div>
          <div className="player-cards">
            {players}
          </div>
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { updateSelectedPlayers })(GameBoard));
