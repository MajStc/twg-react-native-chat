import { useQuery } from "@apollo/client";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Room from "../components/Room";
import { GET_ROOMS } from "../graphql/queries/GET_ROOMS";

const Rooms = () => {
  const { data, loading } = useQuery(GET_ROOMS);

  if (loading) return <Text>Loadingg...</Text>;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{data}</Text>
      <Room />
      <Room />
      <Room />
      <TouchableOpacity>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Create new Room</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: "#5603AD",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
  },
});

export default Rooms;
