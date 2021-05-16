import { gql } from "@apollo/client";
import { SingleRoomType } from "../types/singleRoomType";

export type ROOMS_RESPONSE = {
  usersRooms: {
    rooms: [SingleRoomType];
  };
};

export const GET_ROOMS = gql`
  {
    usersRooms {
      rooms {
        id
        name
        roomPic
      }
    }
  }
`;
