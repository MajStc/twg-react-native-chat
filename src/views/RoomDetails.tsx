import React, { useEffect } from "react";
import { Spinner } from "native-base";
import { useQuery } from "@apollo/client";
import RoomChat from "../components/RoomChat";
import MyInputs from "../components/messages/MyInputs";
import { GET_ROOM, ROOM_REPSONSE } from "../graphql/queries/GET_ROOM";
import RoomDetailsHeader from "../components/headers/RoomDetailsHeader";
import { MESSAGE_SUBSCRIPTION } from "../graphql/subscriptions/MESSAGE_SUBSCRIPTION";

interface Props {
  id: string;
}

const RoomDetails = ({ id }: Props) => {
  const { data, loading, subscribeToMore } = useQuery<ROOM_REPSONSE>(GET_ROOM, {
    variables: { id },
  });

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: { roomId: id },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(prev);
        return prev;
      },
    });
  }, []);

  if (loading || !data) return <Spinner color="blue" />;

  return (
    <>
      <RoomDetailsHeader
        roomPic={data.room.roomPic}
        roomTitle={data.room.name}
      />
      <RoomChat {...data} />
      <MyInputs id={id} />
    </>
  );
};

export default RoomDetails;
