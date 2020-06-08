import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import SideBar from './sidebar';
import socket from '../socketConfig';
// import {
//   setPlayerID,
// }
//   from '../actions';

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
      // gameHistory: {
      //   missions: [
      //     {
      //       missionOutcome: 'SUCCEEDED',
      //       missionVoteComposition: {
      //         player1: 'SUCCESS',
      //         player2: 'FAIL',
      //       },
      //       rounds: [
      //         {
      //           roundOutcome: 'REJECTED',
      //           roundLeader: 'player1',
      //           roundVoteComposition: {
      //             player1: 'REJECT',
      //             player2: 'APPROVE',
      //             player3: 'REJECT',
      //             player4: 'REJECT',
      //             player5: 'REJECT',
      //             player6: 'REJECT',
      //           },
      //         },
      //         {
      //           roundOutcome: 'REJECTED',
      //           roundLeader: 'player1',
      //           roundVoteComposition: {
      //             player1: 'APPROVE',
      //             player2: 'REJECT',
      //             player3: 'APPROVE',
      //             player4: 'APPROVE',
      //             player5: 'APPROVE',
      //             player6: 'APPROVE',
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       missionOutcome: 'SUCCEEDED',
      //       missionVoteComposition: {
      //         player1: 'SUCCESS',
      //         player2: 'FAIL',
      //       },
      //       rounds: [
      //         {
      //           roundOutcome: 'REJECTED',
      //           roundLeader: 'player1',
      //           roundVoteComposition: {
      //             player1: 'REJECT',
      //             player2: 'APPROVE',
      //             player3: 'REJECT',
      //             player4: 'REJECT',
      //             player5: 'REJECT',
      //             player6: 'REJECT',
      //           },
      //         },
      //         {
      //           roundOutcome: 'REJECTED',
      //           roundLeader: 'player1',
      //           roundVoteComposition: {
      //             player1: 'APPROVE',
      //             player2: 'REJECT',
      //             player3: 'APPROVE',
      //             player4: 'APPROVE',
      //             player5: 'APPROVE',
      //             player6: 'APPROVE',
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       missionOutcome: 'SUCCEEDED',
      //       missionVoteComposition: {
      //         player1: 'SUCCESS',
      //         player2: 'FAIL',
      //       },
      //       rounds: [
      //         {
      //           roundOutcome: 'REJECTED',
      //           roundLeader: 'player1',
      //           roundVoteComposition: {
      //             player1: 'REJECT',
      //             player2: 'APPROVE',
      //             player3: 'REJECT',
      //             player4: 'REJECT',
      //             player5: 'REJECT',
      //             player6: 'REJECT',
      //           },
      //         },
      //         {
      //           roundOutcome: 'REJECTED',
      //           roundLeader: 'player1',
      //           roundVoteComposition: {
      //             player1: 'APPROVE',
      //             player2: 'REJECT',
      //             player3: 'APPROVE',
      //             player4: 'APPROVE',
      //             player5: 'APPROVE',
      //             player6: 'APPROVE',
      //           },
      //         },
      //       ],
      //     },
      //     {

      //     },
      //     {

      //     },
      //   ],
      // },
    };
  }

  componentDidMount() {
    socket.on('postGame', (result) => {
      console.log('postGame action: ', result.action);
      switch (result.action) {
        case 'gameHistory':
          console.log('got the game history');
          break;
        default:
          console.log('unknown action received from server: ', result.action);
          break;
      }
      console.log('result: ', result);
    });
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

  renderSpies() {
    return (
      <div className="spies-listing">
        {this.state.spies};
      </div>
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
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(PostGame));

// export default withRouter(connect(mapStateToProps, {
//   setPlayerID,
// })(PostGame));
