import { combineReducers } from 'redux';

import LobbyReducer from './lobby-reducer';
import InGameReducer from './in-game-reducer';

const rootReducer = combineReducers({
  lobby: LobbyReducer,
  inGame: InGameReducer,
});

export default rootReducer;
