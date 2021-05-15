import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import RoomDetailsHeader from "../components/headers/RoomDetailsHeader";
import { GET_ROOM, ROOM_REPSONSE } from "../graphql/queries/GET_ROOM";
import { GiftedChat, Message } from "react-native-gifted-chat";
import { GET_USER, GET_USER_RESPONSE } from "../graphql/queries/GET_USER";
import { SEND_MESSAGE } from "../graphql/mutations/SEND_MESSAGE";
import mapToChatMessage from "../utils/mapToChatMessage";
import { MESSAGE_SUBSCRIPTION } from "../graphql/subscriptions/MESSAGE_SUBSCRIPTION";

interface Props {
  id: string;
}

const RoomDetails = ({ id }: Props) => {
  const { data, loading, subscribeToMore, refetch } = useQuery<ROOM_REPSONSE>(
    GET_ROOM,
    {
      variables: { id },
    }
  );
  const { data: me } = useQuery<GET_USER_RESPONSE>(GET_USER);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: { roomId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        return Object.assign({}, prev, {
          room: {
            messages: [...prev.room.messages, subscriptionData.data],
          },
        });
      },
    });
    refetch();
  }, []);

  if (loading || !data || !me) return <Spinner color="blue" />;

  return (
    <>
      <RoomDetailsHeader
        roomPic={data.room.roomPic}
        roomTitle={data.room.name}
      />
      <GiftedChat
        messages={data.room.messages
          .map((message) => mapToChatMessage(message))
          .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))}
        onSend={(newMessage) =>
          sendMessage({ variables: { body: newMessage[0].text, roomId: id } })
        }
        user={{
          _id: me.user.id,
        }}
      />
    </>
  );
};

export default RoomDetails;
