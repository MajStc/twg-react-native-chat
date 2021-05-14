import { useQuery } from "@apollo/client";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IRoom } from "../graphql/types/room";
import { GET_ROOMS, ROOMS_RESPONSE } from "../graphql/queries/GET_ROOMS";
import { GET_USER } from "../graphql/queries/GET_USER";
import Room from "../components/Room";

const Rooms = () => {
  const { data, error, loading } = useQuery<ROOMS_RESPONSE>(GET_ROOMS);

  if (loading) return <Text>Loadingg...</Text>;

  const rooms = data?.usersRooms.rooms;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {rooms && rooms.map((room) => <Room key={room.id} data={{ ...room }} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});

export default Rooms;
