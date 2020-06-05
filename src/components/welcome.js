import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from './modal';

const Welcome = (props) => {
  return (
    <div className="vertical-flex welcome-container">
      <Modal />
      <div className="title-text">
        <div>Welcome to Resistance Online</div>
      </div>
      <div className="horizontal-flex-center bottom-navigation">
        <Link to="/join-game">
          <Button variant="primary">
            Join Game
          </Button>
        </Link>
        <Link to="/create-game">
          <Button variant="primary">
            Create Game
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
