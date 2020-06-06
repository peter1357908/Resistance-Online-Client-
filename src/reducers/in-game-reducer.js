import { Phase } from '../resources/phase';
import MissionStatus from '../resources/mission-status';
import { ActionTypes } from '../actions';

// some of these values in initialState are intentionally initialized to something so that there's something to display
const initialState = {
  playerID: 'player1',
  playerIDs: ['player1', 'player2', 'player3', 'player4', 'player5', 'player6'],
  currentLeader: 'player1', // whose turn it is
  currentMission: 1,
  missionSize: 2, // how many players we need on the current mission,
  currentRound: 1,
  missionStatuses: [
    MissionStatus.FAILED, // the success/failure status of all 5 missions
    MissionStatus.TBD,
    MissionStatus.TBD,
    MissionStatus.TBD,
    MissionStatus.TBD,
  ],
  selectedPlayers: ['player1', 'player2'], // i.e. which cards should be displayed as enlarged and glowing
  numSelectedPlayers: 2, // this is not really needed, but it's fixing a bug where the board doesn't refresh when selectedPlayers changes
  gamePhase: Phase.SELECTING_TEAM,
  waitingFor: ['player3', 'player4', 'player5'], // the players we're waiting on
  faction: 'resistance',
  spies: [], // empty if you're not a spy
  votes: ['yes', 'no', 'yes', 'yes', 'yes', 'no'], // how people voted on the most recent round
  // ^ we may eventually find a better structure to store the votes
  acted: false, // whether or not the player has done the action required in the current round, e.g., clicking "ok", voting, etc.
  logs: [], // the message logs
};

const InGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PLAYER_ID:
      return { ...state, playerID: action.playerID };
    case ActionTypes.SET_PLAYER_IDS:
      return { ...state, playerIDs: action.playerIDs };
    case ActionTypes.SET_CURRENT_LEADER:
      return { ...state, currentLeader: action.currentLeader };
    case ActionTypes.SET_CURRENT_MISSION:
      return { ...state, currentMission: action.currentMission };
    case ActionTypes.SET_MISSION_SIZE:
      return { ...state, missionSize: action.missionSize };
    case ActionTypes.SET_CURRENT_ROUND:
      return { ...state, currentRound: action.currentRound };
    case ActionTypes.SET_MISSION_STATUSES:
      return { ...state, missionStatuses: action.missionStatuses };
    case ActionTypes.SET_SELECTED_PLAYERS:
      return { ...state, numSelectedPlayers: action.selectedPlayers.length, selectedPlayers: action.selectedPlayers };
    case ActionTypes.SET_GAME_PHASE:
      return { ...state, gamePhase: action.phase };
    case ActionTypes.SET_WAITING_FOR:
      return { ...state, waitingFor: action.waitingFor };
    case ActionTypes.SET_FACTION:
      return { ...state, faction: action.faction };
    case ActionTypes.SET_SPIES:
      return { ...state, spies: action.spies };
    case ActionTypes.SET_ACTED:
      return { ...state, acted: action.acted };
    case ActionTypes.SET_LOGS:
      return { ...state, logs: action.logs };
    default:
      return state;
  }
};

export default InGameReducer;
