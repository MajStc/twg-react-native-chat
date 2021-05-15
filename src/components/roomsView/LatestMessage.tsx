import React from "react";
import { Text } from "react-native";

interface Props {
  message: String;
}

const LatestMessage = ({ message }: Props) => {
  return (
    <Text style={{ marginTop: 10 }}>
      {message.length > 40 ? `${message.slice(0, 40)}...` : message}
    </Text>
  );
};

export default LatestMessage;
