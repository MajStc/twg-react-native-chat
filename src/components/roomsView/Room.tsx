import { useQuery, useSubscription } from "@apollo/client";
import { Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import { GET_ROOM, ROOM_REPSONSE } from "../../graphql/queries/GET_ROOM";
import { GET_USER, GET_USER_RESPONSE } from "../../graphql/queries/GET_USER";
import { MESSAGE_SUBSCRIPTION } from "../../graphql/subscriptions/MESSAGE_SUBSCRIPTION";
import { SingleRoomType } from "../../graphql/types/singleRoomType";
import Avatar from "./Avatar";
import LatestMessage from "./LatestMessage";

interface Props {
  id: string;
  data: SingleRoomType;
}

const Room = ({ id, data }: Props) => {
  const { data: currentRoom, loading } = useQuery<ROOM_REPSONSE>(GET_ROOM, {
    variables: { id },
  });
  const { data: me } = useQuery<GET_USER_RESPONSE>(GET_USER);
  const [touched, setTouched] = useState(true);
  const [myColor, setMyColor] = useState("black");

  const { data: newMessage } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { roomId: id },
  });

  const handleRoomPress = () => {
    Actions.roomdetails({ id: data.id });
    setTouched(true);
    setMyColor("black");
  };

  useEffect(() => {
    if (!!newMessage) {
      if (newMessage.messageAdded.user.id !== me.user.id) {
        setTouched(false);
        setMyColor("white");
      } else {
        setTouched(true);
        setMyColor("black");
      }
    }
  }, [newMessage]);

  if (loading || !currentRoom) return <Spinner color="blue" />;

  return (
    <View
      style={[
        styles.room,
        touched
          ? { backgroundColor: "#FFFFFF" }
          : { backgroundColor: "#5603AD" },
      ]}
    >
      <TouchableOpacity
        style={styles.roomContainer}
        onPress={() => handleRoomPress()}
      >
        <Avatar data={data} />
        <View style={styles.sideInfo}>
          <Text style={[styles.title, { color: myColor }]}>{data.name}</Text>
          <LatestMessage
            message={
              !!newMessage
                ? newMessage.messageAdded.body
                : currentRoom.room.messages[
                    currentRoom.room.messages.length - 1
                  ].body
            }
            color={myColor}
          />
          <Text style={[styles.date, { color: myColor }]}>
            {!!newMessage
              ? newMessage.messageAdded.insertedAt
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
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
  roomContainer: {
    display: "flex",
    flexDirection: "row",
  },
  sideInfo: {
    display: "flex",
    marginLeft: 10,
  },
  title: {
    fontWeight: "700",
  },
  date: {
    fontSize: 10,
  },
});

export default Room;
