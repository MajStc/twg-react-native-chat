import gql from "graphql-tag";
import { Message } from "../types/message";
import { UserType } from "../types/user";

export interface ROOM_REPSONSE {
  room: {
    id: string;
    name: string;
    roomPic: string;
    user: UserType;
    messages: [Message];
  };
}

export const GET_ROOM = gql`
  query Rooms($id: String!) {
    room(id: $id) {
      id
      name
      roomPic
      user {
        email
        firstName
        id
        lastName
        profilePic
        role
      }
      messages {
        body
        id
        insertedAt
        user {
          email
          firstName
          id
          lastName
          profilePic
          role
        }
      }
    }
  }
`;
