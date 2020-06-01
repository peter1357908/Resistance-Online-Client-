import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

class TeamReveal extends Component {
  // componentDidMount() {}

  render() {
    return (
      <div className="team-reveal-container">
        <div className="shade">
          <div className="directions">
            The current direction will go here
          </div>
          <div className="player-card">
            <div className="card-text">
              Click to flip
            </div>
          </div>
          <div className="horizontal-flex-center bottom-navigation">
            <Button variant="primary" onClick={this.thisMethodDoesNotExist}>
              Ok
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

// eventually, a mapStateToProps may be needed here
export default withRouter(connect(null, null)(TeamReveal));
