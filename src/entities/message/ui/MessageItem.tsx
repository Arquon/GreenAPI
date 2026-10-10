import type { Message } from "../model/types";

interface MessageItemProps {
   message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
   const defaultClassName = "max-w-100 px-4 py-2 rounded-xl";
   const incomingClassName = "bg-message-inc self-start";
   const outgoingClassName = "bg-message-out self-end";

   const className = [
      defaultClassName,
      message.type === "incoming" && incomingClassName,
      message.type === "outgoing" && outgoingClassName,
   ]
      .filter(Boolean)
      .join(" ");

   return <div className={className}>{message.textMessage}</div>;
};
