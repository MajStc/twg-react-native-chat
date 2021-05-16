import React from "react";
import { Text } from "react-native";

interface Props {
  message: string;
  color: string;
}

const LatestMessage = ({ message, color: setColor }: Props) => (
  <Text style={{ marginTop: 10, color: setColor }}>
    {message.length > 40 ? `${message.slice(0, 40)}...` : message}
  </Text>
);

export default LatestMessage;
