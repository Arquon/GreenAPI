import { httpService, type DefaultRequestParams } from "@/shared/api";
import type { Contact } from "../model/types";

const endPoints = {
   getChatContactInfo: ({ apiTokenInstance, idInstance }: DefaultRequestParams) =>
      `/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
};

interface GetContactInfoParams extends DefaultRequestParams {
   chatId: string;
}

export const contactService = {
   getContactInfo: async ({ apiTokenInstance, idInstance, chatId }: GetContactInfoParams) => {
      const mockContact: Contact = {
         avatar: "",
         name: "name",
         contactName: "contactName",
         chatId,
         chatType: "user",
         lastSeen: 0,
         phoneNumber: 0,
         username: "",
         isPremium: false,
         isVerified: false,
         isScam: false,
         description: "",
      };
      return mockContact;

      const response = await httpService.post<Contact>(
         endPoints.getChatContactInfo({ apiTokenInstance, idInstance }),
         {
            chatId,
         }
      );

      return response.data;
   },
};
