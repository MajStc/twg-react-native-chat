import { useMutation, useQuery } from "@apollo/client";
import { Container, Spinner } from "native-base";
import React, { useEffect } from "react";
import { GiftedChat, Message } from "react-native-gifted-chat";
import Bubble from "../components/chatComponents/Bubble";
import Inputs from "../components/chatComponents/Inputs";
import RoomDetailsHeader from "../components/headers/RoomDetailsHeader";
import { SEND_MESSAGE } from "../graphql/mutations/SEND_MESSAGE";
import { GET_ROOM, ROOM_REPSONSE } from "../graphql/queries/GET_ROOM";
import { GET_USER, GET_USER_RESPONSE } from "../graphql/queries/GET_USER";
import { MESSAGE_SUBSCRIPTION } from "../graphql/subscriptions/MESSAGE_SUBSCRIPTION";
import mapToChatMessage from "../utils/mapToChatMessage";

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
    <Container style={{ backgroundColor: "#F0F8FF" }}>
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
        renderInputToolbar={Inputs}
        renderBubble={Bubble}
      />
    </Container>
  );
};

export default RoomDetails;
