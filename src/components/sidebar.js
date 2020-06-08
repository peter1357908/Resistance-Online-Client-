/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Chat from './chat';
import DirectionsModal from './directions-modal';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      showDirections: false,
    };
  }

  openDirections = () => {
    this.setState({ showDirections: true });
  }

  closeDirections = () => {
    this.setState({ showDirections: false });
  }

  toggleCollapse = () => {
    if (this.state.show) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  }

  renderMaterial = () => {
    if (this.state.show) {
      return (
        <div className="sidebar-material">
          <div className="sidebar-buttons">
            <Button variant="secondary" className="directions-button" onClick={this.openDirections}>Directions</Button>
            <Button variant="secondary" className="discord-button" onClick={this.thisMethodDoesNotExist} disabled>Join Discord</Button>
          </div>
          <Chat />
        </div>
      );
    }
    return <div className="sidebar-material" />;
  }

  render() {
    return (
      <div className="sidebar-container">
        <DirectionsModal show={this.state.showDirections} closeModal={this.closeDirections} />
        {this.renderMaterial()}
        <div role="button" tabIndex="0" className="sidebar-toggle" onClick={this.toggleCollapse}>
          {this.state.show && <i className="fas fa-caret-left" />}
          {!this.state.show && <i className="fas fa-caret-right" />}
        </div>
      </div>
    );
  }
}

export default SideBar;
