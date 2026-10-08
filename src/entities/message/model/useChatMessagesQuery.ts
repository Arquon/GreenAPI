import { useQuery } from "@tanstack/react-query";
import { messagesService } from "../api/messages.service";
import { useApiKeys } from "@/shared/model/apiKeys";

interface useChatMessagesQueryQueryParams {
   chatId: string;
   count?: number;
}

export function useChatMessagesQuery({ chatId, count = 100 }: useChatMessagesQueryQueryParams) {
   const { apiTokenInstance, idInstance } = useApiKeys();

   return useQuery({
      queryKey: ["chats", chatId, "messages", count],
      queryFn: () => messagesService.getChatMessages({ chatId, count, idInstance, apiTokenInstance }),
   });
}
