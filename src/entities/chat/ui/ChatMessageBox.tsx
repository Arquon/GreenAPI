import { useSendMessageMutation } from "@/entities/message/@x/chat";
import { ArrowIcon } from "@/shared/assets";
import { BaseTextarea, Button } from "@/shared/ui";
import { useState } from "react";

interface ChatMessageBoxProps {
   chatId: string;
}

export const ChatMessageBox = ({ chatId }: ChatMessageBoxProps) => {
   const [message, setMessage] = useState("");

   const { mutate: sendChatMessage } = useSendMessageMutation();

   const onSendMessageClick = () => {
      sendChatMessage({ chatId, message });
      setMessage("");
   };

   return (
      <div className="flex justify-center py-5">
         <div className="bg-sidebar w-150 rounded-4xl flex gap-3 px-6 py-4 items-center">
            <div className="max-h-50 overflow-y-auto flex-auto">
               <BaseTextarea value={message} onChange={setMessage} rows={1} placeholder="Сообщение" />
            </div>
            <div>
               <Button size="icon" type="button" disabled={!message} onClick={onSendMessageClick}>
                  <ArrowIcon className="rotate-90 w-6 h-6" />
               </Button>
            </div>
         </div>
      </div>
   );
};
