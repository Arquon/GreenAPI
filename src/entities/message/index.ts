export { type GetChatMessagesParams, messagesService } from "./api/messages.service";

export {
   type IncomingMessage,
   type OutgoingMessage,
   type BaseMessage,
   type Message,
   type SenderType,
   type MessagesQueryPage,
   type MessageData,
} from "./model/types";

export { useInfiniteMessagesQuery } from "./model/hooks/query/useInfiniteMessagesQuery";
export { useSendMessageMutation } from "./model/hooks/mutation/useSendMessageMutation";
export { useMessagesQuery } from "./model/hooks/query/useMessagesQuery";

export {
   pushNewMessageToInfinityCache,
   updateMessageInInfinityCache,
   chatInfinityMessagesQueryKey,
   chatCountMessagesQueryKey,
} from "./model/helpers/query";

export { MessageItem } from "./ui/MessageItem";
