import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Welcome = (props) => {
  return (
    <div className="vertical-flex welcome-container">
      <div className="title-text">
        Welcome to Resistance Online
      </div>
      <div className="horizontal-flex">
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
