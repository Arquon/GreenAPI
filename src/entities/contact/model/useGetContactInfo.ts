import { useSuspenseQuery } from "@tanstack/react-query";
import { contactService } from "../api/contact.service";
import { useApiKeys } from "@/shared/model/apiKeys";

interface useContactInfoQueryParams {
   chatId: string;
}

export function useContactInfoQuery({ chatId }: useContactInfoQueryParams) {
   const { apiTokenInstance, idInstance } = useApiKeys();

   return useSuspenseQuery({
      queryKey: ["user", chatId],
      queryFn: () => contactService.getContactInfo({ chatId, idInstance, apiTokenInstance }),
   });
}
