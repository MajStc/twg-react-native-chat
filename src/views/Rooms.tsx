import { useQuery } from "@apollo/client";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GET_ROOMS, ROOMS_RESPONSE } from "../graphql/queries/GET_ROOMS";
import Room from "../components/Room";
import { Spinner } from "native-base";
import RoomHeader from "../components/RoomHeader";

const Rooms = () => {
  const { data, loading } = useQuery<ROOMS_RESPONSE>(GET_ROOMS);

  if (loading) return <Spinner color="blue" />;

  const rooms = data?.usersRooms.rooms;

  return (
    <>
      <RoomHeader />
      <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
        {rooms &&
          rooms.map((room) => <Room key={room.id} data={{ ...room }} />)}
      </View>
    </>
  );
};

export default Rooms;
