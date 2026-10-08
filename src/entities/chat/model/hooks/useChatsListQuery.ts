import { useQuery } from "@tanstack/react-query";
import { chatService } from "../../api/chat.service";
import { useCallback } from "react";
import type { Chat } from "../types";
import { useApiKeys } from "@/shared/model/apiKeys";

interface useChatsListQueryQueryParams {
   searchString?: string;
}

export function useChatsListQuery({ searchString }: useChatsListQueryQueryParams) {
   const { apiTokenInstance, idInstance } = useApiKeys();

   const selectFn = useCallback(
      (chatsList: Chat[]) => {
         if (!searchString) return chatsList;
         return chatsList.filter((chatItem) =>
            chatItem.name.toLowerCase().includes(searchString.toLowerCase())
         );
      },
      [searchString]
   );

   return useQuery({
      queryKey: ["chats"],
      queryFn: () => chatService.getChatsList({ idInstance, apiTokenInstance }),
      select: selectFn,
   });
}
