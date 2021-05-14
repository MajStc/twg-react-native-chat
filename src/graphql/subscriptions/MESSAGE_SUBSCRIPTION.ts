import gql from "graphql-tag";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageSubscription($roomId: String!) {
    messageAdded(roomId: $roomId) {
      body
    }
  }
`;
