import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import socket from '../socketConfig';
import SideBar from './sidebar';

function mapStateToProps(reduxState) {
  return {
    faction: reduxState.inGame.faction,
    spies: reduxState.inGame.spies,
    playerID: reduxState.lobby.currentPlayerID,
    waitingFor: reduxState.inGame.waitingFor,
  };
}

class TeamReveal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      revealed: false,
      okPressed: false,
    };
  }

  renderCard = () => {
    if (this.state.revealed === false) {
      return (
        <div role="button" tabIndex="0" className="player-card mystery" onClick={() => this.setState({ revealed: true })}>
          <div className="card-text">
            Click to flip
          </div>
        </div>
      );
    } else if (this.props.faction === 'spy') {
      const otherSpies = this.props.spies.filter((e) => e !== this.props.playerID).map((ID) => {
        return (
          <div key={ID} className="spy-playerID">
            {ID}
          </div>
        );
      });
      return (
        <div className="player-card flipped">
          <div className="top-icon">
            <div className="icon-spy" />
          </div>
          <div className="faction-name spy">SPY</div>
          <div className="direction spy">(You win if 3 missions fail)</div>
          <div className="other-spies-list">
            <div className="other-spies-heading">Other spies:</div>
            {otherSpies}
          </div>
          <div className="bottom-icon">
            <div className="icon-spy" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="player-card flipped">
          <div className="top-icon">
            <div className="icon-resistance" />
          </div>
          <div className="faction-name resistance">RESISTANCE</div>
          <div className="direction resistance">(You win if 3 missions succeed)</div>
          <div className="bottom-icon">
            <div className="icon-resistance" />
          </div>
        </div>
      );
    }
  }

  onOkClick = (event) => {
    const message = {
      action: 'factionViewed',
    };
    socket.emit('inGame', message);
    this.setState({ okPressed: true });
  }

  renderOkButton = () => {
    const buttonClassName = this.state.revealed ? 'revealed' : 'hidden';
    return (
      <div className="horizontal-flex-center bottom-navigation">
        <Button variant="primary" className={buttonClassName} onClick={this.onOkClick}>
          Ok
        </Button>
      </div>
    );
  }

  renderDirections = () => {
    if (this.state.revealed && this.state.okPressed) {
      const num = this.props.waitingFor.length;
      if (num > 3) {
        return (
          <div className="directions">
            Waiting for {num} people...
          </div>
        );
      } else if (num !== 0) {
        let concat = this.props.waitingFor[0].toString();
        for (let i = 1; i < num; i += 1) {
          concat = concat.concat(', ');
          concat += this.props.waitingFor[i];
        }
        return (
          <div className="directions">
            Waiting for {concat} view their faction...
          </div>
        );
      } else {
        return (
          <div className="directions">
            All here...
          </div>
        );
      }
    } else {
      return (
        <div className="directions" /> // returning an empty div ensures that the page formatting remains unchanged
      );
    }
  }

  render() {
    return (
      <div className="game-container">
        <SideBar />
        <div className="team-reveal-container">
          <div className="shade">
            {this.renderDirections()}
            {this.renderCard()}
            {this.renderOkButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(TeamReveal));
