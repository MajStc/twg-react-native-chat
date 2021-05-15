import { useQuery } from "@apollo/client";
import { Spinner } from "native-base";
import React from "react";
import { View, Text } from "react-native";
import Room from "../components/Room";
import RoomHeader from "../components/RoomHeader";
import { GET_ROOMS, ROOMS_RESPONSE } from "../graphql/queries/GET_ROOMS";

const Rooms = () => {
  const { data, loading } = useQuery<ROOMS_RESPONSE>(GET_ROOMS);

  if (loading) return <Spinner color="blue" />;

  return (
    <>
      <RoomHeader />
      <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
        {data &&
          data.usersRooms.rooms.map((room) => (
            <Room key={room.id} data={room} />
          ))}
      </View>
    </>
  );
};

export default Rooms;
