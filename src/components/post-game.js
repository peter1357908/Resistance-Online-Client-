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
      text: 'hi',
      // victoriousFaction: 'RESISTANCE',
      // spies: ['player1', 'player2'],
      // gameHistory: {
      //   missions: [
      //     {
      //       missionOutcome: 'SUCCESS',
      //       missionVoteComposition: {
      //         player1: 'SUCCESS',
      //         player2: 'FAIL',
      //       },
      //       rounds: [
      //         {},
      //         {},
      //       ],
      //     },
      //     {

      //     },
      //     {

      //     },
      //     {

      //     },
      //     {

      //     },
      //   ]
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

  render() {
    return (
      <div className="game-container">
        <SideBar />
        <div className="post-game-container">
          {this.state.text};
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(PostGame));

// export default withRouter(connect(mapStateToProps, {
//   setPlayerID,
// })(PostGame));
