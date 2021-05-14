import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Room = () => {
  return (
    <View style={styles.room}>
      <Text>room</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  room: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Room;
