/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import Draggable from 'react-draggable';
import marked from 'marked';
import socket from '../socketConfig';

class Note extends Component {
  constructor(props) {
    super(props);

    this.id = props.id;

    this.state = {
      isEditing: false,
      titleUnderEdit: props.note.title,
      textUnderEdit: props.note.text,
    };
  }

  onInputChangeTitle = (event) => {
    this.setState({ titleUnderEdit: event.target.value });
  }

  onInputChangeText = (event) => {
    this.setState({ textUnderEdit: event.target.value });
  }

  updateLocation = (event, data) => {
    const edittedNote = {
      x: data.x,
      y: data.y,
    };
    socket.emit('updateNote', this.id, edittedNote);
  }

  onFocus = (event) => {
    const edittedNote = {
      zIndex: this.props.topZIndex + 1,
    };
    socket.emit('updateNote', this.id, edittedNote);
  }

  onStartEditing = (event) => {
    this.setState({
      isEditing: true,
      titleUnderEdit: this.props.note.title,
      textUnderEdit: this.props.note.text,
    });
  }

  onCancelEditing = (event) => {
    this.setState({ isEditing: false });
  }

  onSubmitEditing = (event) => {
    const edittedNote = {
      title: this.state.titleUnderEdit,
      text: this.state.textUnderEdit,
    };
    socket.emit('updateNote', this.id, edittedNote);

    this.setState({ isEditing: false });
  }

  onDelete = (event) => {
    socket.emit('deleteNote', this.id);
  }

  // TODO: reduce redundancy between Regular and Editing
  // TODO: somehow account for the debounced non-text updates...
  renderNoteRegular() {
    return (
      <Draggable bounds="parent" handle=".handle" onStart={this.onFocus} onDrag={this.updateLocation} position={{ x: this.props.note.x, y: this.props.note.y }}>
        <Card id={this.id} className="noteCard" onClick={this.onFocus} style={{ zIndex: this.props.note.zIndex }}>
          <Card.Header className="noteCardHeader">
            <Button variant="light" className="handle">
              <i className="fas fa-expand-arrows-alt" />
            </Button>
            <Button variant="light" onClick={this.onStartEditing}>
              <i className="fas fa-edit" />
            </Button>
            <Button variant="light" onClick={this.onDelete}>
              <i className="fas fa-trash-alt" />
            </Button>
          </Card.Header>
          <Card.Body>
            <Card.Title>{this.props.note.title}</Card.Title>
            <Card.Text dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
          </Card.Body>
        </Card>
      </Draggable>
    );
  }

  // TODO: auto-expanding input field? Seamless transition?
  // TODO: allow new lines / press Enter key without submitting
  renderNoteEditing() {
    return (
      <Draggable bounds="parent" handle=".handle" onStart={this.onFocus} onDrag={this.updateLocation} position={{ x: this.props.note.x, y: this.props.note.y }}>
        <Card id={this.id} className="noteCard" onClick={this.onFocus} style={{ zIndex: this.props.note.zIndex }}>
          <Card.Header className="noteCardHeader">
            <Button variant="light" className="handle">
              <i className="fas fa-expand-arrows-alt" />
            </Button>
            <Button variant="light" onClick={this.onCancelEditing}>
              <i className="far fa-edit" />
            </Button>
            <Button variant="light" onClick={this.onDelete}>
              <i className="fas fa-trash-alt" />
            </Button>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="editing-note-box">
                <Form.Control type="text" onChange={this.onInputChangeTitle} value={this.state.titleUnderEdit} placeholder="Note title" />
                <br />
                <Form.Control as="textarea" rows="5" onChange={this.onInputChangeText} value={this.state.textUnderEdit} placeholder="Note text (Markdown supported)" />
                <br />
                <Button variant="primary" onClick={this.onSubmitEditing}>Submit</Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Draggable>
    );
  }

  render() {
    if (this.state.isEditing) {
      return this.renderNoteEditing();
    } else {
      return this.renderNoteRegular();
    }
  }
}

export default Note;
