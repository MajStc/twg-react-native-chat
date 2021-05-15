import gql from "graphql-tag";
import { Message } from "../types/message";

export interface MESSAGE_SUBSCRIPTION_RESPONSE {
  messageAdded: Message;
}

export const MESSAGE_SUBSCRIPTION = gql`
  subscription ($roomId: String!) {
    messageAdded(roomId: $roomId) {
      body
      id
      insertedAt
    }
  }
`;
