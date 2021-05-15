import React from "react";
import { Image } from "react-native";
import { ProfileSVG } from "../../../assets/svgs/ProfileSVG";
import { IRoom } from "../../graphql/types/room";

interface Props {
  data: IRoom;
}

const Avatar = ({ data }: Props) => {
  return (
    <>
      {!!data.roomPic ? (
        <Image
          style={{ height: 64, width: 64, borderRadius: 50 }}
          source={{ uri: data.roomPic }}
        />
      ) : (
        <ProfileSVG />
      )}
    </>
  );
};

export default Avatar;
