import { View } from "native-base";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { RoomsSVG } from "../../../assets/svgs/RoomsSVG";
import { SearchSVG } from "../../../assets/svgs/SendSVG";

const RoomHeader = () => (
  <View style={styles.header}>
    <Text style={styles.text}>Rooms</Text>
    <View style={styles.svgContainer}>
      <View style={styles.svgContainerItem}>
        <SearchSVG />
      </View>
      <View style={styles.svgContainerItem}>
        <RoomsSVG />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: "15%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B6DEFD",
    justifyContent: "space-between",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  text: {
    color: "#5603AD",
    fontSize: 28,
    marginTop: 20,
    marginLeft: 10,
    fontWeight: "700",
  },
  svgContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 10,
    marginTop: 20,
  },
  svgContainerItem: {
    marginRight: 10,
  },
});

export default RoomHeader;
