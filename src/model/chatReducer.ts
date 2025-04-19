import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState: MessageType[] = [];

export const getChatAC = createAction<{ response: ResponceType[] }>(
  "chatReducer/getChat"
);
export const clearDataAC = createAction("chatReducer/clearData");

const getActualDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleTimeString().slice(0, 5);
};

export const chatReducer = createReducer(initialState, (builder) => {
  builder.addCase(getChatAC, (state, action) => {
    const newState = action.payload.response.map((message) => ({
      uuid: message.uuid,
      name: message.playerDisplayName.displayName,
      time: getActualDate(message.createDateTime),
      text: message.text,
    }));
    return newState;
  });
});

type MessageType = {
  uuid: string;
  name: string;
  time: string;
  text: string;
};

type ResponceType = {
  uuid: string;
  playerDisplayName: PlayerDisplayName;
  createDateTime: string;
  text: string;
  channel: number;
};

type PlayerDisplayName = {
  uuid: string;
  displayName: string;
  player: PlayerType;
};

type PlayerType = {
  uuid: string;
  steamID: string;
  displayName: string;
};
