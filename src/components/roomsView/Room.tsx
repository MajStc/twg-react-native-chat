import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IRoom } from "../../graphql/types/room";
import { Actions } from "react-native-router-flux";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_ROOM, ROOM_REPSONSE } from "../../graphql/queries/GET_ROOM";
import { Spinner } from "native-base";
import {
  MESSAGE_SUBSCRIPTION,
  MESSAGE_SUBSCRIPTION_RESPONSE,
} from "../../graphql/subscriptions/MESSAGE_SUBSCRIPTION";
import LatestMessage from "./LatestMessage";
import Avatar from "./Avatar";
import { Message } from "../../graphql/types/message";

interface Props {
  id: string;
  data: IRoom;
}

const Room = ({ id, data }: Props) => {
  const { data: currentRoom, loading } = useQuery<ROOM_REPSONSE>(GET_ROOM, {
    variables: { id },
  });

  const { data: newMessage } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { roomId: id },
  });

  if (loading || !currentRoom) return <Spinner color="blue" />;

  return (
    <View style={styles.room}>
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", width: "100%" }}
        onPress={() => Actions.roomdetails({ id: data.id })}
      >
        <Avatar data={data} />
        <View style={styles.sideInfo}>
          <Text style={styles.title}>{data.name}</Text>
          <LatestMessage
            message={
              !!newMessage
                ? newMessage?.messageAdded.body
                : currentRoom.room.messages[
                    currentRoom.room.messages.length - 1
                  ].body
            }
          />
          <Text style={{ fontSize: 10 }}>
            {!!newMessage
              ? newMessage?.messageAdded.insertedAt
              : currentRoom.room.messages[currentRoom.room.messages.length - 1]
                  .insertedAt}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  room: {
    width: "100%",
    height: "14%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
  sideInfo: {
    width: "100%",
    display: "flex",
    marginLeft: 10,
  },
  title: {
    width: "100%",
    fontWeight: "700",
  },
});

export default Room;
