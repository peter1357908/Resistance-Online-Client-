import { combineReducers } from 'redux';

import PreGameReducer from './pre-game-reducer';

const rootReducer = combineReducers({
  preGame: PreGameReducer,
});

export default rootReducer;
