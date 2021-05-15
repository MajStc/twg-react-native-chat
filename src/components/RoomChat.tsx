import { useQuery } from "@apollo/client";
import { Spinner, Text } from "native-base";
import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ROOM_REPSONSE } from "../graphql/queries/GET_ROOM";
import { GET_USER, GET_USER_RESPONSE } from "../graphql/queries/GET_USER";

const RoomChat = ({ room }: ROOM_REPSONSE) => {
  const { data, loading } = useQuery<GET_USER_RESPONSE>(GET_USER);
  const scrollViewRef = useRef(null);

  if (loading) return <Spinner color="blue" />;

  return (
    <>
      {data && (
        <>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              //@ts-ignore
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            {room.messages.map((message) => (
              <View key={message.id} style={styles.container}>
                {message.user.id === data.user.id ? (
                  <>
                    <View style={styles.me}>
                      <Text style={{ textAlign: "right", color: "white" }}>
                        {message.body}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 10, textAlign: "right" }}>
                      {message.insertedAt}
                    </Text>
                  </>
                ) : (
                  <>
                    <View style={styles.guset}>
                      <Text style={{ textAlign: "left" }}>{message.body}</Text>
                    </View>
                    <Text style={{ fontSize: 10 }}>{message.insertedAt}</Text>
                  </>
                )}
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  me: {
    alignSelf: "flex-end",
    width: "60%",
    backgroundColor: "#993AFC",
    padding: 10,
    borderRadius: 14,
    borderBottomRightRadius: 0,
  },
  guset: {
    width: "60%",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 14,
    borderBottomLeftRadius: 0,
  },
  container: {
    margin: 3,
  },
});

export default RoomChat;
