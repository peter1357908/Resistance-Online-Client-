import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

// import socket from '../socketConfig';
// import from '../actions';
import MissionStatus from '../resources/mission-status';

function mapStateToProps(reduxState) {
  return {
    missionStatuses: reduxState.inGame.missionStatuses,
    playerIDs: reduxState.inGame.playerIDs,
    currentRound: reduxState.inGame.currentRound,
    selectedPlayers: reduxState.inGame.selectedPlayers,
  };
}

class GameBoard extends Component {
  // componentDidMount() {}

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
        <div key={ID} className={className}>
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
            Failed votes: <span>{this.props.currentRound - 1}</span>
          </div>
          <div className="player-cards">
            {players}
          </div>
          <div className="horizontal-flex-center bottom-navigation">
            <Button variant="primary" onClick={this.thisMethodDoesNotExist}>
              Done
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(GameBoard));
