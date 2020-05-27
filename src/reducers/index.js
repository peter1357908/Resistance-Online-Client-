import { combineReducers } from 'redux';

import LobbyReducer from './lobby-reducer';

const rootReducer = combineReducers({
  lobby: LobbyReducer,
});

export default rootReducer;
