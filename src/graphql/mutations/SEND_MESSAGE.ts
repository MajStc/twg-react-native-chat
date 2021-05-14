import gql from "graphql-tag";
import { Message } from "../types/message";

export interface SEND_MESSAGE_RESPONSE {
  sendMessage: Message;
}

export const SEND_MESSAGE = gql`
  mutation SendMessage($body: String!, $roomId: String!) {
    sendMessage(body: $body, roomId: $roomId) {
      body
    }
  }
`;
