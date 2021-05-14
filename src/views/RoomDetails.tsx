import { useQuery } from "@apollo/client";
import { Container, Spinner, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
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
      <RoomDetailsHeader
        roomPic={data.room.roomPic}
        roomTitle={data.room.name}
      />
      <GiftedChat
        messages={data.room.messages.map((message) => {
          const parts = message.insertedAt.split(" ");
          const largeData = parts[0].split("-");
          const smallData = parts[1].split(":");
          return {
            _id: message.id,
            text: message.body,
            createdAt: new Date(
              Number(largeData[0]),
              Number(largeData[1]),
              Number(largeData[2]),
              Number(smallData[0]),
              Number(smallData[1]),
              Number(smallData[2])
            ),
            user: {
              _id: message.user.id,
              name: message.user.firstName,
              avatar: message.user.profilePic,
            },
          };
        })}
      />
    </>
  );
};

export default RoomDetails;
