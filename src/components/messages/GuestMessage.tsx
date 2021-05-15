import React from "react";
import { View, Text } from "native-base";
import { StyleSheet } from "react-native";
import { Message } from "../../graphql/types/message";

interface Props {
  message: Message;
}

const GuestMessage = ({ message }: Props) => (
  <>
    <View style={styles.guset}>
      <Text style={{ textAlign: "left" }}>{message.body}</Text>
    </View>
    <Text style={{ fontSize: 10 }}>{message.insertedAt}</Text>
  </>
);

const styles = StyleSheet.create({
  guset: {
    width: "60%",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 14,
    borderBottomLeftRadius: 0,
  },
});

export default GuestMessage;
