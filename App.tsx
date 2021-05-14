import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Rooms from "./src/views/Rooms";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TOKEN } from "./src/constants";

const httpLink = createHttpLink({
  uri: "https://chat.thewidlarzgroup.com/api/graphiql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: TOKEN,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(0,0,0)",
    background: "#F0F8FF",
    card: "#B6DEFD",
    text: "#5603AD",
    border: "#B6DEFD",
    notification: "rgb(255, 69, 58)",
  },
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Rooms" component={Rooms} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
