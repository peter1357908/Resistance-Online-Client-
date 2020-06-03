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
      logs: [
        { user: 'ass', message: 'oldest' },
        { user: 'ass', message: 'second' },
        { user: 'Chad', message: 'Goshfucking damnit I cant believe how fucking shit you are at this game you ugly bastard' },
        { user: 'ass', message: 'newest' },
        { user: 'ass', message: 'newest' },
        { user: 'ass', message: 'newest' },
        { user: 'ass', message: 'newest' },
        { user: 'ass', message: 'newest' },
        { user: 'ass', message: 'newest' },
        { user: 'ass', message: 'newest' },
        { user: 'ass', message: 'newest' },
        { user: 'Chad', message: 'Goshfucking damnit I cant believe how fucking shit you are at this game you ugly bastard' },
        { user: 'Chad', message: 'Goshfucking damnit I cant believe how fucking shit you are at this game you ugly bastard' },
        { user: 'Chad', message: 'Goshfucking damnit I cant believe how fucking shit you are at this game you ugly bastard' },
        { user: 'Chad', message: 'Goshfucking damnit I cant believe how fucking shit you are at this game you ugly bastard' }],
    };
  }

  componentDidMount() {
    socket.on('chat', (result) => {
      this.props.setLogs(result.logs);
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

  render() {
    return (
      <div className="chat-container">
        <div className="chat-history">
          {this.state.logs.map((log, index) => {
            return <div key={index} className="chat-message"><span className="chat-user">{log.user}:</span> {log.message}</div>;
          })}
        </div>
        <input className="chat-input" type="text" placeholder="Type something..." onChange={this.onChange} onKeyDown={this.onEnter} value={this.state.currentMessage} />
      </div>
    );
  }
}

// eventually this will need to be a connected component so it can access the redux store
export default connect(mapStateToProps, { setLogs })(Chat);
