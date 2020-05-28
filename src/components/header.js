import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import HelpModal from './help';

class Header extends Component {
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
        <HelpModal show={this.state.showModal} closeModal={this.closeClick} />
        <Button variant="secondary" onClick={this.openClick}>Help</Button>
      </>
    );
  }
}

export default Header;
