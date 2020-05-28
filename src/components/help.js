/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const useStyles = {
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  modal: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, .4)',
    zIndex: '1',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '.4s ease',
  },
  content: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    height: '95%',
    background: 'linear-gradient(48deg, rgba(0,42,50,1) 39%, rgba(39,142,148,1) 52%, rgba(0,42,50,1) 70%);',
    borderRadius: '10px',
  },
  modalDisplay: { opacity: '1', transform: 'scale(1)' },
  modalHide: { opacity: '0', transform: 'scale(0)' },
  theX: {
    cursor: 'pointer',
    alignSelf: 'flex-end',
    paddingRight: '15px',
    paddingTop: '15px',
  },
};

const HelpModal = (props) => {
  const showClassName = props.show ? `${props.classes.modal} ${props.classes.modalDisplay}` : `${props.classes.modal} ${props.classes.modalHide}`;

  return (
    <div className={showClassName}>
      <div className={props.classes.content}>
        <div className={props.classes.header}>
          <span>How to play:</span>
          <span className={props.classes.theX} onClick={props.closeModal}>&times;</span>
        </div>
        <div>
          <p>This is the help section</p>
          <p>Reeeeeeeeeeee</p>
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(HelpModal);
