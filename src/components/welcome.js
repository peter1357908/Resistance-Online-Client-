import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DirectionsModal from './modals/directions-modal';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDirections: false,
    };
  }

  openDirections = () => {
    this.setState({ showDirections: true });
  }

  closeDirections = () => {
    this.setState({ showDirections: false });
  }

  render() {
    return (
      <div className="vertical-flex welcome-container">
        <DirectionsModal show={this.state.showDirections} closeModal={this.closeDirections} />
        <div className="title-text">
          <div>Welcome to Resistance Online</div>
        </div>
        <div className="button-region">
          <div className="horizontal-flex-center bottom-navigation">
            <Link to="/join-game">
              <Button variant="primary">
                Join Game
              </Button>
            </Link>
            <Link to="/create-game">
              <Button variant="primary">
                Create Game
              </Button>
            </Link>
          </div>
          <Button variant="secondary" className="directions-button" onClick={this.openDirections}>Directions</Button>
        </div>
      </div>
    );
  }
}

export default Welcome;
