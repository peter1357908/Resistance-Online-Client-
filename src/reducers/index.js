import { combineReducers } from 'redux';

import LobbyReducer from './lobby-reducer';
import InGameReducer from './in-game-reducer';
import PostGameReducer from './post-game-reducer';

const rootReducer = combineReducers({
  lobby: LobbyReducer,
  inGame: InGameReducer,
  postGame: PostGameReducer,
});

export default rootReducer;
