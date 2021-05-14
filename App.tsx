import React from "react";
import Rooms from "./src/views/Rooms";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TOKEN } from "./src/constants";
import { Container } from "native-base";

import { Router, Scene } from "react-native-router-flux";
import RoomDetails from "./src/views/RoomDetails";

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
