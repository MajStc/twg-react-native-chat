import { Message } from "./message";
import { UserType } from "./user";

export interface IRoom {
  id: string;
  messages: [Message];
  name: string;
  roomPic: string;
  user: UserType;
}
