export interface FriendData {
  login42: string;
  name: string;
  status: string;
  avatar: string;
}

export interface UserFriends {
  friends: FriendData[];
  pending: FriendData[];
  requests: FriendData[];
}

export interface UserData {
  id: number;
  name: string;
  login42: string;
  elo: number;
  eloHistory: number[];
  status?: TUserStatus;
  wins: number;
  losses: number;
  avatar: string;
  bio?: string;
}

// /game/id
export interface GameHistory {
  player_left: number;
  player_right: number;
  result: number;
}

export type TUserStatus = "ONLINE" | "OFFLINE" | "UNAVAILABLE" | "INGAME" | undefined;

// --------- user
export interface IUsersAll {
  page?: number;
  status?: TUserStatus;
  name?: string;
}

// I think it's better we use convoMessage[] as the type instead
// export type ConvoMessages = ConvoMessage[];

// --------- conversations / directmessages / dm

export interface ConvoMessage {
  id: number;
  senderLogin42: string;
  content: string;
  sentAt: string;
}

export interface Converstaion {
  id: number;
  user1Login42: string;
  user2Login42: string;
}

// --------- chatrooms / chat

export type ChatroomStaus = "PUBLIC" | "PRIVATE" | "PROTECTED";

export interface IChatroom {
  id: number;
  name: string;
  ownerLogin42: string;
  status: ChatroomStaus;
}

export interface ChatroomPost {
  ownerLogin42: string;
  name: string;
  status: ChatroomStaus;
  password?: string;
}

export interface IMessage {
  id: number;
  senderLogin42: string;
  content: string;
  sentAt: string;
}

export interface IMessagePost {
  senderLogin42: string;
  content: string;
}

export type TChatroomRole = "MEMBER" | "ADMIN" | "OWNER";

export interface IMember {
  login42: string;
  role: TChatroomRole;
  isMuted: boolean;
}

export interface IPutUserProfile {
  bio?: string;
  displayName?: string;
}

// --------- pongRoom / pong

export type twoDimension = { width: number; height: number };
export interface gameState {
  p1: player;
  p2: player;
  ball: ball;
  timerAfk: number;
  //gameType: bool;
}
export interface ball {
  pos: pos;
  radius: number;
  speed: number;
  direction: pos;
}
export interface pos {
  x: number;
  y: number;
}

export interface dim {
  w: number;
  h: number;
}

export interface player {
  pos: pos;
  dim: dim;
  score: number;
  moveUp: boolean;
  moveDown: boolean;
  id: string;
  afk: boolean;
}