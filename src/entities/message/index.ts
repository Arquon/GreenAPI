export { type GetChatMessagesParams, messagesService } from "./api/messages.service";

export { type Message } from "./model/types";
export { useInfiniteChatMessagesQuery as useInfiniteChatMessagesQuery } from "./model/hooks/query/useInfiniteMessagesQuery";
export { useSendMessageMutation } from "./model/hooks/mutation/useSendMessageMutation";
export { useChatMessages as useChatMessages } from "../chat/model/hooks/useChatMessages";

export { MessageItem } from "./ui/MessageItem";
