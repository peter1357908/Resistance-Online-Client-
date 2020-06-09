export const ActionTypes = {
  // action types handled by lobby-reducer
  SET_SESSION_ID: 'SET_SESSION_ID',
  SET_CURRENT_PLAYER_ID: 'SET_CURRENT_PLAYER_ID',
  SET_CREATOR_ID: 'SET_CREATOR_ID',
  SET_FAILED: 'SET_FAILED',
  SET_FAIL_MESSAGE: 'SET_FAIL_MESSAGE',
  // action types handled by in-game-reducer
  SET_PLAYER_ID: 'SET_PLAYER_ID',
  SET_PLAYER_IDS: 'SET_PLAYER_IDS',
  SET_CURRENT_LEADER: 'SET_CURRENT_LEADER',
  SET_CURRENT_MISSION: 'SET_CURRENT_MISSION',
  SET_MISSION_SIZE: 'SET_MISSION_SIZE',
  SET_MISSION_SIZES: 'SET_MISSION_SIZES',
  SET_CURRENT_ROUND: 'SET_CURRENT_ROUND',
  SET_MISSION_STATUSES: 'SET_MISSION_STATUSES',
  SET_MISSION_STATUS: 'SET_MISSION_STATUS',
  SET_SELECTED_PLAYERS: 'SET_SELECTED_PLAYERS',
  SET_GAME_PHASE: 'SET_GAME_PHASE',
  SET_WAITING_FOR: 'SET_WAITING_FOR',
  SET_FACTION: 'SET_FACTION',
  SET_SPIES: 'SET_SPIES',
  SET_VOTES: 'SET_VOTES',
  SET_ROUND_OUTCOME: 'SET_ROUND_OUTCOME',
  SET_ACTED: 'SET_ACTED',
  SET_CHAT_LOG: 'SET_CHAT_LOG',
  PUSH_CHAT_LOG: 'PUSH_CHAT_LOG',
  SET_MODAL_TO_DISPLAY: 'SET_MODAL_TO_DISPLAY',
  SET_NUM_FAIL_VOTES: 'SET_NUM_FAIL_VOTES',
  // action types handled by post-game-reducer
  SET_VICTORIOUS_FACTION: 'SET_VICTORIOUS_FACTION',
  SET_GAME_HISTORY: 'SET_GAME_HISTORY',
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

export function setFailed(failed) {
  return {
    type: ActionTypes.SET_FAILED,
    failed,
  };
}

export function setFailMessage(failMessage) {
  return {
    type: ActionTypes.SET_FAIL_MESSAGE,
    failMessage,
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

export function setMissionSizes(missionSizes) {
  return {
    type: ActionTypes.SET_MISSION_SIZES,
    missionSizes,
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

export function setMissionStatus(mission, missionStatus) { // mission is an integer from 1 to 5
  return {
    type: ActionTypes.SET_MISSION_STATUS,
    mission,
    missionStatus,
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

export function setVotes(votes) {
  return {
    type: ActionTypes.SET_VOTES,
    votes,
  };
}

export function setRoundOutcome(roundOutcome) {
  return {
    type: ActionTypes.SET_ROUND_OUTCOME,
    roundOutcome,
  };
}

export function setActed(acted) {
  return {
    type: ActionTypes.SET_ACTED,
    acted,
  };
}

export function setChatLog(chatLog) {
  return {
    type: ActionTypes.SET_CHAT_LOG,
    chatLog,
  };
}

export function pushChatMessage(newChatArray) {
  return {
    type: ActionTypes.PUSH_CHAT_LOG,
    newChatArray,
  };
}

export function setModalToDisplay(modalToDisplay) {
  return {
    type: ActionTypes.SET_MODAL_TO_DISPLAY,
    modalToDisplay,
  };
}

export function setNumFailVotes(numFailVotes) {
  return {
    type: ActionTypes.SET_NUM_FAIL_VOTES,
    numFailVotes,
  };
}

// post-game-reducer methods
export function setVictoriousFaction(victoriousFaction) {
  return {
    type: ActionTypes.SET_VICTORIOUS_FACTION,
    victoriousFaction,
  };
}

export function setGameHistory(gameHistory) {
  return {
    type: ActionTypes.SET_GAME_HISTORY,
    gameHistory,
  };
}
