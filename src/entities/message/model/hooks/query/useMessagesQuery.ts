import { useQuery } from "@tanstack/react-query";
import { messagesService } from "../../../api/messages.service";
import { useApiKeys } from "@/shared/model/apiKeys";
import axios from "axios";
import { chatCountMessagesQueryKey } from "../../helpers/query";

interface UseMessagesQueryQueryParams {
   chatId: string;
   count?: number;
}

export function useMessagesQuery({ chatId, count = 100 }: UseMessagesQueryQueryParams) {
   const { apiTokenInstance, idInstance } = useApiKeys();

   return useQuery({
      queryKey: chatCountMessagesQueryKey({ chatId, count }),
      queryFn: () => messagesService.getChatMessages({ chatId, count, idInstance, apiTokenInstance }),
      retry: 5,
      retryDelay(failureCount, error) {
         if (axios.isAxiosError(error)) {
            if (error.status === 429) return 1500;
         }

         return Math.min(1000 * 2 ** failureCount, 30000);
      },
      staleTime: Infinity,
   });
}
