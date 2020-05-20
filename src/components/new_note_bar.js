import React, { Component } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

import socket from '../socketConfig';

class NewNoteBar extends Component {
  constructor(props) {
    super(props);

    this.state = { noteTitle: '' };
  }

  onInputChange = (event) => {
    this.setState({ noteTitle: event.target.value });
  }

  onSubmit = (event) => {
    const newNote = {
      title: this.state.noteTitle,
      x: 0, // initialize x and y to avoid using following Draggable position:
      y: 0, // x: this.props.note.x || 0, y: this.props.note.y || 0
    };
    socket.emit('createNote', newNote);
    event.preventDefault();
  }

  // https://getbootstrap.com/docs/4.4/utilities/spacing/
  render() {
    return (
      <Form onSubmit={this.onSubmit} className="newNoteForm">
        <Form.Group controlId="new-note-box">
          <InputGroup className="newNoteInput">
            <Form.Control type="text" onChange={this.onInputChange} value={this.state.noteTitle} placeholder="New note title" />
            <InputGroup.Append>
              <Button variant="primary" type="submit">Submit</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    );
  }
}


export default NewNoteBar;
