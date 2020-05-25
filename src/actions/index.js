export const ActionTypes = {
  SET_SESSION_ID: 'SET_SESSION_ID',
  SET_PLAYERS: 'SET_PLAYERS',
  SET_CURRENT_PLAYER: 'SET_CURRENT_PLAYER',
};

export function setSessionID(sessionID) {
  return {
    type: ActionTypes.SET_SESSION_ID,
    sessionID,
  };
}

export function setPlayers(gameInfo) {
  return {
    type: ActionTypes.SET_PLAYERS,
    players: gameInfo.playerIDs,
  };
}

export function setCurrentlayer(currentPlayer) {
  return {
    type: ActionTypes.SET_CURRENT_PLAYER,
    currentPlayer,
  };
}
