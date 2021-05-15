import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Spinner, Text } from "native-base";
import React, { useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import RoomDetailsHeader from "../components/RoomDetailsHeader";
import {
  SEND_MESSAGE,
  SEND_MESSAGE_RESPONSE,
} from "../graphql/mutations/SEND_MESSAGE";
import { GET_ROOM, ROOM_REPSONSE } from "../graphql/queries/GET_ROOM";

interface Props {
  id: string;
}

const RoomDetails = ({ id }: Props) => {
  const {
    data: roomData,
    loading,
    subscribeToMore,
  } = useQuery<ROOM_REPSONSE>(GET_ROOM, {
    variables: { id },
  });

  const [SendMessage, { loading: sendMessageLoading }] =
    useMutation<SEND_MESSAGE_RESPONSE>(SEND_MESSAGE);

  if (loading) return <Spinner color="blue" />;
  if (!roomData) return;
  const subscribeToNewMessages = () => {
    subscribeToMore({
      document: GET_ROOM,
      variables: { id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.room.messages;
        newFeedItem.sort((a, b) => +a.id - +b.id);
        return Object.assign({}, prev, {
          room: {
            messages: [newFeedItem, ...prev.room.messages],
          },
        });
      },
    });
  };

  subscribeToNewMessages();

  return (
    <>
      <RoomDetailsHeader
        roomPic={roomData.room.roomPic}
        roomTitle={roomData.room.name}
      />
      <GiftedChat
        messages={roomData.room.messages.map((message) => {
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
        onSend={(newMessage) =>
          SendMessage({ variables: { body: newMessage[0].text, roomId: id } })
        }
      />
      {sendMessageLoading && <Text>Loading...</Text>}
    </>
  );
};

export default RoomDetails;
