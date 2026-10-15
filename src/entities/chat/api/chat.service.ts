import { httpService, type DefaultRequestParams, type DefaultURLParams } from "@/shared/api";
import type { Chat } from "../model/types";

const endPoints = {
   getChatsList: ({ apiTokenInstance, idInstance }: DefaultURLParams) =>
      `/waInstance${idInstance}/getChats/${apiTokenInstance}`,

   checkChatByPhone: ({ apiTokenInstance, idInstance }: DefaultURLParams) =>
      `/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
};

interface GetChatsListParams extends DefaultRequestParams {}
interface CheckChatByPhoneParams extends DefaultRequestParams {
   phoneNumber: number;
}

interface CheckChatByPhoneResponse {
   exist: boolean;
   chatId: string;
}

export const chatService = {
   getChatsList: async ({ keys: { apiTokenInstance, idInstance } }: GetChatsListParams) => {
      const response = await httpService.get<Chat[]>(
         endPoints.getChatsList({ apiTokenInstance, idInstance })
      );

      return response.data;
   },
   checkChatByPhone: async ({
      keys: { apiTokenInstance, idInstance },
      phoneNumber,
      signal,
   }: CheckChatByPhoneParams) => {
      const response = await httpService.post<CheckChatByPhoneResponse>(
         endPoints.checkChatByPhone({ apiTokenInstance, idInstance }),
         {
            phoneNumber,
            force: true,
         },
         {
            signal,
         }
      );

      return response.data;
   },
};
