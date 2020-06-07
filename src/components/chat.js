/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socketConfig';

import { setLogs } from '../actions';

function mapStateToProps(reduxState) {
  return {
    playerID: reduxState.inGame.playerID,
    logs: reduxState.inGame.logs,
  };
}

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: '',
    };
  }

  componentDidMount() {
    socket.on('chat', (result) => {
      this.props.setLogs(result);
      this.updateScroll();
    });
  }

  onChange = (event) => {
    this.setState({ currentMessage: event.target.value });
  }

  onEnter = (event) => {
    if (event.keyCode === 13) {
      console.log(event.target.value);
      // send message
      const msg = { messageFrom: this.props.playerID, message: event.target.value };
      socket.emit('chat', msg);
      this.setState({ currentMessage: '' });
    }
  }

  updateScroll = () => {
    const element = document.getElementById('chat-history');
    element.scrollTop = element.scrollHeight;
  }

  render() {
    return (
      <div className="chat-container">
        <div id="chat-history" className="chat-history">
          {this.props.logs.map((log, index) => {
            return <div key={index} className="chat-message"><span className="chat-user">{log.playerID}:</span> {log.message}</div>;
          })}
        </div>
        <input className="chat-input" type="text" placeholder="Type something..." onChange={this.onChange} onKeyDown={this.onEnter} value={this.state.currentMessage} />
      </div>
    );
  }
}

export default connect(mapStateToProps, { setLogs })(Chat);
