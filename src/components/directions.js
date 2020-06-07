import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DirectionsModal from './directions-modal';

class Directions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  openClick = () => {
    this.setState({ showModal: true });
  }

  closeClick = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <>
        <DirectionsModal show={this.state.showModal} closeModal={this.closeClick} />
        <Button variant="secondary" className="directions-button" onClick={this.openClick}>Directions</Button>
      </>
    );
  }
}

export default Directions;
