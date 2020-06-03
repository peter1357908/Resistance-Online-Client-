import Phase from '../resources/phase';
import MissionStatus from '../resources/mission-status';
import { ActionTypes } from '../actions';

// some of these values in initialState are intentionally initialized to something so that there's something to display
const initialState = {
  playerID: '',
  playerIDs: [],
  currentLeader: '', // whose turn it is
  currentMission: 1,
  currentRound: 1,
  missionStatuses: [
    MissionStatus.SUCCEEDED, // the success/failure status of all 5 missions
    MissionStatus.FAILED,
    MissionStatus.TBD,
    MissionStatus.TBD,
    MissionStatus.TBD,
  ],
  selectedPlayers: [], // i.e. which cards should be displayed as enlarged and glowing
  numSelectedPlayers: 0, // this is not really needed, but it's fixing a bug where the board doesn't refresh when selectedPlayers changes
  gamePhase: Phase.VIEWING_TEAM,
  waitingFor: [], // the players we're waiting on
  faction: 'resistance',
  spies: [], // empty if you're not a spy
  missionSize: 2, // how many players we need on the current mission,
  // TODO we'll also need some structure to store how people voted on the most recent round
  logs: [],
};

const InGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SELECTED_PLAYERS:
      console.log('update method called in the reducer');
      console.log(action.selectedPlayers);
      return { ...state, numSelectedPlayers: action.selectedPlayers.length, selectedPlayers: action.selectedPlayers };
    case ActionTypes.SET_SPIES:
      console.log('spy_method in reducer');
      return { ...state, faction: 'spy', spies: action.spies };
    case ActionTypes.SET_PLAYER_IDS:
      return { ...state, playerIDs: action.playerIDs };
    case ActionTypes.SET_PHASE:
      return { ...state, gamePhase: action.phase };
    case ActionTypes.SET_CURRENT_LEADER:
      return { ...state, currentLeader: action.currentLeader };
    case ActionTypes.SET_WAITING_FOR:
      return { ...state, waitingFor: action.waitingFor };
    case ActionTypes.SET_ROUND:
      console.log('setround reducer called');
      return {
        ...state, currentLeader: action.currentLeader, currentMission: action.currentMission, currentRound: action.currentRound,
      };
    case ActionTypes.SET_LOGS:
      return { ...state, logs: action.logs };
    default:
      return state;
  }
};

export default InGameReducer;
