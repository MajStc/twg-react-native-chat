import React from "react";
import { Composer, InputToolbar, Send } from "react-native-gifted-chat";
import { SendSVG } from "../../../assets/svgs/SearchSVG";

const Inputs = (props: any) => {
  return (
    <InputToolbar
      {...props}
      renderComposer={({ ...inputProps }) => (
        <Composer
          {...inputProps}
          textInputStyle={{
            backgroundColor: "#FFFFFF",
            borderRadius: 14,
            borderBottomRightRadius: 0,
            padding: 4,
            marginRight: 15,
          }}
        />
      )}
      containerStyle={{
        backgroundColor: "#B6DEFD",
        padding: 4,
      }}
      renderSend={({ ...sendProps }) => (
        <Send
          {...sendProps}
          alwaysShowSend
          containerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SendSVG />
        </Send>
      )}
    />
  );
};

export default Inputs;
