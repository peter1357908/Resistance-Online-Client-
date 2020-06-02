import Phase from '../resources/phase';
import MissionStatus from '../resources/mission-status';
import { ActionTypes } from '../actions';

// some of these values in initialState are intentionally initialized to something so that there's something to display
const initialState = {
  playerID: 'player1',
  playerIDs: ['player1', 'player2', 'player3', 'player4', 'player5', 'player6'],
  currentLeader: 'player1', // whose turn it is
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
  waitingOn: [], // the players we're waiting on
  faction: 'spy',
  otherSpies: ['player1', 'player2'], // empty if you're not a spy
  missionSize: 2, // how many players we need on the current mission,
  // TODO we'll also need some structure to store how people voted on the most recent round
};

const InGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SELECTED_PLAYERS:
      console.log('update method called in the reducer');
      console.log(action.selectedPlayers);
      return { ...state, numSelectedPlayers: action.selectedPlayers.length, selectedPlayers: action.selectedPlayers };
    default:
      return state;
  }
};

export default InGameReducer;
