import { httpService, type DefaultRequestParams } from "@/shared/api";
import type { Message } from "../model/types";

interface GetChatMessagesParams extends DefaultRequestParams {
   chatId: string;
   count?: number;
}

interface MessagesEndpoint {
   chatMessagesEndpoint: (args: DefaultRequestParams) => string;
}

const messagesEndPoints: MessagesEndpoint = {
   chatMessagesEndpoint: ({ apiTokenInstance, idInstance }) => `/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
};

export const messagesService = {
   getChatMessages: async ({ apiTokenInstance, idInstance, chatId, count }: GetChatMessagesParams) => {
      const response = await httpService.post<Message[]>(messagesEndPoints.chatMessagesEndpoint({ apiTokenInstance, idInstance }), { chatId, count });

      return response.data;
   },
};
