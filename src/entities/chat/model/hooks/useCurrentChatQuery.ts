import { useQuery } from "@tanstack/react-query";
import { chatService } from "../../api/chat.service";
import { useApiKeys } from "@/shared/model/apiKeys";
import { useCallback } from "react";
import type { Chat } from "../types";

interface useCurrentChatQueryQueryParams {
   chatId: string;
}

export function useCurrentChatQuery({ chatId }: useCurrentChatQueryQueryParams) {
   const { apiTokenInstance, idInstance } = useApiKeys();

   const selectFn = useCallback(
      (chatsList: Chat[]) => {
         return chatsList.find((chat) => chat.chatId === chatId);
      },
      [chatId]
   );

   return useQuery({
      queryKey: ["chats"],
      queryFn: () => chatService.getChatsList({ idInstance, apiTokenInstance }),
      select: selectFn,
   });
}
