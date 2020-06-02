import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

function mapStateToProps(reduxState) {
  return {
    faction: reduxState.inGame.faction,
    otherSpies: reduxState.inGame.otherSpies,
  };
}

class TeamReveal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      revealed: false,
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
      const otherSpies = this.props.otherSpies.map((ID) => {
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
            <div className>Other spies:</div>
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

  renderOkButton = () => {
    const buttonClassName = this.state.revealed ? 'revealed' : 'hidden';
    return (
      <div className="horizontal-flex-center bottom-navigation">
        <Button variant="primary" className={buttonClassName} onClick={this.thisMethodDoesNotExist}>
          Ok
        </Button>
      </div>
    );
  }

  renderDirections = () => {
    if (this.state.revealed) {
      return (
        <div className="directions">
          The waiting-on-player information will go here
        </div>
      );
    } else {
      return (
        <div className="directions" />
      );
    }
  }

  render() {
    return (
      <div className="team-reveal-container">
        <div className="shade">
          {this.renderDirections()}
          {this.renderCard()}
          {this.renderOkButton()}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, null)(TeamReveal));
