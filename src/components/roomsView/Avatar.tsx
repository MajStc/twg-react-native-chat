import React from "react";
import { Image } from "react-native";
import { ProfileSVG } from "../../../assets/svgs/ProfileSVG";
import { SingleRoomType } from "../../graphql/types/singleRoomType";

interface Props {
  data: SingleRoomType;
}

const Avatar = ({ data }: Props) => (
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

export default Avatar;
