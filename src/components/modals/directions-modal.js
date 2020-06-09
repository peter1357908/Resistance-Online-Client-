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
    background: 'linear-gradient(147deg, rgba(21,60,79,1) 42%, rgba(49, 98, 122,1) 52%, rgba(21,60,79,1) 62%);',
    borderRadius: '10px',
  },
  info: { padding: '20px', textAlign: 'center', fontSize: '16px' },
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
          <p>Resistance is a hidden identity game. At the start of the game, each player is randomly assigned to one of two factions:
            the <strong>Resistance</strong> and the <strong>spies</strong>. Each spy is told who the other spies are, but the players on the
            Resistance are told nothing.
          </p>
          <p>The main structure of the game revolves around <strong>missions</strong>. The members of the Resistance want to plan and carry out
            successful missions, and the spies want to sabotage those missions.
          </p>
          <p>Here’s how that works. The players take turns being the <strong>leader</strong>. On a given turn, the leader will nominate several players
            to be on a mission. The exact number of players the leader nominates depends on how  many people are playing and on what stage of the game you’re in,
            but don’t worry – the game will tell you.
          </p>
          <p>After the nomination, all players in the game vote on whether they approve the team for the mission. If more than half the players vote yes,
            the nominated players are now officially on the mission.
          </p>
          <p>At this point (i.e. once the mission has begun), each player on the mission is given choice: let the mission <strong>succeed</strong>, or cause it to <strong>fail</strong>.
            For the mission to succeed, all players on the mission must vote ‘succeed’. It only takes a single player to sabotage it.
          </p>
          <p> Once all the players on the mission have decided how to act, the mission outcome (succeed or fail) is shown to everybody – but the individual
            succeed/fail actions are kept secret. At this point, the next player (in order) becomes the leader, and the game repeats.
          </p>
          <p><strong>Winning conditions:</strong></p>
          <p>Resistance wins when three missions succeed.</p>
          <p>Spies win when three missions fail, OR if everybody fails five times in a row to agree on a team for a mission.</p>
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(DirectionsModal);
