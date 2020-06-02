import Phase from '../resources/phase';
import MissionStatus from '../resources/mission-status';

// some of these values in initialState are intentionally initialized to something so that there's something to display
const initialState = {
  playerIDs: [1, 2, 3, 4, 5, 6],
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
  selectedPlayers: [1, 2], // i.e. which cards should be displayed as enlarged and glowing
  gamePhase: Phase.SELECTING_TEAM,
  waitingOn: [], // the players we're waiting on
};

const InGameReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default InGameReducer;
