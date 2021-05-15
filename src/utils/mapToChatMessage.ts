import { Message } from "../graphql/types/message";

const mapToChatMessage = (message: Message) => {
  const parts = message.insertedAt.split(" ");
  const largeData = parts[0].split("-");
  const smallData = parts[1].split(":");
  return {
    _id: message.id,
    text: message.body,
    user: {
      _id: message.user.id,
      name: message.user.firstName,
      avatar: message.user.profilePic,
    },
    createdAt: new Date(
      +largeData[0],
      +largeData[1],
      +largeData[2],
      +smallData[0],
      +smallData[1],
      +smallData[2]
    ),
  };
};
export default mapToChatMessage;
