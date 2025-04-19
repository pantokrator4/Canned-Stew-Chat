import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState: PlayerType[] = [];

export const getServerAndPlayersInfoAC = createAction<{
  response: PlayersResponseType;
}>("gameServerAndPlayersInfo/playersList");

export const playersReducer = createReducer(initialState, (builder) => {
  builder.addCase(getServerAndPlayersInfoAC, (state, action) => {
    const newState: PlayerType[] = action.payload.response.playerSessions.map(
      (player) => ({
        uuid: player.player.uuid,
        steamID: player.player.steamID,
        displayName: player.player.displayName,
      })
    );
    return newState;
  });
});

type PlayerType = {
  uuid: string;
  steamID: string;
  displayName: string;
};

type GameServerInfoType = {
  lastUpdateTimestamp: string;
  hostname: string;
  description: string;
  url: string;
  headerImage: string;
  playersCount: number;
  maxPlayersCount: number;
  online: boolean;
};

type PlayerInfoType = {
  uuid: string;
  player: PlayerType;
  connectDateTime: string;
};

type PlayersResponseType = {
  uuid: string;
  address: string;
  port: number;
  gameServerInfo: GameServerInfoType;
  playerSessions: PlayerInfoType[];
};
