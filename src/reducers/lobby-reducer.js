import { ActionTypes } from '../actions';

const initialState = {
  sessionID: '',
  playerIDs: [],
  currentPlayerID: 'player1',
  creatorID: '',
  failed: false,
  failMessage: '',
};

const LobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PLAYER_IDS:
      return { ...state, playerIDs: action.playerIDs };
    case ActionTypes.SET_SESSION_ID:
      return { ...state, sessionID: action.sessionID };
    case ActionTypes.SET_CURRENT_PLAYER_ID:
      return { ...state, currentPlayerID: action.currentPlayerID };
    case ActionTypes.SET_CREATOR_ID:
      return { ...state, creatorID: action.creatorID };
    case ActionTypes.SET_FAILED:
      return { ...state, failed: action.failed };
    case ActionTypes.SET_FAIL_MESSAGE:
      return { ...state, failMessage: action.failMessage };
    default:
      return state;
  }
};

export default LobbyReducer;
