/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const useStyles = {
  header: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 15px 0px 0px',
    height: '40px',
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
    width: '220px',
    height: '110px',
    backgroundColor: '#0B71AB',
    borderRadius: '6px',
  },
  info: { padding: '5px', textAlign: 'center', fontSize: '16px' },
  theX: {
    fontSize: '30px', fontWeight: '700', cursor: 'pointer', alignSelf: 'flex-end',
  },
  modalDisplay: { opacity: '1', transform: 'scale(1)' },
  modalHide: { opacity: '0', transform: 'scale(0)' },
};

const MissionSucceededModal = (props) => {
  const showClassName = props.show ? `${props.classes.modal} ${props.classes.modalDisplay}` : `${props.classes.modal} ${props.classes.modalHide}`;

  return (
    <div className={showClassName}>
      <div className={props.classes.content}>
        <div className={props.classes.header}>
          <div className={props.classes.theX} onClick={props.closeModal}>&times;</div>
        </div>
        <div className={props.classes.info}>
          <div className="missionOutcome">The mission SUCCEEDED</div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(MissionSucceededModal);
