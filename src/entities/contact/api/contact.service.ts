import { httpService, type DefaultRequestParams } from "@/shared/api";

const endPoints = {
   getChatContactInfo: ({ apiTokenInstance, idInstance }: DefaultRequestParams) =>
      `/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
};

interface GetContactInfoParams extends DefaultRequestParams {
   chatId: string;
}

export const contactService = {
   getContactInfo: async ({ apiTokenInstance, idInstance, chatId }: GetContactInfoParams) => {
      const response = await httpService.post(
         endPoints.getChatContactInfo({ apiTokenInstance, idInstance }),
         {
            chatId,
         }
      );

      return response.data;
   },
};
