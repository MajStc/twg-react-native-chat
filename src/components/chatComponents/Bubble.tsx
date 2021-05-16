import React from "react";
import { Bubble as GiftedBubble } from "react-native-gifted-chat";

const Bubble = (props: any) => {
  return (
    <GiftedBubble
      {...props}
      wrapperStyle={{
        right: {
          width: "65%",
          backgroundColor: "#993AFC",
          borderRadius: 14,
          borderBottomRightRadius: 0,
        },
        left: {
          width: "65%",
          backgroundColor: "#FFFFFF",
          borderRadius: 14,
          borderBottomLeftRadius: 0,
          padding: 2,
        },
      }}
      textStyle={{
        right: {
          color: "#FFFFFF",
        },
      }}
    />
  );
};

export default Bubble;
