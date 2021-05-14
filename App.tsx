import React from "react";
import Rooms from "./src/views/Rooms";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TOKEN } from "./src/constants";
import { Container } from "native-base";

import { Router, Scene } from "react-native-router-flux";
import RoomDetails from "./src/views/RoomDetails";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new WebSocketLink({
  uri: "wss://chat.thewidlarzgroup.com/socket",
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: "https://chat.thewidlarzgroup.com/api/graphiql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${TOKEN}`,
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Container>
          <Scene
            key="rooms"
            title="rooms"
            component={Rooms}
            initial={true}
            hideNavBar={true}
          />
          <Scene
            key="roomdetails"
            title="room-details"
            component={RoomDetails}
            hideNavBar={true}
          />
        </Container>
      </Router>
    </ApolloProvider>
  );
};

export default App;
