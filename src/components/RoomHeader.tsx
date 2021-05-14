import { View } from "native-base";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { RoomsSVG } from "../../assets/svgs/RoomsSVG";
import { SearchSVG } from "../../assets/svgs/SendSVG";

const RoomHeader = () => {
  return (
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
};

const styles = StyleSheet.create({
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
  text: {
    color: "#5603AD",
    fontSize: 28,
    marginLeft: 10,
    fontWeight: "700",
    marginTop: 20,
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
