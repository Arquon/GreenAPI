import type { Message, MessagesQueryPage } from "../../model/types";
import type { InfiniteData, QueryClient } from "@tanstack/react-query";

export const chatInfinityMessagesQueryKey = (chatId: string) => ["chat", chatId, "messages"];

interface PushNewMessageToCacheParams {
   messageObject: Message;
   queryClient: QueryClient;
   chatId: string;
}

export function pushNewMessageToInfinityCache({
   messageObject,
   queryClient,
   chatId,
}: PushNewMessageToCacheParams) {
   queryClient.setQueryData<InfiniteData<MessagesQueryPage, number>>(
      chatInfinityMessagesQueryKey(chatId),
      (previous) => {
         if (!previous) return previous;

         const updatedPages = previous.pages.map((page, index) => {
            if (index !== previous.pages.length - 1) return page;

            return {
               ...page,
               messages: [messageObject, ...page.messages],
            };
         });

         return { ...previous, pages: updatedPages };
      }
   );
}

interface UpdateMessageInCache {
   chatId: string;
   queryClient: QueryClient;
   cb: (message: Message) => Message;
}

export function updateMessageInInfinityCache({ cb, chatId, queryClient }: UpdateMessageInCache) {
   queryClient.setQueryData<InfiniteData<MessagesQueryPage, number>>(
      chatInfinityMessagesQueryKey(chatId),
      (previous) => {
         if (!previous) return previous;

         const updatedPages = previous.pages.map((page, index) => {
            if (index !== previous.pages.length - 1) return page;

            return {
               ...page,
               messages: page.messages.map(cb),
            };
         });

         return { ...previous, pages: updatedPages };
      }
   );
}

interface ChatCountMessagesQueryKeyParams {
   chatId: string;
   count: number;
}

export const chatCountMessagesQueryKey = ({ chatId, count }: ChatCountMessagesQueryKeyParams) => [
   "chat",
   chatId,
   "messages",
   count,
];
