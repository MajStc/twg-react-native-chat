import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import { TOKEN } from "../constants";

const phoenixSocket = new PhoenixSocket(
  `wss://chat.thewidlarzgroup.com/socket?token=${TOKEN}`,
  { params: () => TOKEN }
);

const absintheSocket = AbsintheSocket.create(phoenixSocket);
export const wsLink = createAbsintheSocketLink(absintheSocket);
