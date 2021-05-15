import React from "react";
import { View } from "native-base";
import { Text, StyleSheet } from "react-native";
import { PhoneSVG } from "../../../assets/svgs/PhoneSVG";
import { ProfileSVG } from "../../../assets/svgs/ProfileSVG";
import { VideocallSVG } from "../../../assets/svgs/VideocallSVG";

interface Props {
  roomPic: string;
  roomTitle: string;
}

const RoomDetailsHeader = (props: Props) => {
  return (
    <View style={styles.header}>
      <View style={styles.detailsContainer}>
        <View style={{ marginBottom: 10, transform: [{ scale: 0.7 }] }}>
          <ProfileSVG />
        </View>
        <Text style={styles.detailsText}>
          {props.roomTitle.length > 26
            ? `${props.roomTitle.slice(0, 26)}...`
            : props.roomTitle}
        </Text>
      </View>
      <View style={styles.svgContainer}>
        <View style={styles.svgContainerItem}>
          <PhoneSVG />
        </View>
        <View style={styles.svgContainerItem}>
          <VideocallSVG />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 6,
  },
  detailsText: {
    fontWeight: "700",
  },
  header: {
    height: "15%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#B6DEFD",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  svgContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 10,
    marginTop: 20,
  },
  svgContainerItem: {
    marginLeft: 10,
  },
});

export default RoomDetailsHeader;
