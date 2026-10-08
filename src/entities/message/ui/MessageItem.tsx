import type { Message } from "../model/types";

interface MessageItemProps {
   message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
   return <div>{message.textMessage}</div>;
};
