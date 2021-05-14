import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  {
    usersRooms {
      user {
        email
        firstName
      }
      rooms {
        id
        name
      }
    }
  }
`;
