import { useQuery } from "@apollo/client";
import { Container, Spinner } from "native-base";
import React from "react";
import { View } from "react-native";
import Room from "../components/roomsView/Room";
import RoomHeader from "../components/headers/RoomHeader";
import { GET_ROOMS, ROOMS_RESPONSE } from "../graphql/queries/GET_ROOMS";

const Rooms = () => {
  const { data, loading } = useQuery<ROOMS_RESPONSE>(GET_ROOMS);

  if (loading || !data) return <Spinner color="blue" />;

  return (
    <Container style={{ backgroundColor: "#F0F8FF" }}>
      <RoomHeader />
      <View
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {data.usersRooms.rooms.map((room) => (
          <Room key={room.id} id={room.id} data={room} />
        ))}
      </View>
    </Container>
  );
};

export default Rooms;
