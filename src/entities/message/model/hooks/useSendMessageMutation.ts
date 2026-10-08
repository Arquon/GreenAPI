import { useApiKeys } from "@/shared/model/apiKeys";
import { useMutation } from "@tanstack/react-query";
import { messagesService } from "../../api/messages.service";

interface SendMessageParams {
   chatId: string;
   message: string;
}

export function useSendMessageMutation() {
   const apiKeys = useApiKeys();

   return useMutation({
      mutationFn: ({ chatId, message }: SendMessageParams) =>
         messagesService.sendChatMessage({ chatId, message, ...apiKeys }),
   });
}
