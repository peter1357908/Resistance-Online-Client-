import { ActionTypes } from '../actions';

const initialState = {
  sessionID: '',
  players: [],
  currentPlayer: '',
};

const PreGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PLAYERS:
      console.log(action);
      return { ...state, players: action.players };
    case ActionTypes.SET_SESSION_ID:
      return { ...state, sessionID: action.sessionID };
    case ActionTypes.SET_CURRENT_PLAYER:
      return { ...state, currentPlayer: action.currentPlayer };
    default:
      return state;
  }
};

export default PreGameReducer;
