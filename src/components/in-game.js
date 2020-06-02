/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import GameBoard from './game-board';
import TeamReveal from './team-reveal';
import Chat from './chat';
import Phase from '../resources/phase';

function mapStateToProps(reduxState) {
  return {
    gamePhase: reduxState.inGame.gamePhase,
  };
}

class InGame extends Component {
  componentDidMount() {
    // socket.on('in-game', (result) => {
    //   console.log('this does not do anything yet');
    // });
  }

  render() {
    if (this.props.gamePhase === Phase.VIEWING_TEAM) {
      return (
        <div className="in-game-container">
          <TeamReveal />
        </div>
      );
    }
    return (
      <div className="in-game-container">
        <Chat />
        <GameBoard />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(InGame));
