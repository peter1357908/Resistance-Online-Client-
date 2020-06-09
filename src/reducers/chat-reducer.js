import { ActionTypes } from '../actions';

const initialState = {
  chatLog: [], // an array of 2-element arrays, in the format of `[messageFrom, message]`
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CHAT_LOG:
      return { chatLog: action.chatLog };
    case ActionTypes.PUSH_CHAT_LOG:
      return { chatLog: [...state.chatLog, action.newChatArray] };
    default:
      return state;
  }
};

export default chatReducer;
