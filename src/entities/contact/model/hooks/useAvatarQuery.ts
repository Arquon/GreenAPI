import { useApiKeys } from "@/shared/model/apiKeys";
import { useQuery } from "@tanstack/react-query";
import { contactService } from "../../api/contact.service";

interface UseAvatarQueryQueryParams {
   chatId: string;
}

export function useAvatarQuery({ chatId }: UseAvatarQueryQueryParams) {
   const apiKeys = useApiKeys();

   return useQuery({
      queryKey: ["chats", chatId, "avatar"],
      queryFn: ({ signal }) => contactService.getAvatarUrl({ chatId, keys: { ...apiKeys }, signal }),
      retry: 0,
      staleTime: Infinity,
   });
}
