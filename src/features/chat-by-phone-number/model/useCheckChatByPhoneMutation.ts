import { chatService } from "@/entities/chat";
import { useApiKeys } from "@/shared/model/apiKeys";
import { useMutation } from "@tanstack/react-query";

export function useCheckChatByPhoneMutation() {
   const apiKeys = useApiKeys();

   return useMutation({
      mutationFn: (phoneNumber: number) =>
         chatService.checkChatByPhone({ phoneNumber, keys: { ...apiKeys } }),
   });
}
