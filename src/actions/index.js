export const ActionTypes = {
  SET_SESSION_ID: 'SET_SESSION_ID',
  SET_PLAYER_IDS: 'SET_PLAYER_IDS',
  SET_CURRENT_PLAYER_ID: 'SET_CURRENT_PLAYER_ID',
  SET_CREATOR_ID: 'SET_CREATOR_ID',
  UPDATE_SELECTED_PLAYERS: 'UPDATE_SELECTED_PLAYERS',
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
