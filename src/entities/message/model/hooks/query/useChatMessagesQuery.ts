import { useQuery } from "@tanstack/react-query";
import { messagesService } from "../../../api/messages.service";
import { useApiKeys } from "@/shared/model/apiKeys";
import axios from "axios";
import { chatCountMessagesQueryKey } from "../../helpers/query-helpers";

interface useChatMessagesQueryQueryParams {
   chatId: string;
   count?: number;
}

export function useChatMessagesQuery({ chatId, count = 100 }: useChatMessagesQueryQueryParams) {
   const { apiTokenInstance, idInstance } = useApiKeys();

   return useQuery({
      queryKey: chatCountMessagesQueryKey({ chatId, count }),
      queryFn: () => messagesService.getChatMessages({ chatId, count, idInstance, apiTokenInstance }),
      retry: Infinity,
      retryDelay(failureCount, error) {
         if (axios.isAxiosError(error)) {
            if (error.status === 429) return 1500;
         }

         return Math.min(1000 * 2 ** failureCount, 30000);
      },
      staleTime: Infinity,
   });
}
