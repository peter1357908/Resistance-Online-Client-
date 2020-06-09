import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socketConfig';

import { setChatLog, pushChatMessage } from '../actions';

function mapStateToProps(reduxState) {
  return {
    chatLog: reduxState.chat.chatLog,
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
      if ((typeof result[0]) === 'string') {
        // if it is a single message
        this.props.pushChatMessage(result);
      } else {
        // if it is the entire previous chatLog (part of the response to a joinGame request)
        this.props.setChatLog(result);
      }
      this.updateScroll();
    });
  }

  componentWillUnmount() {
    socket.off('chat');
  }

  onChange = (event) => {
    this.setState({ currentMessage: event.target.value });
  }

  onEnter = (event) => {
    if (event.keyCode === 13) {
      // send message
      socket.emit('chat', this.state.currentMessage);
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
          {this.props.chatLog.map((chatArray, index) => {
            // the array will not be reordered, so using indices as keys is fine
            // eslint-disable-next-line react/no-array-index-key
            return <div key={index} className="chat-message"><span className="chat-user">{chatArray[0]}:</span> {chatArray[1]}</div>;
          })}
        </div>
        <input className="chat-input" type="text" placeholder="Type something..." onChange={this.onChange} onKeyDown={this.onEnter} value={this.state.currentMessage} />
      </div>
    );
  }
}

export default connect(mapStateToProps, { setChatLog, pushChatMessage })(Chat);
