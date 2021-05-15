import { TOKEN } from "../constants";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";

const phoenixSocket = new PhoenixSocket(
  `wss://chat.thewidlarzgroup.com/socket`,
  {
    params: () => {
      return { token: TOKEN };
    },
  }
);

const absintheSocket = AbsintheSocket.create(phoenixSocket);

export const wsLink = createAbsintheSocketLink(absintheSocket);
