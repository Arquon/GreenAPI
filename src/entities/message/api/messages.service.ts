import { httpService, type DefaultRequestParams } from "@/shared/api";
import type { Message } from "../model/types";

const messagesEndPoints = {
   getChatMessages: ({ apiTokenInstance, idInstance }: DefaultRequestParams) =>
      `/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
   sendChatMessage: ({ apiTokenInstance, idInstance }: DefaultRequestParams) =>
      `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
};

export interface GetChatMessagesParams extends DefaultRequestParams {
   chatId: string;
   count?: number;
}

interface SendChatMessageParams extends DefaultRequestParams {
   chatId: string;
   message: string;
}

export const messagesService = {
   getChatMessages: async ({ apiTokenInstance, idInstance, chatId, count }: GetChatMessagesParams) => {
      const response = await httpService.post<Message[]>(
         messagesEndPoints.getChatMessages({ apiTokenInstance, idInstance }),
         { chatId, count }
      );

      return response.data;
   },
   sendChatMessage: async ({ apiTokenInstance, idInstance, chatId, message }: SendChatMessageParams) => {
      const response = await httpService.post<{ idMessage: string }>(
         messagesEndPoints.sendChatMessage({ apiTokenInstance, idInstance }),
         {
            chatId,
            message,
         }
      );

      return response.data;
   },
};
