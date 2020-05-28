import { ActionTypes } from '../actions';

// the phases the game can be in. The server should be responsible for telling each client what phase to be in
const Phase = {
    VIEWING_TEAM: 0,
    SELECTING_TEAM: 1, // note that this will be displayed differently depending on whether the client is the current leader or not
    VOTING_ON_TEAM: 2,
    VIEWING_VOTES: 3, // after a vote, people will have a chance to see how everybody voted. Upon clicking "ok", the game will proceed
    MISSION: 4, // note that this includes 2 possibilities: (1) the client is on the mission, in which case they'll
                // see a voting screen, and (2) the client is not in the mission, in which case they'll see a "mission
                // is ongoing" message. The client can use the "selectedPlayers" variable in the state to decide which one of
                // this to display.
}

const MissionStatus = {
    SUCCESS = 1,
    FAILURE = 2,
    TBD = 0,
}

const initialState = {
    playerIDs: [],
    currentLeader: '',  // whose turn it is
    currentMission: 1,
    currentRound: 1,
    missionStatuses: [MissionStatus.TBD, // the succeed/fail status of all 5 missions
        MissionStatus.TBD, 
        MissionStatus.TBD, 
        MissionStatus.TBD, 
        MissionStatus.TBD],
    selectedPlayers: [], // i.e. which cards should be displayed as enlarged and glowing
    gamePhase = Phase.VIEWING_TEAM,
    waitingOn = [] // the players we're waiting on 
};

// const InGameReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ActionTypes.:
//       return { ...state };
//     default:
//       return state;
//   }
// };

// export default InGameReducer;
