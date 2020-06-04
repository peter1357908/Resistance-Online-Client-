export const ActionTypes = {
  SET_SESSION_ID: 'SET_SESSION_ID',
  SET_PLAYER_IDS: 'SET_PLAYER_IDS',
  SET_CURRENT_PLAYER_ID: 'SET_CURRENT_PLAYER_ID',
  SET_CREATOR_ID: 'SET_CREATOR_ID',
  UPDATE_SELECTED_PLAYERS: 'UPDATE_SELECTED_PLAYERS',
  SET_SPIES: 'SET_SPIES',
  SET_PHASE: 'SET_PHASE',
  SET_CURRENT_LEADER: 'SET_CURRENT_LEADER',
  SET_WAITING_FOR: 'SET_WAITING_FOR',
  SET_ROUND: 'SET_ROUND',
  SET_ACTED: 'SET_ACTED',
};

export function setSessionID(sessionID) {
  return {
    type: ActionTypes.SET_SESSION_ID,
    sessionID,
  };
}

export function setPlayerIDs(playerIDs) {
  return {
    type: ActionTypes.SET_PLAYER_IDS,
    playerIDs,
  };
}

export function setCurrentPlayerID(currentPlayerID) {
  return {
    type: ActionTypes.SET_CURRENT_PLAYER_ID,
    currentPlayerID,
  };
}

export function setCreatorID(creatorID) {
  return {
    type: ActionTypes.SET_CREATOR_ID,
    creatorID,
  };
}

export function updateSelectedPlayers(selectedPlayers) {
  return {
    type: ActionTypes.UPDATE_SELECTED_PLAYERS,
    selectedPlayers,
  };
}

export function setSpies(spies) {
  return {
    type: ActionTypes.SET_SPIES,
    spies,
  };
}

export function setGamePhase(phase) {
  return {
    type: ActionTypes.SET_PHASE,
    phase,
  };
}

export function setCurrentLeader(currentLeader) {
  return {
    type: ActionTypes.SET_CURRENT_LEADER,
    currentLeader,
  };
}

export function setWaitingFor(waitingFor) {
  return {
    type: ActionTypes.SET_WAITING_FOR,
    waitingFor,
  };
}

export function setActed(acted) {
  return {
    type: ActionTypes.SET_ACTED,
    acted,
  };
}

export function setRound(currentLeader, currentMission, currentRound, missionSize) {
  console.log('setround action called');
  return {
    type: ActionTypes.SET_ROUND,
    currentLeader,
    currentMission,
    currentRound,
    missionSize,
  };
}
