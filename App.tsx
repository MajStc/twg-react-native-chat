import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/apollo/client";

import Rooms from "./src/views/Rooms";
import RoomDetails from "./src/views/RoomDetails";
import { Container } from "native-base";
import { Router, Scene } from "react-native-router-flux";

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
