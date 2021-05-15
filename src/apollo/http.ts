import { createHttpLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TOKEN } from "../constants";

const link = createHttpLink({
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

export const httpLink = authLink.concat(link);
