import { Client } from "socket.io/dist/client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface IUser {
  id: number;
  nickname: string;
  // email: string;
  // Workspaces: IWorkspace[];
}

export enum UserStatus {
  me,
  login,
  logout,
  ingame,
}

export interface IUser2 {
  client: Client<DefaultEventsMap, DefaultEventsMap,DefaultEventsMap, any>;
  client_id: string;
  intra: string;
  nickname?: string;
  avatar?: string;
  status?: UserStatus;
}


export interface IUserWithOnline extends IUser {
  online: boolean;
}

export interface IChannel {
  id: number;
  name: string;
  private: boolean;
  WorkspaceId: number;
}

export interface IChat {
  id: number;
  UserId: number;
  User: IUser;
  content: string;
  createdAt: Date;
  ChannelId: number;
  Channel: IChannel;
}

export interface IDM {
  id: number;
  SenderId: number;
  Sender: IUser;
  ReceiverId: number;
  Receiver: IUser;
  content: string;
  createdAt: Date;
}

export interface IWorkspace {
  id: number;
  name: string;
  url: string;
  OwnerId: number;
}
