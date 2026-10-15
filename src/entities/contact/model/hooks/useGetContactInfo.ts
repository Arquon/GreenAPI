import { useQuery } from "@tanstack/react-query";
import { contactService } from "../../api/contact.service";
import { useApiKeys } from "@/shared/model/apiKeys";

interface useContactInfoQueryParams {
   chatId: string;
}

export function useContactInfoQuery({ chatId }: useContactInfoQueryParams) {
   const { apiTokenInstance, idInstance } = useApiKeys();

   return useQuery({
      queryKey: ["user", chatId],
      queryFn: ({ signal }) =>
         contactService.getContactInfo({ chatId, keys: { idInstance, apiTokenInstance }, signal }),
      retry: 0,
   });
}
