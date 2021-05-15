import React, { useEffect } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IRoom } from "../../graphql/types/room";
import { Actions } from "react-native-router-flux";
import { useQuery } from "@apollo/client";
import { GET_ROOM, ROOM_REPSONSE } from "../../graphql/queries/GET_ROOM";
import { Spinner } from "native-base";
import { MESSAGE_SUBSCRIPTION } from "../../graphql/subscriptions/MESSAGE_SUBSCRIPTION";
import LatestMessage from "./LatestMessage";
import Avatar from "./Avatar";

interface Props {
  data: IRoom;
}

const Room = ({ data }: Props) => {
  const {
    data: currentRoom,
    loading,
    subscribeToMore,
  } = useQuery<ROOM_REPSONSE>(GET_ROOM, {
    variables: { id: data.id },
  });

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: { roomId: data.id },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev);
        return prev;
      },
      onError: (err) => console.log(err),
    });
  }, []);

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
              currentRoom.room.messages[currentRoom.room.messages.length - 1]
                .body
            }
          />
          <Text style={{ fontSize: 10 }}>
            {
              currentRoom?.room.messages[currentRoom!.room.messages.length - 1]
                .insertedAt
            }
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
