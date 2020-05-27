import { ActionTypes } from '../actions';

const initialState = {
  sessionID: '',
  playerIDs: [],
  currentPlayerID: '',
};

const LobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PLAYER_IDS:
      console.log(`action: ${action}`);
      return { ...state, playerIDs: action.playerIDs };
    case ActionTypes.SET_SESSION_ID:
      return { ...state, sessionID: action.sessionID };
    case ActionTypes.SET_CURRENT_PLAYER_ID:
      return { ...state, currentPlayerID: action.currentPlayerID };
    default:
      return state;
  }
};

export default LobbyReducer;
