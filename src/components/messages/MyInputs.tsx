import React, { useState } from "react";
import { View } from "native-base";
import { useMutation } from "@apollo/client";
import { SendSVG } from "../../../assets/svgs/SearchSVG";
import { SEND_MESSAGE } from "../../graphql/mutations/SEND_MESSAGE";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  id: string;
}

const MyInputs = ({ id }: Props) => {
  const [input, setInput] = useState("");
  const [SendMessage] = useMutation(SEND_MESSAGE);

  const handlePress = () => {
    if (!!input) {
      SendMessage({ variables: { body: input, roomId: id } });
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={input} onChangeText={setInput} />
      <TouchableOpacity onPress={() => handlePress()}>
        <SendSVG />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B6DEFD",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    width: "80%",
    padding: 3,
    paddingLeft: 5,
    marginLeft: 10,
    borderRadius: 14,
    borderBottomRightRadius: 0,
    backgroundColor: "white",
  },
});

export default MyInputs;
