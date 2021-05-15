import React from "react";
import { View, Text } from "native-base";
import { StyleSheet } from "react-native";
import { Message } from "../../graphql/types/message";

interface Props {
  message: Message;
}

const MyMessage = ({ message }: Props) => {
  return (
    <>
      <View style={styles.me}>
        <Text style={{ color: "white" }}>{message.body}</Text>
      </View>
      <Text style={{ fontSize: 10, textAlign: "right" }}>
        {message.insertedAt}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  me: {
    width: "60%",
    padding: 10,
    borderRadius: 14,
    backgroundColor: "#993AFC",
    borderBottomRightRadius: 0,
    alignSelf: "flex-end",
  },
});

export default MyMessage;
