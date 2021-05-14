import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProfileSVG } from "../../assets/svgs/ProfileSVG";
import { IRoom } from "../graphql/types/room";
import { Actions } from "react-native-router-flux";

interface Props {
  data: IRoom;
}

const Room = ({ data }: Props) => {
  return (
    <View style={styles.room}>
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", width: "100%" }}
        onPress={() => Actions.roomdetails({ id: data.id })}
      >
        {!!data.roomPic ? (
          <Image source={{ uri: `${data.roomPic}` }} />
        ) : (
          <ProfileSVG />
        )}
        <View style={styles.sideInfo}>
          <Text style={styles.title}>{data.name}</Text>
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
  },
  title: {
    fontWeight: "700",
  },
});

export default Room;
