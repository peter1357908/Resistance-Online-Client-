import React from 'react';
import Note from './note';

const NoteBoard = (props) => {
  let topZIndex = 0;

  // TODO: directly track the topZIndex in database
  props.notes.entrySeq().forEach(([id, note]) => {
    if (note.zIndex > topZIndex) {
      topZIndex = note.zIndex;
    }
  });

  const notes = props.notes.entrySeq().map(([id, note]) => {
    return <Note key={id} id={id} note={note} topZIndex={topZIndex} />;
  });

  return (
    <div id="note-board" className="noteBoard">
      {notes}
    </div>
  );
};

export default NoteBoard;
