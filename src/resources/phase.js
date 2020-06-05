// the phases the game can be in. The server should be responsible for telling each client what phase to be in
export const Phase = {
  VIEWING_TEAM: 0,
  SELECTING_TEAM: 1, // note that this will be displayed differently depending on whether the client is the current leader or not
  VOTING_ON_TEAM: 2,
  VIEWING_VOTES: 3, // after a vote, people will have a chance to see how everybody voted. Upon clicking "ok", the game will proceed
  MISSION: 4, // note that this includes 2 possibilities: (1) the client is on the mission, in which case they'll
  //             see a voting screen, and (2) the client is not in the mission, in which case they'll see a "mission
  //             is ongoing" message. The client can use the "selectedPlayers" variable in the state to decide which one of
  //             this to display.
};

export function stringifyPhase(phase) {
  switch (phase) {
    case Phase.VIEWING_TEAM:
      return 'viewing-team';
    case Phase.SELECTING_TEAM:
      return 'selecting-team';
    case Phase.VOTING_ON_TEAM:
      return 'voting-on-team';
    case Phase.VIEWING_VOTES:
      return 'viewing-votes';
    case Phase.MISSION:
      return 'mission';
    default:
      return '';
  }
}
