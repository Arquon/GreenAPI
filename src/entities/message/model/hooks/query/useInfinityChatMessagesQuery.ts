import { useSuspenseInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { messagesService, type GetChatMessagesParams } from "../../../api/messages.service";
import { useApiKeys } from "@/shared/model/apiKeys";
import { useCallback } from "react";
import type { Message } from "../../types";
import axios from "axios";
import { chatInfinityMessagesQueryKey } from "../../helpers/query-helpers";

interface useInfinityChatMessagesQueryQueryParams {
   chatId: string;
}

const fetchInfiniteMessage = async (args: Required<GetChatMessagesParams>) => {
   const messages = await messagesService.getChatMessages(args);

   return {
      messages,
      nextCount: messages.length === args.count ? args.count + 20 : null,
   };
};

export function useInfinityChatMessagesQuery({ chatId }: useInfinityChatMessagesQueryQueryParams) {
   const apiKeys = useApiKeys();

   const selectFn = useCallback(
      (
         data: InfiniteData<
            {
               messages: Message[];
               nextCount: number | null;
            },
            number
         >
      ) => {
         const messages = data.pages.at(-1)?.messages ?? [];
         return messages;
      },
      []
   );

   return useSuspenseInfiniteQuery({
      queryKey: chatInfinityMessagesQueryKey(chatId),
      queryFn: ({ pageParam: count }) => fetchInfiniteMessage({ chatId, count, ...apiKeys }),
      initialPageParam: 20,
      getNextPageParam: (lastMessage) => lastMessage.nextCount,
      select: selectFn,
      retry: Infinity,
      retryDelay(failureCount, error) {
         if (axios.isAxiosError(error)) {
            if (error.status === 429) return 1500;
         }
         return Math.min(1000 * 2 ** failureCount, 30000);
      },
      maxPages: 1,
   });
}
