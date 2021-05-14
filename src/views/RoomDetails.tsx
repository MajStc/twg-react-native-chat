import { useQuery } from "@apollo/client";
import { Spinner } from "native-base";
import React from "react";
import { Text } from "react-native";
import RoomDetailsHeader from "../components/RoomDetailsHeader";
import { GET_ROOM, ROOM_REPSONSE } from "../graphql/queries/GET_ROOM";

interface Props {
  id: string;
}

const RoomDetails = ({ id }: Props) => {
  const { data, error, loading } = useQuery<ROOM_REPSONSE>(GET_ROOM, {
    variables: { id },
  });

  if (loading) return <Spinner color="blue" />;

  if (!data) return;

  return (
    <>
      <RoomDetailsHeader />
      <Text>{data.room.name}</Text>
    </>
  );
};

export default RoomDetails;
