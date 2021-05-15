import { useMutation, useQuery } from "@apollo/client";
import { Spinner, View } from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SendSVG } from "../../assets/svgs/SearchSVG";
import RoomChat from "../components/RoomChat";
import RoomDetailsHeader from "../components/RoomDetailsHeader";
import { SEND_MESSAGE } from "../graphql/mutations/SEND_MESSAGE";
import { GET_ROOM, ROOM_REPSONSE } from "../graphql/queries/GET_ROOM";
import { MESSAGE_SUBSCRIPTION } from "../graphql/subscriptions/MESSAGE_SUBSCRIPTION";

interface Props {
  id: string;
}

const RoomDetails = ({ id }: Props) => {
  const [input, setInput] = useState("");
  const [SendMessage] = useMutation(SEND_MESSAGE);
  const { data, loading, subscribeToMore } = useQuery<ROOM_REPSONSE>(GET_ROOM, {
    variables: { id },
  });

  if (loading) return <Spinner color="blue" />;

  const moreMessages = () =>
    subscribeToMore({
      document: GET_ROOM,
      variables: { id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newMessage =
          subscriptionData.data.room.messages[
            subscriptionData.data.room.messages.length - 1
          ];
        return Object.assign({}, prev, {
          room: {
            messages: [...prev.room.messages, newMessage],
          },
        });
      },
    });

  moreMessages();

  return (
    <>
      {data && (
        <>
          <RoomDetailsHeader
            roomPic={data.room.roomPic}
            roomTitle={data.room.name}
          />
          <RoomChat {...data} />
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity
              onPress={() => {
                if (!!input) {
                  SendMessage({ variables: { body: input, roomId: id } });
                  setInput("");
                }
              }}
            >
              <SendSVG />
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#B6DEFD",
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    marginLeft: 10,
    borderRadius: 14,
    borderBottomRightRadius: 0,
    padding: 3,
    paddingLeft: 5,
  },
});

export default RoomDetails;
