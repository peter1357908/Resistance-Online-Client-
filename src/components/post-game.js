/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import SideBar from './sidebar';
import socket from '../socketConfig';

function mapStateToProps(reduxState) {
  return {
    playerIDs: reduxState.inGame.playerIDs,
    faction: reduxState.inGame.faction,
  };
}

class PostGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      victoriousFaction: 'SPY',
      spies: ['player1', 'player2'],
      gameHistory: {
        missions: [
          {
            missionOutcome: 'FAILED',
            missionVoteComposition: {
              player1: 'SUCCESS',
              player2: 'FAIL',
            },
            rounds: [
              {
                roundOutcome: 'REJECTED',
                roundLeader: 'player1',
                proposedTeam: ['player1', 'player2'],
                roundVoteComposition: {
                  player1: 'REJECT',
                  player2: 'APPROVE',
                  player3: 'REJECT',
                  player4: 'REJECT',
                  player5: 'REJECT',
                  player6: 'REJECT',
                },
              },
            ],
          },
        ],
      },
    };
  }

  componentDidMount() {
    socket.on('postGame', (result) => {
      console.log('postGame action: ', result.action);
      switch (result.action) {
        case 'gameHistory':
          this.setState({
            victoriousFaction: result.victoriousFaction,
            gameHistory: result.gameHistory,
            spies: result.spies,
          });
          break;
        default:
          console.log('unknown action received from server: ', result.action);
          break;
      }
      console.log('result: ', result);
    });
  }

  componentWillUnmount() {
    socket.off('postGame');
  }

  renderHeader = () => {
    if (this.state.victoriousFaction === 'RESISTANCE') {
      return (
        <div className="post-game-header">
          <div className="icon-resistance" />
          <div className="victorious-faction resistance">
            Resistance won
          </div>
          <div className="icon-resistance" />
        </div>
      );
    }
    return (
      <div className="post-game-header">
        <div className="icon-spy" />
        <div className="victorious-faction spy">
          Spies won
        </div>
        <div className="icon-spy" />
      </div>
    );
  }

  stringifySpies = () => {
    const num = this.state.spies.length;
    switch (num) {
      case 2:
        return `${this.state.spies[0]} and ${this.state.spies[1]}`;
      case 3:
        return `${this.state.spies[0]}, ${this.state.spies[1]}, and ${this.state.spies[2]}`;
      case 4:
        return `${this.state.spies[0]}, ${this.state.spies[1]}, ${this.state.spies[2]}, and ${this.state.spies[3]}`;
      default:
        return 'uh-oh, an error occured';
    }
  }

  renderSpies = () => {
    return (
      <div className="spies-listing">
        Spies: {this.stringifySpies()}
      </div>
    );
  }

  renderRoundPlayerAndVote = (playerID, vote, round) => {
    const leader = playerID === round.roundLeader ? 'leader' : '';
    const onMission = round.proposedTeam.includes(playerID) ? 'on-mission' : '';
    const playerClassName = `player ${leader} ${onMission}`;
    const shortVote = vote === 'APPROVE' ? 'yes'
      : vote === 'REJECT' ? 'no' : 'unclear';
    return (
      <div className="player-and-round-vote" key={playerID}>
        <div className={playerClassName}>
          {playerID}
        </div>
        <div>
          -
        </div>
        <div className={shortVote}>
          {shortVote},
        </div>
      </div>
    );
  }

  renderRoundReport = (round, roundIndex) => {
    console.log(Object.entries(round.roundVoteComposition));
    const key = roundIndex + 1;
    return (
      <div className="round-report" key={key}>
        <div className="round-report-number">
          Round {roundIndex + 1}
        </div>
        {Object.entries(round.roundVoteComposition).map((pair) => this.renderRoundPlayerAndVote(pair[0], pair[1], round))}
      </div>
    );
  }

  renderMissionPlayerAndVote = (playerID, vote, mission) => {
    return (
      <div className="mission-and-player-vote" key={playerID}>
        <div>
          {playerID}-
        </div>
        <div className={vote}>
          {vote}
        </div>
      </div>
    );
  }

  renderMissionVotes = (mission) => {
    return (
      <div className="mission-vote-report">
        <div className="header-text">
          Mission Actions
        </div>
        {Object.entries(mission.missionVoteComposition).map((pair) => this.renderMissionPlayerAndVote(pair[0], pair[1], mission))}
      </div>
    );
  }

  renderMissionReport = (mission, missionIndex) => {
    const missionOutcomeClass = mission.missionOutcome === 'SUCCEEDED' ? 'mission-outcome resistance'
      : mission.missionOutcome === 'FAILED' ? 'mission-outcome spy' : 'unclear';

    const key = missionIndex + 1;
    return (
      <div className="mission-report" key={key}>
        <div className="mission-number-and-outcome">
          <div className="mission-number">
            Mission {missionIndex + 1} -
          </div>
          <div className={missionOutcomeClass}>
            {mission.missionOutcome}
          </div>
        </div>
        {mission.rounds.map((round, index) => this.renderRoundReport(round, index))}
        {this.renderMissionVotes(mission)}
      </div>
    );
  }

  renderMissionReports = () => {
    return (
      <div className="mission-reports">
        <div className="legend">
          (Note: leaders are <span className="italicized">italicized</span> and players on the proposed team are <span className="circled">circled</span>)
        </div>
        {this.state.gameHistory.missions.map((mission, index) => this.renderMissionReport(mission, index))}
      </div>
    );
  }

  renderDoneButton = () => {
    return (
      <Button variant="primary" onClick={() => this.props.history.push('/lobby')}>
        Done
      </Button>
    );
  }

  render() {
    return (
      <div className="game-container">
        <SideBar />
        <div className="post-game-container">
          <div className="shade">
            {this.renderHeader()}
            {this.renderSpies()}
            {this.renderMissionReports()}
            {this.renderDoneButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(PostGame));
