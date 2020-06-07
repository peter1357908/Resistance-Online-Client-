/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Chat from './chat';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
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
