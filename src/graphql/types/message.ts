import { UserType } from "./user";

export interface Message {
  body: string;
  id: string;
  insertedAt: string;
  user: UserType;
}
