import React, { useEffect } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileSVG } from "../../assets/svgs/ProfileSVG";
import { IRoom } from "../graphql/types/room";
import { Actions } from "react-native-router-flux";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_ROOM, ROOM_REPSONSE } from "../graphql/queries/GET_ROOM";
import { Spinner } from "native-base";
import { MESSAGE_SUBSCRIPTION } from "../graphql/subscriptions/MESSAGE_SUBSCRIPTION";

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

  const { data: fromSub } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { teamId: data.id },
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
    console.log(fromSub);
  }, []);

  if (loading) return <Spinner color="blue" />;
  return (
    <View style={styles.room}>
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", width: "100%" }}
        onPress={() => Actions.roomdetails({ id: data.id })}
      >
        {!!data.roomPic ? (
          <Image
            style={{ height: 64, width: 64, borderRadius: 50 }}
            source={{ uri: data.roomPic }}
          />
        ) : (
          <ProfileSVG />
        )}
        <View style={styles.sideInfo}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={{ marginTop: 10 }}>
            {currentRoom &&
            currentRoom.room.messages[currentRoom.room.messages.length - 1].body
              .length > 40
              ? `${currentRoom?.room.messages[
                  currentRoom!.room.messages.length - 1
                ].body.slice(0, 40)}...`
              : currentRoom?.room.messages[
                  currentRoom!.room.messages.length - 1
                ].body}
          </Text>
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
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: "14%",
    backgroundColor: "white",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  sideInfo: {
    marginLeft: 10,
    display: "flex",
    width: "100%",
  },
  title: {
    fontWeight: "700",
    width: "100%",
  },
});

export default Room;
