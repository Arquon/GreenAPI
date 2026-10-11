import { httpService, type DefaultRequestParams } from "@/shared/api";
import type { Chat } from "../model/types";

const endPoints = {
   getChatsList: ({ apiTokenInstance, idInstance }: DefaultRequestParams) =>
      `/waInstance${idInstance}/getChats/${apiTokenInstance}`,

   checkChatByPhone: ({ apiTokenInstance, idInstance }: DefaultRequestParams) =>
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
   getChatsList: async ({ apiTokenInstance, idInstance }: GetChatsListParams) => {
      const response = await httpService.get<Chat[]>(
         endPoints.getChatsList({ apiTokenInstance, idInstance })
      );

      return response.data;
   },
   checkChatByPhone: async ({ apiTokenInstance, idInstance, phoneNumber }: CheckChatByPhoneParams) => {
      const response = await httpService.post<CheckChatByPhoneResponse>(
         endPoints.checkChatByPhone({ apiTokenInstance, idInstance }),
         {
            phoneNumber,
            force: true,
         }
      );

      return response.data;
   },
};
