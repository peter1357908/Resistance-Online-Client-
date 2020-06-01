/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import GameBoard from './game-board';
import Phase from '../resources/phase';

function mapStateToProps(reduxState) {
  return {
    gamePhase: reduxState.inGame.gamePhase,
  };
}

class InGame extends Component {
  render() {
    // eventually, this section will contain logic for every gamePhase
    if (this.props.gamePhase === Phase.SELECTING_TEAM) {
      return (
        <GameBoard />
      );
    }
    return (
      <div>Game phase is currently not SELECTING TEAM</div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(InGame));
