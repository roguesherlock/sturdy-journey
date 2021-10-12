import React from "react";
import { Socket, Channel, Push } from "phoenix";

export enum SocketStates {
  UNINSTANTIATED = -1,
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED,
}

export enum ChannelStates {
  CLOSED,
  ERRORED,
  JOINED,
  JOINING,
  LEAVING,
}

export type SocketHook = {
  socketState: SocketStates;
  socket: typeof Socket | undefined;
  socketConnect: () => void;
  socketDisconnect: (callback?: any, code?: any, reason?: any) => void;
  socketHandleMessage: (callback: (arg0: object) => void) => string;
};

export type ChannelHook = {
  channelState: ChannelStates;
  channel: typeof Channel;
  handleChannelEvent: (event: any, callback: (arg0: object) => void) => number;
  pushChannelEvent: (event: any, payload: any, timeout?: any) => typeof Push;
  leaveChannel: (timeout?: any) => void;
};

export const PhoenixContext = React.createContext({
  socket: undefined,
} as SocketHook);
