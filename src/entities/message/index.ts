export { type GetChatMessagesParams, messagesService } from "./api/messages.service";

export { type Message } from "./model/types";
export { useInfinityChatMessagesQuery as useInfiniteChatMessagesQuery } from "./model/hooks/query/useInfinityChatMessagesQuery";
export { useSendMessageMutation } from "./model/hooks/mutation/useSendMessageMutation";
export { useInfinityChatMessages as useChatMessages } from "./model/hooks/useInfinityChatMessages";

export { MessageItem } from "./ui/MessageItem";
