import { Button, PhoneNumberInput } from "@/shared/ui";
import { Modal } from "@/shared/ui/modal";
import { useState, type SubmitEvent } from "react";
import { useCheckChatByPhoneMutation } from "../model/useCheckChatByPhoneMutation";
import axios from "axios";
import { generatePath, useNavigate } from "react-router";
import { appRoutes } from "@/shared/config";
import { toast } from "sonner";

interface ChatPhoneNumberModalProps {
   closeFn: () => void;
}

export const ChatPhoneNumberModal = ({ closeFn }: ChatPhoneNumberModalProps) => {
   const [phoneNumber, setPhoneNumber] = useState("");

   const { mutate } = useCheckChatByPhoneMutation();
   const navigate = useNavigate();

   const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      mutate(+phoneNumber, {
         onSuccess: (data) => {
            if (data.exist) {
               closeFn();
               navigate(generatePath(appRoutes.chat, { chatId: data.chatId }));
               return;
            }

            toast.error("Пользователь не найден");
            return;
         },
         onError: (error) => {
            if (axios.isAxiosError(error)) {
               if (error.status === 429) {
                  toast.error("Попробуйте позже");
                  return;
               }
            }

            toast.error("Произошла ошибка при создании чата");
            return;
         },
      });
   };

   return (
      <Modal.Provider closeFn={closeFn}>
         <Modal.Modal variant="centered">
            <Modal.Layout>
               <form onSubmit={onSubmit}>
                  <h3 className="mb-5">Введите номер телефона</h3>
                  <div className="mb-4">
                     <PhoneNumberInput
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        placeholder="Номер телефона в международном формате"
                     />
                  </div>
                  <div className="flex justify-center">
                     <Button size="default" type="submit">
                        Создать чат
                     </Button>
                  </div>
               </form>
            </Modal.Layout>
         </Modal.Modal>
      </Modal.Provider>
   );
};
