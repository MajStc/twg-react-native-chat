import { View } from "native-base";
import React from "react";
import { Text, StyleSheet, Image } from "react-native";
import { PhoneSVG } from "../../assets/svgs/PhoneSVG";
import { ProfileSVG } from "../../assets/svgs/ProfileSVG";
import { VideocallSVG } from "../../assets/svgs/VideocallSVG";

interface Props {
  roomPic: string;
  roomTitle: string;
}

const RoomDetailsHeader = (props: Props) => {
  return (
    <View style={styles.header}>
      <View style={styles.detailsContainer}>
        <ProfileSVG />
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
    flexWrap: "nowrap",
    marginTop: 40,
    marginLeft: 6,
    maxWidth: "70%",
  },
  detailsText: {
    fontWeight: "700",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    height: "15%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    width: "100%",
    backgroundColor: "#B6DEFD",
    justifyContent: "space-between",
    alignItems: "center",
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
