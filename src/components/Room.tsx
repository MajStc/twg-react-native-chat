import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { IRoom } from "../graphql/types/room";

interface Props {
  data: IRoom;
}

const Room = ({ data }: Props) => {
  return (
    <View style={styles.room}>
      <Text>{data.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  room: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: "10%",
    backgroundColor: "white",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Room;
