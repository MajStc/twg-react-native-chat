import MyMessage from "./messages/MyMessage";
import React, { useRef } from "react";
import { Spinner } from "native-base";
import { useQuery } from "@apollo/client";
import GuestMessage from "./messages/GuestMessage";
import { ScrollView, StyleSheet, View } from "react-native";
import { ROOM_REPSONSE } from "../graphql/queries/GET_ROOM";
import { GET_USER, GET_USER_RESPONSE } from "../graphql/queries/GET_USER";

const RoomChat = ({ room }: ROOM_REPSONSE) => {
  const { data, loading } = useQuery<GET_USER_RESPONSE>(GET_USER);
  const scrollViewRef = useRef<ScrollView | null>(null);

  if (loading || !data) return <Spinner color="blue" />;

  const handleScroll = () => {
    if (scrollViewRef.current !== null)
      scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => handleScroll()}
      >
        {room.messages.map((message) => (
          <View key={message.id} style={styles.container}>
            {message.user.id === data.user.id ? (
              <MyMessage message={message} />
            ) : (
              <GuestMessage message={message} />
            )}
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 3,
  },
});

export default RoomChat;
