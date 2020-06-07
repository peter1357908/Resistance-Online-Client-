export const ActionTypes = {
  // action types handled by lobby-reducer
  SET_SESSION_ID: 'SET_SESSION_ID',
  SET_CURRENT_PLAYER_ID: 'SET_CURRENT_PLAYER_ID',
  SET_CREATOR_ID: 'SET_CREATOR_ID',
  // action types handled by in-game-reducer
  SET_PLAYER_ID: 'SET_PLAYER_ID',
  SET_PLAYER_IDS: 'SET_PLAYER_IDS',
  SET_CURRENT_LEADER: 'SET_CURRENT_LEADER',
  SET_CURRENT_MISSION: 'SET_CURRENT_MISSION',
  SET_MISSION_SIZE: 'SET_MISSION_SIZE',
  SET_CURRENT_ROUND: 'SET_CURRENT_ROUND',
  SET_MISSION_STATUSES: 'SET_MISSION_STATUSES',
  SET_SELECTED_PLAYERS: 'SET_SELECTED_PLAYERS',
  SET_GAME_PHASE: 'SET_GAME_PHASE',
  SET_WAITING_FOR: 'SET_WAITING_FOR',
  SET_FACTION: 'SET_FACTION',
  SET_SPIES: 'SET_SPIES',
  SET_VOTES: 'SET_VOTES',
  SET_ACTED: 'SET_ACTED',
  SET_LOGS: 'SET_LOGS',
};

// lobby-reducer methods
export function setSessionID(sessionID) {
  return {
    type: ActionTypes.SET_SESSION_ID,
    sessionID,
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

// in-game-reducer methods
export function setPlayerID(playerID) {
  return {
    type: ActionTypes.SET_PLAYER_ID,
    playerID,
  };
}

export function setPlayerIDs(playerIDs) {
  return {
    type: ActionTypes.SET_PLAYER_IDS,
    playerIDs,
  };
}

export function setCurrentLeader(currentLeader) {
  return {
    type: ActionTypes.SET_CURRENT_LEADER,
    currentLeader,
  };
}

export function setCurrentMission(currentMission) {
  return {
    type: ActionTypes.SET_CURRENT_MISSION,
    currentMission,
  };
}

export function setMissionSize(missionSize) {
  return {
    type: ActionTypes.SET_MISSION_SIZE,
    missionSize,
  };
}

export function setCurrentRound(currentRound) {
  return {
    type: ActionTypes.SET_CURRENT_ROUND,
    currentRound,
  };
}

export function setMissionStatuses(missionStatuses) {
  return {
    type: ActionTypes.SET_MISSION_STATUSES,
    missionStatuses,
  };
}

export function setSelectedPlayers(selectedPlayers) {
  return {
    type: ActionTypes.SET_SELECTED_PLAYERS,
    selectedPlayers,
  };
}

export function setGamePhase(phase) {
  return {
    type: ActionTypes.SET_GAME_PHASE,
    phase,
  };
}

export function setWaitingFor(waitingFor) {
  return {
    type: ActionTypes.SET_WAITING_FOR,
    waitingFor,
  };
}

export function setFaction(faction) {
  return {
    type: ActionTypes.SET_FACTION,
    faction,
  };
}

export function setSpies(spies) {
  return {
    type: ActionTypes.SET_SPIES,
    spies,
  };
}

export function setActed(acted) {
  return {
    type: ActionTypes.SET_ACTED,
    acted,
  };
}

export function setVotes(votes) {
  return {
    type: ActionTypes.SET_VOTES,
    votes,
  };
}

export function setLogs(logs) {
  return {
    type: ActionTypes.SET_LOGS,
    logs,
  };
}
