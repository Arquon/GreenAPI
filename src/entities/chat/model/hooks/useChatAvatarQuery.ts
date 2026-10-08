import { useApiKeys } from "@/shared/model/apiKeys";
import { useQuery } from "@tanstack/react-query";
import { chatService } from "../../api/chat.service";

interface useChatAvatarQueryQueryParams {
   chatId: string;
}

export function useChatAvatarQuery({ chatId }: useChatAvatarQueryQueryParams) {
   const apiKeys = useApiKeys();

   return useQuery({
      queryKey: ["chats", chatId, "avatar"],
      queryFn: () => chatService.getChatAvatarUrl({ chatId, ...apiKeys }),
   });
}
