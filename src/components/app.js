import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';

const App = (props) => {
  return (
    <Router>
      <div id="app-container">
        <Routes />
      </div>
    </Router>
  );
};

export default App;
