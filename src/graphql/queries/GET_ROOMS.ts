import { gql } from "@apollo/client";
import { IRoom } from "../types/room";

export type ROOMS_RESPONSE = {
  usersRooms: {
    rooms: [IRoom];
  };
};

export const GET_ROOMS = gql`
  {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`;
