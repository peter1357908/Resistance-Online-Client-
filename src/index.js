import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';

import NewNoteBar from './components/new_note_bar';
import NoteBoard from './components/note_board';
import socket from './socketConfig';

import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: unnecessary empty map creation?
      notes: new Map(),
    };
  }

  componentDidMount() {
    socket.on('notes', this.setStateCallback);
  }

  // TODO: reduce update redundancy
  setStateCallback = (newNotesState) => {
    this.setState({ notes: new Map(newNotesState) });
  }

  render() {
    const myStyle = {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    };

    return (
      <div id="app-container" style={myStyle}>
        <NewNoteBar />
        <NoteBoard notes={this.state.notes} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
