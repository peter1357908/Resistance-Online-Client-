/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const useStyles = {
  header: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
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
    background: 'linear-gradient(147deg, rgba(21,60,79,1) 42%, rgba(108,124,147,1) 52%, rgba(21,60,79,1) 62%);',
    borderRadius: '10px',
  },
  info: { padding: '20px', textAlign: 'center', fontSize: '20px' },
  theX: {
    fontSize: '30px', fontWeight: '700', cursor: 'pointer', alignSelf: 'flex-end',
  },
  modalDisplay: { opacity: '1', transform: 'scale(1)' },
  modalHide: { opacity: '0', transform: 'scale(0)' },
};

const DirectionsModal = (props) => {
  const showClassName = props.show ? `${props.classes.modal} ${props.classes.modalDisplay}` : `${props.classes.modal} ${props.classes.modalHide}`;

  return (
    <div className={showClassName}>
      <div className={props.classes.content}>
        <div className={props.classes.header}>
          <span className={props.classes.theX} onClick={props.closeModal}>&times;</span>
        </div>
        <div className={props.classes.info}>
          <p>To start off, each player will randomly be assigned a role. You will either be in the Resistance, or be a Spy. A random person will be selected
            as the Team leader, and is in charge of selecting the people who will go on the mission. Each mission requires a certain amount of players
            indicated by the mission table on the board and a majority vote.
          </p>
          <p>For a mission to succeed, it requires every single person on the team to vote PASS, otherwise the mission will fail. The board also contains the vote track,
            which will display the number of failed votes for the current mission, it will reset on a successful mission vote. If everyone fails to pass a team 5 times
            for a single mission, the game is over and the Spys win! (You cant win a fight if youre taking 3000 years to make a decision)
          </p>
          <span>If you are in the <strong>Resistance:</strong></span>
          <p>You win by passing 3 missions!</p>
          <span>If you are a <strong>Spy:</strong></span>
          <p> You win by failing 3 missions, OR if the Resistance is unable to organize a mission team at any point in the game (5 failed votes on a single mission.)</p>
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(DirectionsModal);
