import { useContactInfoQuery } from "@/entities/contact";
import { useInfiniteMessagesQuery } from "@/entities/message";

interface useCurrentChatQueryQueryParams {
   chatId: string;
}

export function useCurrentChatQuery({ chatId }: useCurrentChatQueryQueryParams) {
   const contactQuery = useContactInfoQuery({ chatId });

   const messagesQuery = useInfiniteMessagesQuery({ chatId });

   return [contactQuery, messagesQuery] as const;
}
