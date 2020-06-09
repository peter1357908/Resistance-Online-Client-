import { combineReducers } from 'redux';

import LobbyReducer from './lobby-reducer';
import InGameReducer from './in-game-reducer';
import PostGameReducer from './post-game-reducer';
import chatReducer from './chat-reducer';

const rootReducer = combineReducers({
  lobby: LobbyReducer,
  inGame: InGameReducer,
  postGame: PostGameReducer,
  chat: chatReducer,
});

export default rootReducer;
