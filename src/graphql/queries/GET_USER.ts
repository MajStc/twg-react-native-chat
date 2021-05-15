import gql from "graphql-tag";
import { UserType } from "../types/user";

export interface GET_USER_RESPONSE {
  user: UserType;
}

export const GET_USER = gql`
  {
    user {
      id
      email
      firstName
      lastName
      role
    }
  }
`;
